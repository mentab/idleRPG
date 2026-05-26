import gameConfig from './../config/gameConfig.js';
import { updateGameNotice } from '../modules/MessageModule.js';

class RelicsScreen {
    constructor(player, updatePlayerStats) {
        this.player = player;
        this.updatePlayerStats = updatePlayerStats;
    }

    render() {
        const container = document.getElementById('relics-list');
        container.innerHTML = '';

        const header = document.createElement('div');
        header.innerHTML = `<strong>Prestige Points: ${this.player.prestigePoints}</strong> &nbsp;|&nbsp; Prestige Level: ${this.player.prestigeLevel}`;
        header.style.marginBottom = '1rem';
        container.appendChild(header);

        gameConfig.relics.forEach(relic => {
            const owned = this.player.relicsOwned.includes(relic.id);
            const canAfford = this.player.prestigePoints >= relic.cost;

            const item = document.createElement('div');
            item.style.marginBottom = '0.8rem';
            item.style.paddingBottom = '0.5rem';
            item.style.borderBottom = '1px solid var(--border)';

            item.innerHTML = `
                ${relic.icon} <strong>${relic.name}</strong><br/>
                <small>${relic.description}</small><br/>
                <small>Cost: <strong>${relic.cost}</strong> prestige point${relic.cost !== 1 ? 's' : ''}</small><br/>
            `;

            if (owned) {
                const badge = document.createElement('span');
                badge.textContent = '✅ Owned';
                item.appendChild(badge);
            } else {
                const btn = document.createElement('button');
                btn.textContent = `Buy (${relic.cost} pts)`;
                btn.disabled = !canAfford;
                btn.addEventListener('click', () => {
                    this.player.prestigePoints -= relic.cost;
                    this.player.relicsOwned.push(relic.id);
                    updateGameNotice(`${relic.icon} Relic acquired: ${relic.name}!`);
                    this.updatePlayerStats();
                    this.render();
                });
                item.appendChild(btn);
            }

            container.appendChild(item);
        });
    }
}

export default RelicsScreen;
