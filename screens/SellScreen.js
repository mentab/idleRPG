// SellScreen.js

class SellScreen {
	constructor(player, getItemValue, updateGameInfo, updatePlayerStats) {
		this.player = player;
		this.getItemValue = getItemValue;
		this.updateGameInfo = updateGameInfo;
		this.updatePlayerStats = updatePlayerStats;
	}

	render() {
		const sellItems = document.getElementById("sell-item-list");
		sellItems.innerHTML = "";

		for (const item of this.player.inventory) {
			const { icon, name, stat, level, improvementLevel } = item;
			const value = this.calculateItemSellPrice(item);

			const itemElement = document.createElement('div');

			const itemName = document.createElement('div');
			itemName.innerHTML = `<strong>${name}</strong> ${icon}`;
			itemElement.appendChild(itemName);

			const itemInfo = document.createElement('div');
			itemInfo.innerHTML = `<small><em>Level: </em> <strong>${level}</strong> - <em>Stat: </em> <strong>${stat}</strong></small>`;
			itemElement.appendChild(itemInfo);

			const improvementInfo = document.createElement('div');
			improvementInfo.innerHTML = `<em>ImprovementLevel: </em><strong>${improvementLevel}</strong>`;
			itemElement.appendChild(improvementInfo);

			const valueInfo = document.createElement('div');
			valueInfo.innerHTML = `Value: <strong>${value}</strong>`;
			itemElement.appendChild(valueInfo);

			const sellButton = document.createElement('button');
			sellButton.textContent = `Sell`;
			sellButton.addEventListener('click', () => this.sellItem(item));
			itemElement.appendChild(sellButton);

			sellItems.appendChild(itemElement);
			sellItems.appendChild(document.createElement("hr"));
		}
	}

	sellItem(item) {
		const itemIndex = this.player.inventory.indexOf(item);
		if (itemIndex !== -1) {
			const itemValue = this.calculateItemSellPrice(item);
			this.player.money += itemValue;
			this.player.inventory.splice(itemIndex, 1);
			this.updateGameInfo(`You sold ${item.name} for ${itemValue} coins.`);
			this.updatePlayerStats();
		}
		this.render();
	}

	calculateItemSellPrice(item) {
		return Math.ceil(this.getItemValue(item) / 2)
	}
}

export default SellScreen;
