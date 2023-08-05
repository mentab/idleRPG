// ImprovementsScreen

import gameConfig from './../config/gameConfig.js';

class ImprovementsScreen {
	constructor(player, updateGameInfo, updatePlayerStats) {
		this.player = player;
		this.updateGameInfo = updateGameInfo;
		this.updatePlayerStats = updatePlayerStats;
	}

	improveItem(item) {
		const chance = Math.random();

		const improvementLevel = item.improvementLevel || 0;
		const baseChance = 0.5 * (0.5 ** improvementLevel); // 50% chance, then 25%, 12.5%, and so on
		const increaseStat = chance < baseChance;
		const statMultiplier = increaseStat ? 1 : -1;

		const costMultiplier = item.improvementLevel < 0 ? Math.abs(item.improvementLevel) + 1 : 1;

		const improvementCost = this.getItemValue(item) * costMultiplier;

		if (this.player.coins < improvementCost) {
		  this.updateGameInfo("Not enough coins to improve this item.");
		  return;
		}

		this.player.coins -= improvementCost;
		this.updatePlayerStats();

		item.improvementLevel = improvementLevel + (increaseStat ? 1 : -1);
		this.updateGameInfo(`Item ${item.name} has been ${increaseStat ? "upgraded" : "downgraded"}!`);

		this.render();
	}

	render() {
		const improvementsList = document.getElementById("improvements-list");
		improvementsList.innerHTML = "";

		const filteredItems = this.player.inventory.filter(
			(item) => item.areaIndex == this.player.areaIndex
		);

		filteredItems.forEach((item) => {
		  const improvementButton = document.createElement("button");
		  improvementButton.textContent = `Upgrade ${item.name} (${item.improvementLevel} Level)`;

		  improvementButton.addEventListener("click", () => {
		    this.improveItem(item);
		  });

		  improvementsList.appendChild(improvementButton);
		});
  }
}

export default ImprovementsScreen;
