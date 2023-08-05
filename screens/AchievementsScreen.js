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

		const nextMilestoneCount = rewardMilestones.find(milestoneCount => milestoneCount > lastClaimedRewardCount);

		const remainingCount = Math.max(0, nextMilestoneCount - achievedCount);

		const nextRewardAmount = this.calculateReward(nextMilestoneCount ,enemy.level);

		return { nextMilestoneCount, remainingCount, nextRewardAmount };
	}

	render() {
		const achievementsList = document.getElementById("achievements-list");
		achievementsList.innerHTML = "";

		const filteredEnemies = gameConfig.enemies.filter(
			(enemy) => enemy.areaIndex == this.player.areaIndex
		);

		filteredEnemies.forEach((enemy) => {
			const nextReward = this.getNextReward(enemy);

			if (nextReward) {
				const { nextMilestoneCount, remainingCount, nextRewardAmount } = nextReward;

				const rewardButton = document.createElement("button");
				rewardButton.textContent = remainingCount === 0 ? "Claim Reward" : `${remainingCount} enemies to next reward!`;

				const enemyInfo = document.createElement("span");
				enemyInfo.textContent = `${enemy.name} ${enemy.icon}`;
				rewardButton.appendChild(enemyInfo);

				rewardButton.addEventListener("click", () => {
					if (remainingCount === 0) {
						this.player.claimedRewards.set(enemy.id, nextMilestoneCount);
						this.updateGameInfo(`You have received ${nextRewardAmount} coins as a reward!`);
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
