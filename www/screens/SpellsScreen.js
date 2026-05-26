// SpellsScreen.js

import gameConfig from './../config/gameConfig.js';

class SpellsScreen {
	constructor(player) {
		this.player = player;
	}

	render() {
		const spellList = document.getElementById("spell-list");
		spellList.innerHTML = "";

		const remainingText = document.createElement('div');
		remainingText.innerHTML = `<strong>Points available: ${this.player.availableSpellPoints}</strong>`;

		spellList.appendChild(remainingText);

		gameConfig.spells.forEach((spell, index) => {
			const spellLevel = this.player[spell.id];
			
			const minLevelRequired = index * 10;

			const effectPercent = spellLevel
				? Math.round((gameConfig.effectValue + (spellLevel - 1) * gameConfig.effectValue) * 100)
				: 0;
			const spellDescription = spell.effects.map(effect => {
				const sign = effect.target === "self" ? "+" : "-";
				const targetLabel = effect.target === "self" ? "your" : "enemy's";
				return `${sign}${effectPercent}% ${targetLabel} <strong>${effect.stat}</strong>`;
			}).join(', ');
			
			const spellItem = document.createElement('div');
			spellItem.innerHTML = `${spell.icon}
			<strong>${spell.name}</strong><br/>
			<small><em>Min Level: </em><strong>${minLevelRequired}</strong><br/>
			<em>Current spell level: ${this.player[spell.id]}</em><br/><br/>
			<small>${spellDescription}</small><br/><br/>`;

			if (this.player.level >= minLevelRequired) {
				if (spellLevel > 0) {
					const buttonRemove = document.createElement('button');
					buttonRemove.innerHTML = '-';
					buttonRemove.addEventListener('click', () => {
						this.player[spell.id]--;
						this.player.availableSpellPoints++;
						this.render();
					});
					spellItem.appendChild(buttonRemove);
				}
	
				if (this.player.availableSpellPoints) {
					const buttonAdd = document.createElement('button');
					buttonAdd.innerHTML = '+';
					buttonAdd.addEventListener('click', () => {
						this.player[spell.id]++;
						this.player.availableSpellPoints--;
						this.render();
					});
					spellItem.appendChild(buttonAdd);
				}	
			}	

			spellList.appendChild(spellItem);
		});
	}
}

export default SpellsScreen;
