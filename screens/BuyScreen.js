// BuyScreen.js

import gameConfig from './../config/gameConfig.js';
import { updateGameInfo } from '../modules/MessageModule.js';
import { getItemValue } from '../modules/ItemModule.js';

class BuyScreen {
	constructor(player, updatePlayerStats) {
		this.player = player;
		this.updatePlayerStats = updatePlayerStats;
		this.previousItemStat = null;
	}

	render() {
		const shopItems = document.getElementById("shop-item-list");
		shopItems.innerHTML = "";

		const filteredItems = gameConfig.itemsList.filter(
			(shopItem) => shopItem.areaIndex == this.player.areaIndex
		);

		for (let i = 0; i < filteredItems.length; i++) {
			const item = filteredItems[i];
			const { stat, level, icon, name } = item;
			const cost = this.calculateItemCost(item);

			// if (item.stat !== this.previousItemStat) {
			// 	this.previousItemStat = stat;
			// 	const itemTypeTitle = document.createElement('h4');
			// 	itemTypeTitle.textContent = stat;
			// 	shopItems.appendChild(itemTypeTitle);
			// 	shopItems.appendChild(document.createElement("hr"));
			// }

			const itemElement = document.createElement('div');

			const itemName = document.createElement('div');
			itemName.innerHTML = `<strong>${name}</strong> ${icon}`;
			itemElement.appendChild(itemName);

			const itemInfo = document.createElement('div');
			itemInfo.innerHTML = `<small><em>Level: </em><strong>${level}</strong> - <em>Stat: </em><strong>${stat}</strong></small>`;
			itemElement.appendChild(itemInfo);

			const costInfo = document.createElement('div');
			costInfo.innerHTML = `Cost: <strong>${cost}</strong>`;
			itemElement.appendChild(costInfo);

			if (this.player.level >= level && this.player.money >= cost) {
				const buyButton = document.createElement('button');
				buyButton.textContent = `Buy`;
				buyButton.addEventListener('click', () => this.buyItem(item));
				itemElement.appendChild(buyButton);
			}

			shopItems.appendChild(itemElement);
			shopItems.appendChild(document.createElement("hr"));
		}
	}

	buyItem(item) {
		const { name, icon } = item;
		const cost = this.calculateItemCost(item);
		this.player.money -= cost;
		const itemCopy = { ...item };
		this.player.inventory.push({...itemCopy});
		updateGameInfo(`You bought ${name} ${icon}.`);
		this.updatePlayerStats();
		this.render();
	}

	calculateItemCost(item) {
		return Math.ceil(getItemValue(item));
	}
}

export default BuyScreen;
