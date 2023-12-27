// AchievementsScreen.js

import { updateGameInfo } from '../modules/MessageModule.js';

import gameConfig from './../config/gameConfig.js';

class AchievementsScreen {
	constructor(player, updatePlayerStats) {
		this.player = player;
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

		const nextRewardAmount = this.calculateReward(nextMilestoneCount, enemy.level);

		return { nextMilestoneCount, remainingCount, nextRewardAmount };
	}

	render() {
		const achievementsList = document.getElementById("achievements-list");
		achievementsList.innerHTML = "";

		const filteredEnemies = gameConfig.enemies.filter(
			(enemy) => enemy.areaIndex == this.player.areaIndex
		);

		filteredEnemies.forEach((enemy) => {
			const { id, icon, name } = enemy;
			const nextReward = this.getNextReward(enemy);

			if (nextReward) {
				const { nextMilestoneCount, remainingCount, nextRewardAmount } = nextReward;

				const rewardCard = document.createElement("div");

				const enemyInfo = document.createElement("div");
				enemyInfo.innerHTML = `<strong>${name}</strong> ${icon}`;
				rewardCard.appendChild(enemyInfo);

				const progressInfo = document.createElement("div");
				progressInfo.innerHTML = `<small><em>Killed:</em> <strong>${this.player.killedEnemies.get(id) || 0}</strong> - <em>Remaining:</em> <strong>${remainingCount}</strong></small>`;
				rewardCard.appendChild(progressInfo);

				const rewardInfo = document.createElement('div');
				rewardInfo.innerHTML = `Reward: <strong>${nextRewardAmount}</strong>`;
				rewardCard.appendChild(rewardInfo);

				if (remainingCount === 0) {
					const rewardButton = document.createElement("button");
					rewardButton.textContent = `Claim`;
					rewardButton.addEventListener("click", () => {
						this.player.claimedRewards.set(id, nextMilestoneCount);
						updateGameInfo(`You have received ${nextRewardAmount} coins as a reward!`);
						this.player.money += nextRewardAmount;
						this.updatePlayerStats();
						this.render();
					});
					rewardCard.appendChild(rewardButton);
				} else {
					const remainingText = document.createElement("em");
					remainingText.textContent = `${remainingCount} enemies to next reward!`;
					rewardCard.appendChild(remainingText);
				}

				achievementsList.appendChild(rewardCard);
				achievementsList.appendChild(document.createElement("hr"));
			}
		});
	}
}

export default AchievementsScreen;
