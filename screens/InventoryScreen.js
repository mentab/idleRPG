// InventoryScreen.js

import { updateGameInfo } from '../modules/MessageModule.js';

import gameConfig from './../config/gameConfig.js';

class InventoryScreen {
	constructor(player, updatePlayerStats) {
		this.player = player;
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
			const { icon, name, stat, level, improvementLevel } = item;

			const itemElement = document.createElement('div');

			const itemName = document.createElement('div');
			itemName.innerHTML = `<strong>${name}</strong> ${icon}`;
			itemElement.appendChild(itemName);

			const itemInfo = document.createElement('div');
			itemInfo.innerHTML = `<small><em>Level: </em> <strong>${level}</strong> - <em>Stat: </em> <strong>${stat}</strong></small>`;
			itemElement.appendChild(itemInfo);

			const improvementInfo = document.createElement('div');
			improvementInfo.innerHTML = `<em>ImprovementLevel: </em><strong>${improvementLevel}</strong>`;
			itemElement.appendChild(improvementInfo);

			const equipButton = document.createElement('button');
			equipButton.textContent = `Equip`;
			equipButton.addEventListener('click', () => this.equipItem(item));
			itemElement.appendChild(equipButton);

			inventory.appendChild(itemElement);
			inventory.appendChild(document.createElement("hr"));
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
			updateGameInfo(`Equipped ${playerProperty}: ${icon} ${name}`);
		} else {
			console.log(`Unsupported item type: "stat", stat: ${stat}`);
		}
	
		this.updatePlayerStats();
		this.render();
	}
}

export default InventoryScreen;
