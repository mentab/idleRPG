// BuyScreen.js

import gameConfig from './../config/gameConfig.js';

class BuyScreen {
	constructor(player, getItemValue, updateGameInfo, updatePlayerStats) {
		this.player = player;
		this.getItemValue = getItemValue;
		this.updateGameInfo = updateGameInfo;
		this.updatePlayerStats = updatePlayerStats;
	}

	render() {
		const shopItems = document.getElementById("shop-item-list");
		shopItems.innerHTML = "";

		const filteredItems = gameConfig.itemsList.filter(
			(shopItem) => shopItem.level >= this.player.level - 15 && shopItem.level <= this.player.level
		);

		for (let i = 0; i < filteredItems.length; i++) {
			const item = filteredItems[i];
			const itemElement = document.createElement('button');
			itemElement.textContent = `${item.icon} ${item.name} - Cost: ${this.calculateItemCost(item)}`;
			itemElement.classList.add('item');

			itemElement.addEventListener('click', () => this.buyItem(item));

			shopItems.appendChild(itemElement);
		}
	}

	buyItem(item) {
		const itemCost = this.calculateItemCost(item);
		if (this.player.money >= itemCost) {
			this.player.money -= itemCost;
			const itemCopy = { ...item };
			this.player.inventory.push({...itemCopy});
			this.updateGameInfo(`You bought ${item.name}.`);
			this.updatePlayerStats();
		} else {
			this.updateGameInfo('Not enough coins to buy this item.');
		}
		this.render();
	}

	calculateItemCost(item) {
		return Math.ceil(this.getItemValue(item));
	}
}

export default BuyScreen;
