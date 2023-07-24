// BuyScreen.js

class BuyScreen {
	constructor(gameContainer, player, itemsList, updateGameInfo, updatePlayerStats) {
		this.gameContainer = gameContainer;
		this.player = player;
		this.itemsList = itemsList;
		this.updateGameInfo = updateGameInfo;
		this.updatePlayerStats = updatePlayerStats;
	}

	render() {
		this.gameContainer.innerHTML = '';

		const shopItems = document.createElement('div');
		shopItems.id = 'shop-item-list';

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

		this.gameContainer.appendChild(shopItems);
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
		return Math.ceil(getItemValue(item));
	}
}

export default BuyScreen;
