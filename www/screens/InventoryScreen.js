// InventoryScreen.js

import { updateGameNotice } from '../modules/MessageModule.js';

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

		if (this.player.inventory.length === 0) {
			const emptyInventoryElement = document.createElement('strong');
			emptyInventoryElement.innerHTML = `Your inventory is empty`;
			inventory.appendChild(emptyInventoryElement);
			return;
		}

		const sortButton = document.createElement('button');
		sortButton.textContent = 'Sort by Level ↓';
		sortButton.addEventListener('click', () => {
			this.player.inventory.sort((a, b) => (b.level + b.improvementLevel) - (a.level + a.improvementLevel));
			this.render();
		});
		inventory.appendChild(sortButton);

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

			const equippedItem = this.player[`${stat}Item`];
			if (equippedItem) {
				const equippedFinal = equippedItem.level + equippedItem.improvementLevel;
				const thisFinal = level + improvementLevel;
				const diff = thisFinal - equippedFinal;
				const comparisonEl = document.createElement('div');
				if (diff > 0) {
					comparisonEl.innerHTML = `<small style="color:green">▲ +${diff} vs equipped</small>`;
				} else if (diff < 0) {
					comparisonEl.innerHTML = `<small style="color:red">▼ ${diff} vs equipped</small>`;
				} else {
					comparisonEl.innerHTML = `<small><em>= same as equipped</em></small>`;
				}
				itemElement.appendChild(comparisonEl);
			}

			const equipButton = document.createElement('button');
			equipButton.textContent = `Equip`;
			equipButton.addEventListener('click', () => this.equipItem(item));
			itemElement.appendChild(equipButton);

			inventory.appendChild(itemElement);
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
			updateGameNotice(`Equipped ${playerProperty}: ${icon} ${name}`);
		} else {
			console.log(`Unsupported item type: "stat", stat: ${stat}`);
		}
	
		this.updatePlayerStats();
		this.render();
	}
}

export default InventoryScreen;
