// EquippedScreen.js

import { updateGameInfo } from '../modules/MessageModule.js';

class EquippedScreen {
	constructor(player, updatePlayerStats) {
		this.player = player;
		this.updatePlayerStats = updatePlayerStats;
	}

	render() {
		const equippedItemsList = document.getElementById("equipped-items-list");
		equippedItemsList.innerHTML = "";

		const equippedItems = [
			{ slot: 'Damage', item: this.player.damageItem },
			{ slot: 'Defense', item: this.player.defenseItem },
			{ slot: 'Regeneration', item: this.player.regenerationItem },
			{ slot: 'Precision', item: this.player.precisionItem },
			{ slot: 'Evasion', item: this.player.evasionItem },
			{ slot: 'Critical', item: this.player.criticalItem },
			{ slot: 'Resistance', item: this.player.resistanceItem },
			{ slot: 'Bonus Exp', item: this.player.bonusExpItem },
			{ slot: 'Bonus Loot', item: this.player.bonusLootItem },
		];

		equippedItems.forEach(({ slot, item }) => {
			const iconContent = item ? item.icon : '❌';
			const nameContent = item ? item.name : 'Empty';

			const itemElement = document.createElement('div');

			const itemName = document.createElement('div');
			itemName.innerHTML = `<strong>${slot}:</strong><br/>${nameContent} ${iconContent}`;
			itemElement.appendChild(itemName);

			if (item) {
				const { level, improvementLevel } = item;

				const itemInfo = document.createElement('div');
				itemInfo.innerHTML = `<small><em>Level: </em><strong>${level}</strong></small>`;
				itemElement.appendChild(itemInfo);
	
				const improvementInfo = document.createElement('div');
				improvementInfo.innerHTML = `<em>ImprovementLevel: </em><strong>${improvementLevel}</strong>`;
				itemElement.appendChild(improvementInfo);
	
				const unEquipButton = document.createElement('button');
				unEquipButton.textContent = `Unequip`;
				unEquipButton.addEventListener('click', () => this.unequipItem(item));
				itemElement.appendChild(unEquipButton);
			}

			equippedItemsList.appendChild(itemElement);
			equippedItemsList.appendChild(document.createElement("hr"));
		});
  }

  unequipItem(item) {
	const { icon, name, stat } = item;
	const playerProperty = `${stat}Item`;

	this.player[playerProperty] = null;
	this.player.inventory.push(item);

	updateGameInfo(`Unequipped ${playerProperty}: ${icon} ${name}`);

	this.updatePlayerStats();
	this.render();
  }
}

export default EquippedScreen;
