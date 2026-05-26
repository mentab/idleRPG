// CraftScreen.js — craft equipment from gathered resources
import gameConfig from '../config/gameConfig.js';
import { updateGameNotice } from '../modules/MessageModule.js';
import { getRarityClass, getRarityLabel } from '../utils/utils.js';

const FAILURE_RATES = [0.10, 0.15, 0.15, 0.25, 0.25, 0.35, 0.35, 0.45, 0.45, 0.55];
const CRAFT_COOLDOWN = 90; // seconds

class CraftScreen {
    constructor(player, updatePlayerStats) {
        this.player = player;
        this.updatePlayerStats = updatePlayerStats;
        this.cooldowns = new Map();
    }

    render() {
        const container = document.getElementById('crafting-recipes-list');
        container.innerHTML = '';

        const area = gameConfig.areas[this.player.areaIndex];
        const header = document.getElementById('crafting-xp');
        if (header) header.textContent = `Recipes for: ${area.icon} ${area.name}`;

        const recipes = gameConfig.craftRecipes.filter(r => r.areaIndex === this.player.areaIndex);

        if (recipes.length === 0) {
            container.innerHTML = '<strong>No recipes available here.</strong>';
            return;
        }

        for (const recipe of recipes) {
            const card = document.createElement('div');
            const rarity = getRarityClass(recipe.level);

            const nameEl = document.createElement('div');
            nameEl.innerHTML = `<strong class="${rarity}">${recipe.icon} ${recipe.name}</strong>`;
            card.appendChild(nameEl);

            const infoEl = document.createElement('div');
            const failRate = Math.round((FAILURE_RATES[recipe.areaIndex] ?? 0.5) * 100);
            infoEl.innerHTML = `<small><em>Stat:</em> <strong>${recipe.stat}</strong> — <em>Lv:</em> <strong>${recipe.level}</strong> — <span class="${rarity}">${getRarityLabel(recipe.level)}</span> — <em>Fail:</em> <strong>${failRate}%</strong></small>`;
            card.appendChild(infoEl);

            const ingDiv = document.createElement('div');
            let canCraft = true;
            for (const ing of recipe.ingredients) {
                const have = this.player.inventory.filter(i => i.name === ing.name).length;
                const enough = have >= ing.qty;
                if (!enough) canCraft = false;
                const ingEl = document.createElement('div');
                ingEl.innerHTML = `<small style="color:${enough ? 'inherit' : '#f44336'}">${ing.name}: ${have}/${ing.qty}</small>`;
                ingDiv.appendChild(ingEl);
            }
            card.appendChild(ingDiv);

            const lastCraft = this.cooldowns.get(recipe.id) ?? 0;
            const remaining = Math.ceil(CRAFT_COOLDOWN - (Date.now() - lastCraft) / 1000);
            const onCooldown = remaining > 0;

            const btn = document.createElement('button');
            btn.disabled = !canCraft || onCooldown;
            btn.textContent = onCooldown ? `⏳ ${remaining}s` : '⚒️ Craft';
            btn.addEventListener('click', () => this.craft(recipe));
            card.appendChild(btn);

            container.appendChild(card);
        }
    }

    craft(recipe) {
        // Check cooldown
        const lastCraft = this.cooldowns.get(recipe.id) ?? 0;
        if ((Date.now() - lastCraft) / 1000 < CRAFT_COOLDOWN) {
            updateGameNotice('Recipe is on cooldown.');
            return;
        }

        for (const ing of recipe.ingredients) {
            const have = this.player.inventory.filter(i => i.name === ing.name).length;
            if (have < ing.qty) {
                updateGameNotice(`Not enough ${ing.name}.`);
                return;
            }
        }
        for (const ing of recipe.ingredients) {
            let removed = 0;
            this.player.inventory = this.player.inventory.filter(i => {
                if (i.name === ing.name && removed < ing.qty) {
                    removed++;
                    return false;
                }
                return true;
            });
        }

        // Set cooldown
        this.cooldowns.set(recipe.id, Date.now());

        // Failure rate
        const failureRate = FAILURE_RATES[recipe.areaIndex] ?? 0.5;
        if (Math.random() < failureRate) {
            updateGameNotice(`💔 Crafting failed! Materials consumed.`);
            this.updatePlayerStats();
            this.render();
            return;
        }

        // Success — add craftRank: 2 to the item
        const item = {
            id: recipe.id,
            name: recipe.name,
            icon: recipe.icon,
            stat: recipe.stat,
            level: recipe.level,
            type: 'stat',
            areaIndex: recipe.areaIndex,
            improvementLevel: 0,
            craftRank: 2,
        };
        this.player.inventory.push(item);
        updateGameNotice(`Crafted ${recipe.icon} ${recipe.name}!`);
        this.updatePlayerStats();
        this.render();
    }
}

export default CraftScreen;
