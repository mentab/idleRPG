// HealModule.js

export function healForMoney(player, updateGameInfo, updatePlayerStats) {
	if (player.currentHP === player.maxHP) {
		updateGameInfo("Your HP is already full!");
		return;
	}

	const healingCost = 10;
	if (player.money >= healingCost) {
		player.money -= healingCost;
		player.currentHP += 10; // Assuming each healing costs 10 money and heals 10 HP
		if (player.currentHP > player.maxHP) {
			player.currentHP = player.maxHP;
		}
		updateGameInfo("You've been healed!");
		updatePlayerStats();
	} else {
		updateGameInfo("You don't have enough coins to heal!");
	}
}