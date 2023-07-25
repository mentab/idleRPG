// InventoryScreen.js

class InventoryScreen {
	constructor(player, statNames, updateGameInfo, updatePlayerStats) {
		this.player = player;
		this.statNames = statNames;
		this.updateGameInfo = updateGameInfo;
		this.updatePlayerStats = updatePlayerStats;
	}

	render() {
		const inventory = document.getElementById("item-list");
		inventory.innerHTML = "";

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
