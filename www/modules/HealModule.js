// HealModule.js

import { updateGameInfo } from './MessageModule.js';

export function healForMoney(player, updatePlayerStats) {
	if (player.currentHP === player.maxHP) {
		updateGameInfo("Your HP is already full!")
		return
	}

	const healingCost = Math.ceil(player.level / 10) * 10
	if (player.money >= healingCost) {
		player.money -= healingCost
		player.currentHP += healingCost / 2
		if (player.currentHP > player.maxHP) {
			player.currentHP = player.maxHP
		}
		updateGameInfo("You've been healed!")
		updatePlayerStats()
	} else {
		updateGameInfo("You don't have enough coins to heal!")
	}
}