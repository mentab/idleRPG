// InventoryScreen.js

class InventoryScreen {
	constructor(gameContainer, player, statNames, updateGameInfo, updatePlayerStats) {
		this.gameContainer = gameContainer;
		this.player = player;
		this.statNames = statNames;
		this.updateGameInfo = updateGameInfo;
		this.updatePlayerStats = updatePlayerStats;
	}

	render() {
		// Clear the game container
		this.gameContainer.innerHTML = '';

		const inventory = document.createElement('div');
		inventory.id = 'item-list';

		const equippedItems = {};
		for (const statName of this.statNames) {
			equippedItems[statName] = this.player[`${statName}Item`];
		}

		for (const item of this.player.inventory) {
			const { icon, name, stat } = item;
			const itemElement = document.createElement('div');
			itemElement.textContent = `${icon} ${name}`;

			if (equippedItems[stat] === item) {
				itemElement.classList.add('equipped');
			}

			itemElement.addEventListener('click', () => this.equipItem(item));
			inventory.appendChild(itemElement);
		}

		this.gameContainer.appendChild(inventory);
	}

	equipItem(item) {
		const { icon, name, stat } = item;
		const playerProperty = `${stat}Item`;

		if (this.player.hasOwnProperty(playerProperty)) {
			this.player[playerProperty] = item;
			this.updateGameInfo(`Equipped ${playerProperty}: ${icon} ${name}`);
		} else {
			console.log(`Unsupported item type: "stat", stat: ${stat}`);
		}

		this.updatePlayerStats();
		this.render();
	}
}

export default InventoryScreen;
