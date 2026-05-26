// GatherScreen.js

import gameConfig from './../config/gameConfig.js';
import { updateGameNotice } from '../modules/MessageModule.js';

class GatherScreen {
	constructor(player, updatePlayerStats) {
		this.player = player;
		this.updatePlayerStats = updatePlayerStats;
		this.cooldowns = new Map();
	}

	render() {
		updateGameNotice('You are now gathering resources.');

		const gatherItems = document.getElementById("gather-item-list");
		gatherItems.innerHTML = "";

		const maxGatherLevel = this.getMaxGatherLevel();

		const filteredItems = gameConfig.gatheringItems.filter(
			(gatheringItem) => gatheringItem.level <= maxGatherLevel
		);

		filteredItems.forEach((item) => {
			const itemElement = document.createElement('button');

			const lastGather = this.cooldowns.get(item.name) ?? 0;
			const remaining = Math.ceil(60 - (Date.now() - lastGather) / 1000);
			if (remaining > 0) {
				itemElement.textContent = `${item.name} ${item.icon} (${remaining}s)`;
				itemElement.disabled = true;
			} else {
				itemElement.textContent = `${item.name} ${item.icon} (Level ${item.level})`;
			}

			itemElement.addEventListener('click', () => this.gatherResource(item));

			gatherItems.appendChild(itemElement);
		});
	}

	getMaxGatherLevel() {
		return Math.max(Math.floor(this.player.gatheringXP / 100), 1);
	}

	gatherResource(gatheredItem) {
		const lastGather = this.cooldowns.get(gatheredItem.name) ?? 0;
		const elapsed = (Date.now() - lastGather) / 1000;
		const cooldownSec = 60;
		if (elapsed < cooldownSec) {
			updateGameNotice(`${gatheredItem.name} is on cooldown (${Math.ceil(cooldownSec - elapsed)}s remaining).`);
			return;
		}
		this.cooldowns.set(gatheredItem.name, Date.now());

		const maxGatherLevel = this.getMaxGatherLevel();
		const nextGatherLevel = maxGatherLevel + 1;

		const levelDifference = maxGatherLevel - gatheredItem.level;
		let totalGathers = 1 + Math.floor(Math.random() * (levelDifference + 1));
		totalGathers = Math.min(totalGathers, 10);

		const xpGained = Math.max(1, 5 - levelDifference);

		updateGameNotice(`You gathered ${totalGathers} ${gatheredItem.name}.`);

		this.player.gatheringXP += xpGained * totalGathers;

		updateGameNotice(`Gathering XP: ${this.player.gatheringXP}.`);

		for (let i = 0; i < totalGathers; i++) {
			this.player.inventory.push({...gatheredItem});
		}

		this.updatePlayerStats();

		if (nextGatherLevel === this.getMaxGatherLevel()) {
			updateGameNotice(`Congratulations, you can now gather a new resource!`);
			this.render();
		} else {
			this.render();
		}
	}
}

export default GatherScreen;
