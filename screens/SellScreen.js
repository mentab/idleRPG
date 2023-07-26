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

		for (let i = 0; i < this.player.inventory.length; i++) {
			const item = this.player.inventory[i];
			const itemElement = document.createElement('button');
			itemElement.textContent = `${item.icon} ${item.name} - Value: ${this.calculateItemSellPrice(item)}`;
			itemElement.classList.add('item');

			itemElement.addEventListener('click', () => this.sellItem(item));

			sellItems.appendChild(itemElement);
		}
	}

	sellItem(item) {
		const itemIndex = this.player.inventory.indexOf(item);
		if (itemIndex !== -1) {
			const itemValue = this.calculateItemSellPrice(item);
			this.player.money += itemValue;
			this.player.inventory.splice(itemIndex, 1);
			this.updateGameInfo(`You sold ${item.name} for ${itemValue} money.`);
			this.updatePlayerStats();
		}
		this.render();
	}

	calculateItemSellPrice(item) {
		return Math.ceil(this.getItemValue(item) / 2)
	}
}

export default SellScreen;
