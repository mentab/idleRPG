// EquippedScreen.js

class EquippedScreen {
  constructor(gameContainer, player) {
    this.gameContainer = gameContainer;
    this.player = player;
  }

  render() {
    // Clear the game container
    this.gameContainer.innerHTML = '';

    const equippedItemsList = document.createElement('ul');
    equippedItemsList.id = 'equippedItemsList';

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

    // Generate the HTML content for each equipped item and append it to the list
    equippedItems.forEach(({ slot, item }) => {
      const itemIconContent = item ? item.icon : '❌'; // Display a cross if the slot is empty
      const itemNameContent = item ? item.name : 'Empty';
      const listItem = document.createElement('li');
      listItem.classList.add('equipped-item');
      listItem.innerHTML = `${itemIconContent} ${itemNameContent} [${slot}]`;
      equippedItemsList.appendChild(listItem);
    });

    this.gameContainer.appendChild(equippedItemsList);
  }
}

export default EquippedScreen;
