// StatsScreen.js

class StatsScreen {
	constructor(player, getNextLevelExperience) {
		this.player = player;
	}

	render() {
		const statList = document.getElementById("stat-list");
		statList.innerHTML = "";

		const stats = [
			{ label: 'Damage', value: `⚔️ ${this.player.damage} (+${this.player.calculateEquippedDamage()})` },
			{ label: 'Defense', value: `🛡️ ${this.player.defense} (+${this.player.calculateEquippedDefense()})` },
			{ label: 'Precision', value: `🎯 ${this.player.precision} (+${this.player.calculateEquippedPrecision()})` },
			{ label: 'Evasion', value: `🌪️ ${this.player.evasion} (+${this.player.calculateEquippedEvasion()})` },
			{ label: 'Critical', value: `💥 ${this.player.critical} (+${this.player.calculateEquippedCritical()})` },
			{ label: 'Resistance', value: `🔒 ${this.player.resistance} (+${this.player.calculateEquippedResistance()})` },
			{ label: 'Bonus Exp', value: `💫 ${this.player.bonusExp} (+${this.player.calculateEquippedBonusExp()})` },
			{ label: 'Bonus Loot', value: `🏆 ${this.player.bonusLoot} (+${this.player.calculateEquippedBonusLoot()})` }
		];

		stats.forEach((stat) => {
			const statItem = document.createElement('div');
			statItem.innerHTML = `<strong>${stat.label}: </strong><br/><em>${stat.value}</em>`;
			statList.appendChild(statItem);
		});
	}
}

export default StatsScreen;
