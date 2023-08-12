// InventoryScreen.js

import gameConfig from './../config/gameConfig.js';

class InventoryScreen {
	constructor(player, updateGameInfo, updatePlayerStats) {
		this.player = player;
		this.updateGameInfo = updateGameInfo;
		this.updatePlayerStats = updatePlayerStats;
	}

	render() {
		const inventory = document.getElementById("item-list");
		inventory.innerHTML = "";
	
		const equippedItems = {};
		for (const statName of gameConfig.statNames) {
			equippedItems[statName] = this.player[`${statName}Item`];
		}
	
		for (const item of this.player.inventory) {
			const { icon, name, stat } = item;
			const itemButton = document.createElement('button');
			itemButton.innerHTML = `Equip <strong>${icon}</strong> ${name}`;
			itemButton.addEventListener('click', () => this.equipItem(item));
	
			inventory.appendChild(itemButton);
		}
	}

	equipItem(item) {
		const { icon, name, stat } = item;
		const playerProperty = `${stat}Item`;
	
		if (this.player.hasOwnProperty(playerProperty)) {
			const previouslyEquipped = this.player[playerProperty];
			this.player[playerProperty] = item;
			const equippedIndex = this.player.inventory.indexOf(item);
			if (equippedIndex !== -1) {
				this.player.inventory.splice(equippedIndex, 1);
			}
			if (previouslyEquipped) {
				this.player.inventory.push(previouslyEquipped);
			}
			this.updateGameInfo(`Equipped ${playerProperty}: ${icon} ${name}`);
		} else {
			console.log(`Unsupported item type: "stat", stat: ${stat}`);
		}
	
		this.updatePlayerStats();
		this.render();
	}
}

export default InventoryScreen;
