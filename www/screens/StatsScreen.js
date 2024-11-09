// StatsScreen.js

class StatsScreen {
	constructor(player) {
		this.player = player;
	}

	render() {
		const statList = document.getElementById("stat-list");
		statList.innerHTML = "";

		const groupStats = [
			{
				label: 'Vitality',
				from: null,
				stats: [
					{ label: 'Level', from: 'level', value: `🎚️ ${this.player.level}` },
					{ label: 'HP', from: 'maxHP', value: `💖 ${this.player.maxHP}` },
					{ label: 'Regeneration', from: 'regeneration', value: `💚 ${this.player.regeneration} (+${this.player.calculateEquippedRegeneration()})` }
				]
			},
			{
				label: 'Toughness',
				from: 'toughness',
				stats: [
					{ label: 'Damage', from: 'damage', value: `⚔️ ${this.player.damage} (+${this.player.calculateEquippedDamage()})` },
					{ label: 'Defense', from: 'defense', value: `🛡️ ${this.player.defense} (+${this.player.calculateEquippedDefense()})` }
				]
			},
			{
				label: 'Swiftness',
				from: 'swiftness',
				stats: [
					{ label: 'Precision', from: 'precision', value: `🎯 ${this.player.precision} (+${this.player.calculateEquippedPrecision()})` },
					{ label: 'Evasion', from: 'evasion', value: `🌪️ ${this.player.evasion} (+${this.player.calculateEquippedEvasion()})` }
				]
			},
			{
				label: 'Fortitude',
				from: 'fortitude',
				stats: [
					{ label: 'Critical', from: 'critical', value: `💥 ${this.player.critical} (+${this.player.calculateEquippedCritical()})` },
					{ label: 'Resistance', from: 'resistance', value: `🔒 ${this.player.resistance} (+${this.player.calculateEquippedResistance()})` }
				]
			},
			{
				label: 'Fortune',
				from: null,
				stats: [
					{ label: 'Bonus Exp', from: 'bonusExp', value: `💫 ${this.player.bonusExp} (+${this.player.calculateEquippedBonusExp()})` },
					{ label: 'Bonus Loot', from: 'bonusLoot', value: `🏆 ${this.player.bonusLoot} (+${this.player.calculateEquippedBonusLoot()})` }
				]
			},
		];

		groupStats.forEach((groupStat) => {
			const remainingPoints = this.player[groupStat.from];
			const groupStatList = document.createElement('div');
			groupStatList.innerHTML = `<em>${groupStat.label} : </em>`;

			if (groupStat.from) {
				const remainingText = document.createElement('div');
				remainingText.innerHTML = `<strong>Points available: ${remainingPoints}</strong>`;

				groupStatList.appendChild(remainingText);
			}

			groupStat.stats.forEach((stat) => {
				const statItem = document.createElement('div');
				statItem.innerHTML = `<strong>${stat.label}: </strong><br/><em>${stat.value}</em><hr>`;

				groupStatList.appendChild(statItem);

				if (groupStat.from) {
					if (this.player[stat.from] > 1) {
						const buttonRemove = document.createElement('button');
						buttonRemove.innerHTML = '-';
						buttonRemove.addEventListener('click', () => {
							this.player[stat.from]--;
							this.player[groupStat.from]++;
							this.render();
						});
						groupStatList.appendChild(buttonRemove);
					}

					if (remainingPoints) {
						const buttonAdd = document.createElement('button');
						buttonAdd.innerHTML = '+';
						buttonAdd.addEventListener('click', () => {
							this.player[stat.from]++;
							this.player[groupStat.from]--;
							this.render();
						});
						groupStatList.appendChild(buttonAdd);
					}
				}

			});
			statList.appendChild(groupStatList);
		});
	}
}

export default StatsScreen;
