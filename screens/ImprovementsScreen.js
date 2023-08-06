// ImprovementsScreen

import gameConfig from './../config/gameConfig.js';

class ImprovementsScreen {
	constructor(player, getItemValue, updateGameInfo, updatePlayerStats) {
		this.player = player;
		this.getItemValue = getItemValue;
		this.updateGameInfo = updateGameInfo;
		this.updatePlayerStats = updatePlayerStats;
	}

	improveItem(item) {
		const improvementCost = this.calculateImprovementCost(item);

		if (this.player.money < improvementCost) {
		  this.updateGameInfo("Not enough coins to improve this item.");
		  return;
		}

		this.player.money -= improvementCost;
		this.updatePlayerStats();

		const chance = Math.random();
		const baseChance = 0.5 * (0.5 ** item.improvementLevel);
		const increaseStat = chance < baseChance;
		const statMultiplier = increaseStat ? 1 : -1;

		item.improvementLevel += statMultiplier;
		this.updateGameInfo(`Item ${item.name} has been ${increaseStat ? "upgraded" : "downgraded"}!`);

		this.render();
	}

	calculateImprovementCost(item) {
		return this.getItemValue(item);
	}

	render() {
		const improvementsList = document.getElementById("improvements-list");
		improvementsList.innerHTML = "";

		const filteredItems = this.player.inventory.filter(
			(item) => item.areaIndex == this.player.areaIndex
		);

		filteredItems.forEach((item) => {
		  const improvementButton = document.createElement("button");
		  improvementButton.textContent = `Upgrade ${item.name} (${item.improvementLevel} Level) - Cost : ${this.calculateImprovementCost(item)}`;

		  improvementButton.addEventListener("click", () => {
		    this.improveItem(item);
		  });

		  improvementsList.appendChild(improvementButton);
		});
  }
}

export default ImprovementsScreen;
