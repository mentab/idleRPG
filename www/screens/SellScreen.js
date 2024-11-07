// SellScreen.js

import { updateGameNotice } from '../modules/MessageModule.js';
import { getItemValue } from '../modules/ItemModule.js';

class SellScreen {
	constructor(player, updatePlayerStats) {
		this.player = player;
		this.updatePlayerStats = updatePlayerStats;
	}

	render() {
		const sellItems = document.getElementById("sell-item-list");
		sellItems.innerHTML = "";

		const groupedItems = this.groupItems();

		if (groupedItems.length === 0) {
			const emptySellElement = document.createElement('strong');
			emptySellElement.innerHTML = `You have nothing to sell`;
			sellItems.appendChild(emptySellElement);
		}

		for (const group of groupedItems) {
			const { item, quantity } = group;
			const { icon, name, stat, level, improvementLevel } = item;
			const value = this.calculateItemSellPrice(item);

			const itemElement = document.createElement('div');

			const itemIcon = document.createElement('div');
			itemIcon.innerHTML = `${icon}`;
			itemElement.appendChild(itemIcon);

			const itemName = document.createElement('div');
			itemName.innerHTML = `<strong>${name}</strong>`;
			itemElement.appendChild(itemName);

			const itemQuantity = document.createElement('div');
			itemQuantity.innerHTML = `<em>x${quantity}</em>`;
			itemElement.appendChild(itemQuantity);

			const itemInfo = document.createElement('div');
			itemInfo.innerHTML = `<small><em>Level: </em> <strong>${level}</strong> - <em>Stat: </em> <strong>${stat}</strong></small>`;
			itemElement.appendChild(itemInfo);

			const improvementInfo = document.createElement('div');
			improvementInfo.innerHTML = `<em>ImprovementLevel: </em><strong>${improvementLevel}</strong>`;
			itemElement.appendChild(improvementInfo);

			const valueInfo = document.createElement('div');
			valueInfo.innerHTML = `Value: <strong>${value}</strong>`;
			itemElement.appendChild(valueInfo);

			if (quantity > 1) {
				const sellAllOfButton = document.createElement('button');
				sellAllOfButton.textContent = `Sell All`;
				sellAllOfButton.addEventListener('click', () => this.sellAllOfItem(item));
				itemElement.appendChild(sellAllOfButton);
			}

			const sellButton = document.createElement('button');
			sellButton.textContent = `Sell`;
			sellButton.addEventListener('click', () => this.sellItem(item));
			itemElement.appendChild(sellButton);

			sellItems.appendChild(itemElement);
		}
	}

	groupItems() {
		const grouped = [];
		const itemNames = new Set();

		for (const item of this.player.inventory) {
			const itemIdentifier = `${item.name}-${item.improvementLevel}`;
			if (!itemNames.has(itemIdentifier)) {
				itemNames.add(itemIdentifier);
				const quantity = this.player.inventory.filter(i => i.name === item.name && i.improvementLevel === item.improvementLevel).length;
				grouped.push({ item, quantity });
			}
		}

		return grouped;
	}

	sellItem(item) {
		const itemIndex = this.player.inventory.indexOf(item);
		if (itemIndex !== -1) {
			const itemValue = this.calculateItemSellPrice(item);
			this.player.money += itemValue;
			this.player.inventory.splice(itemIndex, 1);
			updateGameNotice(`You sold ${item.name} for ${itemValue} coins.`);
			this.updatePlayerStats();
		}
		this.render();
	}

	sellAllOfItem(item) {
		const quantity = this.player.inventory.filter(i => i.name === item.name && i.improvementLevel === item.improvementLevel).length;
		const itemValue = this.calculateItemSellPrice(item) * quantity;

		this.player.money += itemValue;
		this.player.inventory = this.player.inventory.filter(i => i.name !== item.name);
		updateGameNotice(`You sold all ${quantity} x ${item.name} for ${itemValue} coins.`);
		this.updatePlayerStats();
		this.render();
	}

	calculateItemSellPrice(item) {
		return Math.ceil(getItemValue(item) / 2)
	}
}

export default SellScreen;
