// GambleModule.js

export function gambleMoney(player, updateGameInfo, updatePlayerStats) {
	const gamblingCost = 10;
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

		updateGameInfo("Spinning the slot machine...");
		updateGameInfo("Result: " + spinResult.map(symbol => symbol.symbol).join(" "));

		const uniqueSymbols = new Set(spinResult.map(symbol => symbol.symbol));

		if (uniqueSymbols.size === 1) {
			const symbol = uniqueSymbols.values().next().value;
			const outcome = symbols.find(s => s.symbol === symbol);

			switch (outcome.label) {
				case "Experience":
					player.bonusExp += 1;
					updateGameInfo("Congratulations! You won 1 bonusExp!");
					break;
				case "Loot":
					player.bonusLoot += 1;
					updateGameInfo("Congratulations! You won 1 bonusLoot!");
					break;
				case "Coins":
					player.money += 60;
					updateGameInfo("Congratulations! You won 60 coins!");
					break;
			}
		} else {
			player.money -= gamblingCost;
			updateGameInfo("Oh no! You lost " + gamblingCost + " coins.");
		}

		updateGameInfo("Your current balance is: " + player.money + " coins.");
		updatePlayerStats();
	} else {
		updateGameInfo("Not enough coins to gamble.");
	}
}