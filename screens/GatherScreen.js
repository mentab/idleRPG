// GatherScreen.js

class GatherScreen {
	constructor(player, gatheringItems, updateGameInfo, updatePlayerStats) {
		this.player = player;
		this.gatheringItems = gatheringItems;
		this.updateGameInfo = updateGameInfo;
		this.updatePlayerStats = updatePlayerStats;
	}

	render() {
		const gatherItems = document.getElementById("gather-item-list");
		gatherItems.innerHTML = "";

		this.updateGameInfo('You are now gathering resources.');

		const maxGatherLevel = this.getMaxGatherLevel();

		const itemList = document.createElement('ul');
		this.gatheringItems.forEach((item) => {
			const listItem = document.createElement('li');
			listItem.innerHTML = `${item.name} ${item.icon} (Level ${item.level})<br><small>${
			  item.level <= maxGatherLevel ? 'You can gather this item.' : "You can't gather this item yet."
			}</small>`;
			itemList.appendChild(listItem);
		});

		gatherItems.appendChild(itemList);
	}

	getMaxGatherLevel() {
		return Math.max(Math.floor(this.player.gatheringXP / 1000), 1);
	}

	gatherResource() {
		const maxGatherLevel = this.getMaxGatherLevel();
		const availableItems = this.gatheringItems.filter((item) => item.level <= maxGatherLevel);
		const randomIndex = Math.floor(Math.random() * availableItems.length);
		const gatheredItem = availableItems[randomIndex];

		const levelDifference = maxGatherLevel - gatheredItem.level;
		const extraGatherChance = Math.min(0.5, levelDifference * 0.05);
		let totalGathers = 1 + Math.floor(Math.random() * (levelDifference + 1));
		totalGathers = Math.min(totalGathers, 10);

		const xpGained = Math.max(1, 5 - levelDifference);

		this.updateGameInfo(`You gathered ${totalGathers} ${gatheredItem.name}.`);

		this.player.gatheringXP += xpGained * totalGathers;
		const gatheringXPDisplay = document.getElementById('gathering-xp');
		gatheringXPDisplay.textContent = `Gathering XP: ${this.player.gatheringXP}`;

		for (let i = 0; i < totalGathers; i++) {
			this.player.inventory.push(gatheredItem);
		}

		this.updatePlayerStats();
	}
}

export default GatherScreen;