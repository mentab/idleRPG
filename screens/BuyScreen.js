// BuyScreen.js

class BuyScreen {
	constructor(player, getItemValue, itemsList, updateGameInfo, updatePlayerStats) {
		this.player = player;
		this.getItemValue = getItemValue;
		this.itemsList = itemsList;
		this.updateGameInfo = updateGameInfo;
		this.updatePlayerStats = updatePlayerStats;
	}

	render() {
		const shopItems = document.getElementById("shop-item-list");
		shopItems.innerHTML = "";

		const filteredItems = this.itemsList.filter(
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
			this.player.inventory.push(item);
			this.updateGameInfo(`You bought ${item.name}.`);
			this.updatePlayerStats();
		} else {
			this.updateGameInfo('Not enough money to buy this item.');
		}
		this.render();
	}

	calculateItemCost(item) {
		return Math.ceil(this.getItemValue(item));
	}
}

export default BuyScreen;
