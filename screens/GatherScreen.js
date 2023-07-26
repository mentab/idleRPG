// GatherScreen.js

class GatherScreen {
	constructor(player, gatheringItems, updateGameInfo, updatePlayerStats) {
		this.player = player;
		this.gatheringItems = gatheringItems;
		this.updateGameInfo = updateGameInfo;
		this.updatePlayerStats = updatePlayerStats;
	}

	render() {
		this.updateGameInfo('You are now gathering resources.');

		const gatherItems = document.getElementById("gather-item-list");
		gatherItems.innerHTML = "";

		const maxGatherLevel = this.getMaxGatherLevel();

		const filteredItems = this.gatheringItems.filter(
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

		this.updateGameInfo(`You gathered ${totalGathers} ${gatheredItem.name}.`);

		this.player.gatheringXP += xpGained * totalGathers;

		this.updateGameInfo(`Gathering XP: ${this.player.gatheringXP}.`);

		for (let i = 0; i < totalGathers; i++) {
			this.player.inventory.push(gatheredItem);
		}

		this.updatePlayerStats();

		if (nextGatherLevel === this.getMaxGatherLevel()) {
			this.updateGameInfo(`Congratulations, you can now gather a new resource!`);
			this.render();
		}
	}
}

export default GatherScreen;