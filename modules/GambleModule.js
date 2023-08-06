// GambleModule.js

export function gambleMoney(player, updateGameInfo, updatePlayerStats) {
	const gamblingCost = 10;
	if (gamblingCost <= player.money) {
		const symbols = ["🗡️", "🛡️", "🔮", "👑"];
		const spinResult = [];

		for (let i = 0; i < 3; i++) {
			const randomIndex = Math.floor(Math.random() * symbols.length);
			spinResult.push(symbols[randomIndex]);
		}

		updateGameInfo("Spinning the slot machine...");
		updateGameInfo("Result: " + spinResult.join(" "));

		if (spinResult[0] === spinResult[1] && spinResult[1] === spinResult[2]) {
			const winnings = gamblingCost * 3;
			player.money += winnings;
			updateGameInfo("Congratulations! You won " + winnings + " coins!");
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