// AchievementsScreen.js

import gameConfig from './../config/gameConfig.js';

class AchievementsScreen {
	constructor(player, updateGameInfo, updatePlayerStats) {
		this.player = player;
		this.updateGameInfo = updateGameInfo;
		this.updatePlayerStats = updatePlayerStats;
	}

	calculateReward(count, level) {
		return count * level;
	}

	getRewardMilestones() {
		return [1, 2, 10, 25, 50, 100, 250, 500, 1000, 5000, 10000, 25000, 50000, 100000];
	}

	getNextReward(enemy) {
		const achievedCount = this.player.killedEnemies.get(enemy.id) || 0;
		const lastClaimedRewardCount = this.player.claimedRewards.get(enemy.id) || 0;

		const rewardMilestones = this.getRewardMilestones();
		let remainingCount = 0;
		let nextRewardAmount = 0;

		for (const milestone of rewardMilestones) {
			if (achievedCount >= milestone) {
				continue;
			}
			remainingCount = Math.max(0, milestone - (achievedCount - lastClaimedRewardCount));
			nextRewardAmount = this.calculateReward(milestone, enemy.level);
			break;
		}

		return {
			enemy,
			rewardAmount: nextRewardAmount,
			remainingCount,
		};
	}

	render() {
		const achievementsList = document.getElementById("achievements-list");
		achievementsList.innerHTML = "";

		const enemies = gameConfig.enemies;

		enemies.forEach((enemy) => {
			const nextReward = this.getNextReward(enemy);

			if (nextReward && !this.player.claimedRewards.has(enemy.id)) {
				const { enemy, rewardAmount, remainingCount } = nextReward;

				const rewardButton = document.createElement("button");
				rewardButton.textContent = remainingCount === 0 ? "Claim Reward" : `${remainingCount} enemies to next reward!`;

				const enemyInfo = document.createElement("span");
				enemyInfo.textContent = `${enemy.name} ${enemy.icon}`;
				rewardButton.appendChild(enemyInfo);

				rewardButton.addEventListener("click", () => {
					if (remainingCount === 0) {
						this.player.claimedRewards.set(enemy.id, this.player.killedEnemies.get(enemy.id));
						this.updateGameInfo(`You have received ${rewardAmount} coins as a reward!`);
						this.updatePlayerStats();
						this.render();
					}
				});

				achievementsList.appendChild(rewardButton);
			}
		});
	}
}

export default AchievementsScreen;
