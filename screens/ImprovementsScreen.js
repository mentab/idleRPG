// ImprovementsScreen

import gameConfig from './../config/gameConfig.js';

class ImprovementsScreen {
	constructor(player, getItemValue, updateGameInfo, updatePlayerStats) {
		this.player = player;
		this.getItemValue = getItemValue;
		this.updateGameInfo = updateGameInfo;
		this.updatePlayerStats = updatePlayerStats;
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
			const { name, icon, level, stat, improvementLevel } = item;
			const cost = this.calculateImprovementCost(item);

			const itemElement = document.createElement('div');

			const itemName = document.createElement('div');
			itemName.innerHTML = `<strong>${name}</strong> ${icon}`;
			itemElement.appendChild(itemName);

			const itemInfo = document.createElement('div');
			itemInfo.innerHTML = `<small><em>Level: </em><strong>${level}</strong> - <em>Stat: </em><strong>${stat}</strong></small>`;
			itemElement.appendChild(itemInfo);

			const improvementInfo = document.createElement('div');
			improvementInfo.innerHTML = `<em>ImprovementLevel: </em><strong>${improvementLevel}</strong>`;
			itemElement.appendChild(improvementInfo);

			const costInfo = document.createElement('div');
			costInfo.innerHTML = `Cost: <strong>${cost}</strong>`;
			itemElement.appendChild(costInfo);
			
			if (this.player.money >= cost) {
				const improvementButton = document.createElement("button");
				improvementButton.textContent = `Improve`;
				improvementButton.addEventListener("click", () => this.improveItem(item));
				itemElement.appendChild(improvementButton);
			}

			improvementsList.appendChild(itemElement);
			improvementsList.appendChild(document.createElement("hr"));
		});
	}

	improveItem(item) {
		const { icon, name, improvementLevel } = item;
		const cost = this.calculateImprovementCost(item);

		this.player.money -= cost;
		this.updatePlayerStats();

		const chance = Math.random();
		const baseChance = 0.5 * (0.5 ** improvementLevel);
		const increaseStat = chance < baseChance;
		const statMultiplier = increaseStat ? 1 : -1;

		item.improvementLevel += statMultiplier;
		this.updateGameInfo(`Item ${icon} ${name} has been ${increaseStat ? "upgraded" : "downgraded"}!`);

		this.render();
	}
}

export default ImprovementsScreen;
