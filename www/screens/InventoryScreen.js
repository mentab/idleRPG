// InventoryScreen.js

import { updateGameNotice } from '../modules/MessageModule.js';
import { getRarityClass, getRarityLabel } from '../utils/utils.js';
import gameConfig from './../config/gameConfig.js';

class InventoryScreen {
	constructor(player, updatePlayerStats) {
		this.player = player;
		this.updatePlayerStats = updatePlayerStats;
	}

	render() {
		const inventory = document.getElementById("item-list");
		inventory.innerHTML = "";
	
		const equippedItems = {};
		for (const statName of gameConfig.statNames) {
			equippedItems[statName] = this.player[`${statName}Item`];
		}

		if (this.player.inventory.length === 0) {
			const emptyInventoryElement = document.createElement('strong');
			emptyInventoryElement.innerHTML = `Your inventory is empty`;
			inventory.appendChild(emptyInventoryElement);
			return;
		}

		const sortButton = document.createElement('button');
		sortButton.textContent = 'Sort by Level ↓';
		sortButton.addEventListener('click', () => {
			this.player.inventory.sort((a, b) => {
				const aScore = (b.level ?? 0) + (b.improvementLevel ?? 0);
				const bScore = (a.level ?? 0) + (a.improvementLevel ?? 0);
				return aScore - bScore;
			});
			this.render();
		});
		inventory.appendChild(sortButton);

		const gatheringItems = this.player.inventory.filter(i => i.type === 'gathering');
		const equipmentItems = this.player.inventory.filter(i => i.type !== 'gathering');

		if (gatheringItems.length > 0) {
			const header = document.createElement('div');
			header.innerHTML = `<small style="opacity:0.5;text-transform:uppercase;letter-spacing:0.05em">Crafting Materials</small>`;
			inventory.appendChild(header);

			const counts = new Map();
			for (const item of gatheringItems) {
				const key = item.name;
				const entry = counts.get(key);
				if (entry) entry.qty++;
				else counts.set(key, { item, qty: 1 });
			}
			for (const { item, qty } of counts.values()) {
				const el = document.createElement('div');
				el.innerHTML = `${item.icon} <strong>${item.name}</strong> ×${qty} <small style="opacity:0.5">Lv${item.level}</small>`;
				inventory.appendChild(el);
			}
		}

		for (const item of equipmentItems) {
			const { icon, name, stat, level, improvementLevel } = item;
			const rarity = getRarityClass(level);

			const itemElement = document.createElement('div');

			const itemName = document.createElement('div');
			itemName.innerHTML = `<strong class="${rarity}">${name}</strong> ${icon}`;
			itemElement.appendChild(itemName);

			const itemInfo = document.createElement('div');
			itemInfo.innerHTML = `<small><em>Level: </em> <strong>${level}</strong> - <em>Stat: </em> <strong>${stat}</strong> - <span class="${rarity}">${getRarityLabel(level)}</span></small>`;
			itemElement.appendChild(itemInfo);

			const improvementInfo = document.createElement('div');
			improvementInfo.innerHTML = `<em>ImprovementLevel: </em><strong>${improvementLevel}</strong>`;
			itemElement.appendChild(improvementInfo);

			const reqEl = document.createElement('div');
			if (this.player.level < item.level) {
				reqEl.innerHTML = `<small style="color:#f44336">Requires Level ${item.level}</small>`;
			} else if (item.craftRank) {
				reqEl.innerHTML = `<small style="color:#4da6ff">⚒️ Crafted (rank ${item.craftRank})</small>`;
			}
			itemElement.appendChild(reqEl);

			const equippedItem = this.player[`${stat}Item`];
			if (equippedItem) {
				const equippedFinal = equippedItem.level + equippedItem.improvementLevel;
				const thisFinal = level + improvementLevel;
				const diff = thisFinal - equippedFinal;
				const comparisonEl = document.createElement('div');
				if (diff > 0) {
					comparisonEl.innerHTML = `<small style="color:green">▲ +${diff} vs equipped</small>`;
				} else if (diff < 0) {
					comparisonEl.innerHTML = `<small style="color:red">▼ ${diff} vs equipped</small>`;
				} else {
					comparisonEl.innerHTML = `<small><em>= same as equipped</em></small>`;
				}
				itemElement.appendChild(comparisonEl);
			}

			const equipButton = document.createElement('button');
			equipButton.textContent = `Equip`;
			equipButton.disabled = this.player.level < item.level;
			equipButton.addEventListener('click', () => this.equipItem(item));
			itemElement.appendChild(equipButton);

			inventory.appendChild(itemElement);
		}
	}

	equipItem(item) {
		if (this.player.level < item.level) {
			updateGameNotice(`Requires Level ${item.level} to equip.`);
			return;
		}
		const { icon, name, stat } = item;
		const playerProperty = `${stat}Item`;
	
		if (this.player.hasOwnProperty(playerProperty)) {
			const previouslyEquipped = this.player[playerProperty];
			this.player[playerProperty] = item;
			const equippedIndex = this.player.inventory.indexOf(item);
			if (equippedIndex !== -1) {
				this.player.inventory.splice(equippedIndex, 1);
			}
			if (previouslyEquipped) {
				this.player.inventory.push(previouslyEquipped);
			}
			updateGameNotice(`Equipped ${playerProperty}: ${icon} ${name}`);
		} else {
			console.log(`Unsupported item type: "stat", stat: ${stat}`);
		}
	
		this.updatePlayerStats();
		this.render();
	}
}

export default InventoryScreen;
