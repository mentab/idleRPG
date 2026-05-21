// GatherScreen.js

import gameConfig from './../config/gameConfig.js';
import { updateGameNotice } from '../modules/MessageModule.js';

class GatherScreen {
	constructor(player, updatePlayerStats) {
		this.player = player;
		this.updatePlayerStats = updatePlayerStats;
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
			itemElement.textContent = `${item.name} ${item.icon} (Level ${item.level})`;

			itemElement.addEventListener('click', () => this.gatherResource(item));

			gatherItems.appendChild(itemElement);
		});
	}

	getMaxGatherLevel() {
		return Math.max(Math.floor(this.player.gatheringXP / 100), 1);
	}

	gatherResource(gatheredItem) {
		const maxGatherLevel = this.getMaxGatherLevel();
		const nextGatherLevel = maxGatherLevel + 1;

		const levelDifference = maxGatherLevel - gatheredItem.level;
		const extraGatherChance = Math.min(0.5, levelDifference * 0.05);
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
		}
	}
}

export default GatherScreen;