// SellScreen.js

class SellScreen {
	constructor(gameContainer, player, updateGameInfo, updatePlayerStats) {
		this.gameContainer = gameContainer;
		this.player = player;
		this.updateGameInfo = updateGameInfo;
		this.updatePlayerStats = updatePlayerStats;
	}

	render() {
		// Clear the game container
		this.gameContainer.innerHTML = '';

		const sellItems = document.createElement('div');
		sellItems.id = 'sell-item-list';

		// Display items available for selling
		for (let i = 0; i < this.player.inventory.length; i++) {
			const item = this.player.inventory[i];
			const itemElement = document.createElement('button');
			itemElement.textContent = `${item.icon} ${item.name} - Value: ${this.calculateItemSellPrice(item)}`;
			itemElement.classList.add('item');

			itemElement.addEventListener('click', () => this.sellItem(item));

			sellItems.appendChild(itemElement);
		}

		this.gameContainer.appendChild(sellItems);
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
		Math.ceil(getItemValue(item) / 2)
	}
}

export default SellScreen;
