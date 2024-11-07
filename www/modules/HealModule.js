// HealModule.js

import { updateGameNotice } from './MessageModule.js';

export function healForMoney(player, updatePlayerStats) {
	if (player.currentHP === player.maxHP) {
		updateGameNotice("Your HP is full!")
		return
	}

	const healingCost = Math.ceil(player.level / 10) * 10
	if (player.money >= healingCost) {
		player.money -= healingCost
		player.currentHP += healingCost / 2
		if (player.currentHP > player.maxHP) {
			player.currentHP = player.maxHP
		}
		updateGameNotice("Healed!")
		updatePlayerStats()
	} else {
		updateGameNotice("Not enough coins!")
	}
}