// SpellsScreen.js

class SpellsScreen {
	constructor(player) {
		this.player = player;
	}

	render() {
		const spellList = document.getElementById("spell-list");
		spellList.innerHTML = "";

		const spells = [
			{ label: 'Floral rebirth', from: 'floralRebirth', value: `🌼 ${this.player.floralRebirth}` },
		];

		spells.forEach((spell) => {
			const spellItem = document.createElement('div');
			spellItem.innerHTML = `<strong>${spell.label}: </strong><br/><em>${spell.value}</em><hr>`;

			spellList.appendChild(spellItem);
		});
	}
}

export default SpellsScreen;
