// ShopScreen.js — merged buy/sell screen

import gameConfig from './../config/gameConfig.js';
import { updateGameNotice } from '../modules/MessageModule.js';
import { getItemValue } from '../modules/ItemModule.js';
import { getRarityClass, getRarityLabel } from '../utils/utils.js';

class ShopScreen {
	constructor(player, updatePlayerStats, questModule = null) {
		this.player = player;
		this.updatePlayerStats = updatePlayerStats;
		this.questModule = questModule;
	}

	render() {
		this.renderShopItems();
		this.renderSellItems();
	}

	renderShopItems() {
		const shopItems = document.getElementById("shop-item-list");
		shopItems.innerHTML = "";

		const filteredItems = gameConfig.itemsList.filter(
			(item) => item.areaIndex === this.player.areaIndex
		);

		for (const item of filteredItems) {
			const { stat, level, icon, name } = item;
			const cost = Math.ceil(getItemValue(item));
			const rarity = getRarityClass(level);

			const itemElement = document.createElement('div');

			const itemName = document.createElement('div');
			itemName.innerHTML = `<strong class="${rarity}">${name}</strong> ${icon}`;
			itemElement.appendChild(itemName);

			const itemInfo = document.createElement('div');
			itemInfo.innerHTML = `<small><em>Level: </em><strong>${level}</strong> - <em>Stat: </em><strong>${stat}</strong> - <span class="${rarity}">${getRarityLabel(level)}</span></small>`;
			itemElement.appendChild(itemInfo);

			const costInfo = document.createElement('div');
			costInfo.innerHTML = `Cost: <strong>${cost}</strong>`;
			itemElement.appendChild(costInfo);

			if (this.player.level >= level && this.player.money >= cost) {
				const buyButton = document.createElement('button');
				buyButton.textContent = 'Buy';
				buyButton.addEventListener('click', () => {
					this.player.money -= cost;
					this.player.inventory.push({ ...item });
					if (this.questModule) this.questModule.trackEvent('shopSpend', cost);
					updateGameNotice(`You bought ${name} ${icon}.`);
					this.updatePlayerStats();
					this.render();
				});
				itemElement.appendChild(buyButton);
			}

			shopItems.appendChild(itemElement);
		}
	}

	renderSellItems() {
		const sellItems = document.getElementById("sell-item-list");
		sellItems.innerHTML = "";

		const grouped = this.groupInventory();

		if (grouped.length === 0) {
			sellItems.innerHTML = '<strong>Nothing to sell</strong>';
			return;
		}

		for (const { item, quantity } of grouped) {
			const { icon, name, stat, level, improvementLevel } = item;
			const isGathering = item.type === 'gathering';
			const value = isGathering ? getItemValue(item) : Math.ceil(getItemValue(item) / 2);

			const itemElement = document.createElement('div');

			const itemName = document.createElement('div');
			itemName.innerHTML = `${icon} <strong>${name}</strong> <em>×${quantity}</em>`;
			itemElement.appendChild(itemName);

			const itemInfo = document.createElement('div');
			if (isGathering) {
				itemInfo.innerHTML = `<small><em>Lv${level} — crafting material</em></small>`;
			} else {
				const craftBadge = item.craftRank ? ` <span style="color:#4da6ff">⚒️ Crafted</span>` : '';
				itemInfo.innerHTML = `<small><em>Level: </em><strong>${level}</strong> - <em>Stat: </em><strong>${stat}</strong> - <em>Improvement: </em><strong>${improvementLevel}</strong>${craftBadge}</small>`;
			}
			itemElement.appendChild(itemInfo);

			const valueInfo = document.createElement('div');
			valueInfo.innerHTML = `Value: <strong>${value}</strong>`;
			itemElement.appendChild(valueInfo);

			if (quantity > 1) {
				const sellAllButton = document.createElement('button');
				sellAllButton.textContent = 'Sell All';
				sellAllButton.addEventListener('click', () => {
					const qty = this.player.inventory.filter(i =>
						i.name === item.name
						&& (i.improvementLevel ?? 0) === (item.improvementLevel ?? 0)
						&& (i.craftRank ?? 0) === (item.craftRank ?? 0)
					).length;
					this.player.money += value * qty;
					this.player.inventory = this.player.inventory.filter(i =>
						!(i.name === item.name
						&& (i.improvementLevel ?? 0) === (item.improvementLevel ?? 0)
						&& (i.craftRank ?? 0) === (item.craftRank ?? 0))
					);
					updateGameNotice(`Sold ${qty}x ${name} for ${value * qty} coins.`);
					this.updatePlayerStats();
					this.render();
				});
				itemElement.appendChild(sellAllButton);
			}

			const sellButton = document.createElement('button');
			sellButton.textContent = 'Sell';
			sellButton.addEventListener('click', () => {
				const idx = this.player.inventory.indexOf(item);
				if (idx !== -1) {
					this.player.money += value;
					this.player.inventory.splice(idx, 1);
					updateGameNotice(`Sold ${name} for ${value} coins.`);
					this.updatePlayerStats();
					this.render();
				}
			});
			itemElement.appendChild(sellButton);

			sellItems.appendChild(itemElement);
		}
	}

	groupInventory() {
		const grouped = [];
		const seen = new Set();
		for (const item of this.player.inventory) {
			const key = `${item.name}-${item.improvementLevel ?? 0}-${item.craftRank ?? 0}`;
			if (!seen.has(key)) {
				seen.add(key);
				const quantity = this.player.inventory.filter(
					i => i.name === item.name
						&& (i.improvementLevel ?? 0) === (item.improvementLevel ?? 0)
						&& (i.craftRank ?? 0) === (item.craftRank ?? 0)
				).length;
				grouped.push({ item, quantity });
			}
		}
		return grouped;
	}
}

export default ShopScreen;
