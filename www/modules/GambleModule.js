// GambleModule.js

import { updateGameNotice } from './MessageModule.js';

export function gambleMoney(player, updatePlayerStats) {
	const gamblingCost = player.gambleCount + 1;
	if (gamblingCost <= player.money) {
		const symbols = [
			{ symbol: "🌟", label: "Experience" },
			{ symbol: "🎁", label: "Loot" },
			{ symbol: "💰", label: "Coins" }
		];

		const spinResult = [];

		for (let i = 0; i < 3; i++) {
			const randomIndex = Math.floor(Math.random() * symbols.length);
			spinResult.push(symbols[randomIndex]);
		}

		updateGameNotice("Spinning slot machine...");
		updateGameNotice("Result: " + spinResult.map(symbol => symbol.symbol).join(" "));

		const uniqueSymbols = new Set(spinResult.map(symbol => symbol.symbol));

		if (uniqueSymbols.size === 1) {
			const symbol = uniqueSymbols.values().next().value;
			const outcome = symbols.find(s => s.symbol === symbol);

			switch (outcome.label) {
				case "Experience":
					player.bonusExp += 1;
					updateGameNotice("You won 1 bonusExp!");
					break;
				case "Loot":
					player.bonusLoot += 1;
					updateGameNotice("You won 1 bonusLoot!");
					break;
				case "Coins":
					player.money += 60;
					updateGameNotice("You won 60 coins!");
					break;
			}
		} else {
			player.money -= gamblingCost;
			updateGameNotice("You lost " + gamblingCost + " coins!");
		}

		player.gambleCount++

		updatePlayerStats();
	} else {
		updateGameNotice("Not enough coins!");
	}
}