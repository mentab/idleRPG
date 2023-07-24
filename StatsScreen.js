// StatsScreen.js

class StatsScreen {
  constructor(gameContainer, player, calculateEquippedStats, getNextLevelExperience, calculateEquippedBonus) {
    this.gameContainer = gameContainer;
    this.player = player;
    this.calculateEquippedStats = calculateEquippedStats;
    this.getNextLevelExperience = getNextLevelExperience;
    this.calculateEquippedBonus = calculateEquippedBonus;
  }

  render() {
    // Clear the game container
    this.gameContainer.innerHTML = '';

    const statList = document.createElement('ul');
    statList.id = 'playerStatsList';

    const stats = [
      { label: 'Level', value: `🎚 ${this.player.level}` },
      { label: 'HP', value: `💖 ${this.player.currentHP} / ${this.player.maxHP}` },
      { label: 'Regeneration', value: `💚 ${this.player.regeneration} (+${this.calculateEquippedStats('regeneration')})` },
      { label: 'Damage', value: `⚔️ ${this.player.damage} (+${this.calculateEquippedStats('damage')})` },
      { label: 'Defense', value: `🛡️ ${this.player.defense} (+${this.calculateEquippedStats('defense')})` },
      { label: 'Precision', value: `🎯 ${this.player.precision} (+${this.calculateEquippedStats('precision')})` },
      { label: 'Evasion', value: `🌪️ ${this.player.evasion} (+${this.calculateEquippedStats('evasion')})` },
      { label: 'Critical', value: `💥 ${this.player.critical} (+${this.calculateEquippedStats('critical')})` },
      { label: 'Resistance', value: `🔒 ${this.player.resistance} (+${this.calculateEquippedStats('resistance')})` },
      { label: 'Experience', value: `🌟 ${this.player.experience} / ${this.getNextLevelExperience()}` },
      { label: 'Bonus Exp', value: `💫 ${this.player.bonusExp} (+${this.calculateEquippedBonus('bonusExp')})` },
      { label: 'Bonus Loot', value: `🏆 ${this.player.bonusLoot} (+${this.calculateEquippedBonus('bonusLoot')})` },
    ];

    // Create and append list items for each stat
    stats.forEach((stat) => {
      const statItem = document.createElement('li');
      statItem.textContent = `${stat.label}: ${stat.value}`;
      statList.appendChild(statItem);
    });

    this.gameContainer.appendChild(statList);
  }
}

export default StatsScreen;
