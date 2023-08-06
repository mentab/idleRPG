// BattleModule.js

import { getRandomNumber } from './../utils/utils.js';
import gameConfig from './../config/gameConfig.js';

class BattleModule {
	constructor(player, updateGameInfo, updatePlayerStats, checkLevelUp) {
		this.player = player;
		this.updateGameInfo = updateGameInfo;
		this.updatePlayerStats = updatePlayerStats;
		this.checkLevelUp = checkLevelUp;
	}

	generateEnemyInfo = (enemy) => `An enemy ${enemy.icon} ${enemy.name} has appeared!\n` +
		   `It has ${enemy.maxHP} HP, ${enemy.damage} DAM, ${enemy.defense} DEF, ${enemy.precision} PRE, ${enemy.evasion} EVA, ${enemy.critical} CRI, ${enemy.resistance} RES`;

	filterEntities(entities, mandatoryFilters, optionalFilters = {}) {
		const defaultMandatoryFilters = { isBoss: false, isDuelist: false, ...mandatoryFilters };

		const eligibleEntities = entities.filter((entity) => {
			const isMatchingMandatory = Object.entries(defaultMandatoryFilters).every(([key, value]) => entity[key] === value);
			
			const maxLevel = optionalFilters.maxLevel;
			const isLowerLevel = !maxLevel || entity.level <= maxLevel;

			return isMatchingMandatory && isLowerLevel;
		});
	
		if (eligibleEntities.length === 0) {
			const filteredEntitiesWithoutOptional = entities.filter((entity) => {
				const isMatchingMandatory = Object.entries(defaultMandatoryFilters).every(([key, value]) => entity[key] === value);
				return isMatchingMandatory;
			});
	
			const lowestLevelEntity = filteredEntitiesWithoutOptional.sort((a, b) => a.level - b.level)[0];
	
			return [lowestLevelEntity];
		}
	
		return eligibleEntities;
	}

	generateEntity(entities) {
		return { ...entities[Math.floor(Math.random() * entities.length)]};
	}

	generateEnemy(mandatoryFilters, optionalFilters = {}) {
		const eligibleEntities = this.filterEntities(gameConfig.enemies, mandatoryFilters, optionalFilters);
		return this.generateEntity(eligibleEntities);
	}

	battle(enemy) {
		const maxTurns = 10000;
		let turns = 0;
		const basePlayerDamage = this.player.damage + this.player.calculateEquippedDamage();
		const basePlayerDefense = this.player.defense + this.player.calculateEquippedDefense();
		const basePlayerPrecision = this.player.precision + this.player.calculateEquippedPrecision();
		const basePlayerEvasion = this.player.evasion + this.player.calculateEquippedEvasion();
		const basePlayerCritical = this.player.critical + this.player.calculateEquippedCritical();
		const basePlayerResistance = this.player.resistance + this.player.calculateEquippedResistance();

		const baseEnemyDamage = enemy.damage;
		const baseEnemyDefense = enemy.defense;
		const baseEnemyPrecision = enemy.precision;
		const baseEnemyEvasion = enemy.evasion;
		const baseEnemyCritical = enemy.critical;
		const baseEnemyResistance = enemy.resistance;

		const playerDamageReduction = this.calculateDamageReduction(basePlayerDefense);
		const enemyDamageReduction = this.calculateDamageReduction(baseEnemyDefense);

		const playerDamage = Math.ceil(Math.max(basePlayerDamage * (1 - enemyDamageReduction), 1));
		const enemyDamage = Math.ceil(Math.max(baseEnemyDamage * (1 - playerDamageReduction), 1));

		const playerHitChance = this.calculateHitChance(playerDamage, baseEnemyDefense, basePlayerPrecision, baseEnemyEvasion);
		const enemyHitChance = this.calculateHitChance(enemyDamage, basePlayerDefense, baseEnemyPrecision, basePlayerEvasion);

		while (this.player.currentHP > 0 && enemy.currentHP > 0 && turns < maxTurns) {
			// Player's Turn
			if (Math.random() < playerHitChance) {
				let playerDamageDealt = playerDamage;
				if (Math.random() < this.player.critical / 100) {
					const criticalMultiplier = 1 + (this.player.critical / 100);
					playerDamageDealt = Math.ceil(playerDamageDealt * criticalMultiplier);
					this.updateGameInfo(`Critical Hit! You attack the ${enemy.icon} ${enemy.name} dealing ${playerDamageDealt} damage!`);
				} else {
					this.updateGameInfo(`You attack the ${enemy.icon} ${enemy.name} dealing ${playerDamageDealt} damage!`);
				}

				if (Math.random() < baseEnemyResistance / 100) {
					const absorptionMultiplier = 1 - (baseEnemyResistance / 100);
					const resistanceedDamage = Math.ceil(playerDamageDealt * (1 - absorptionMultiplier));
					playerDamageDealt -= resistanceedDamage;
					this.updateGameInfo(`The ${enemy.icon} ${enemy.name} resistanceed ${resistanceedDamage} of your damage!`);
				}

				enemy.currentHP -= playerDamageDealt;
			}

			// Enemy's Turn
			if (Math.random() < enemyHitChance) {
				let enemyDamageDealt = enemyDamage;
				if (Math.random() < enemy.critical / 100) {
					const criticalMultiplier = 1 + (enemy.critical / 100);
					enemyDamageDealt = Math.ceil(enemyDamageDealt * criticalMultiplier);
					this.updateGameInfo(`Critical Hit! The ${enemy.icon} ${enemy.name} attacks you dealing ${enemyDamageDealt} damage!`);
				} else {
					this.updateGameInfo(`The ${enemy.icon} ${enemy.name} attacks you dealing ${enemyDamageDealt} damage!`);
				}

				if (Math.random() < basePlayerResistance / 100) {
					const absorptionMultiplier = 1 - (basePlayerResistance / 100);
					const resistanceedDamage = Math.ceil(enemyDamageDealt * (1 - absorptionMultiplier));
					enemyDamageDealt -= resistanceedDamage;
					this.updateGameInfo(`You resistanceed ${resistanceedDamage} of enemy damage!`);
				}
				
				this.player.currentHP -= enemyDamageDealt;
			}

			turns++;
		}

		if (this.player.currentHP <= 0) {
			this.updateGameInfo("You were defeated!");
		} else if (enemy.currentHP <= 0) {
			this.updateGameInfo(`You defeated the ${enemy.icon} ${enemy.name}!`);
			const lootChance = enemy.lootChance * (1 + this.player.bonusLoot / 100);

			console.log(lootChance);

			if (Math.random() < lootChance) {
				const loot = this.generateLoot(enemy.level);
				if (loot) {
					this.player.inventory.push({...loot});
					this.updateGameInfo(`You found a loot: ${loot.name}!`);
				}
			}

			if (Math.random() < lootChance * 4) {
				const moneyAmount = enemy.level * 4;
				this.player.money += moneyAmount;
				this.updateGameInfo(`You found coins : ${moneyAmount}!`);
			}

			const killedEnemies = this.player.killedEnemies;

			if (killedEnemies.has(enemy.id)) {
				killedEnemies.set(enemy.id, killedEnemies.get(enemy.id) + 1);
			} else {
				killedEnemies.set(enemy.id, 1);
			}
		} else {
			this.updateGameInfo("The battle ended in a draw.");
		}
	}

	calculateDamageReduction(defense){
		return defense / (defense + 50);
	}

	calculateHitChance(attackerAttack, defenderDefense, attackerPrecision, defenderEvasion) {
		const baseHitChance = 0.8;
		const maxHitChance = 0.95;
		const minHitChance = 0.05;

		const precisionModifier = attackerPrecision - defenderEvasion;
		const hitChanceModifier = precisionModifier * 0.01;

		let hitChance = baseHitChance + hitChanceModifier;

		const attackDefenseDifference = attackerAttack - defenderDefense;
		if (attackDefenseDifference > 0) {
		  hitChance += attackDefenseDifference * 0.005;
		} else {
		  hitChance -= Math.abs(attackDefenseDifference) * 0.005;
		}

		hitChance = Math.max(minHitChance, Math.min(hitChance, maxHitChance));

		return hitChance;
	}

	generateLoot(level) {
		const filteredItems = gameConfig.itemsList.filter((item) => item.level <= level);
		
		if (filteredItems.length === 0) {
			return null;
		}
		
		const randomIndex = Math.floor(Math.random() * filteredItems.length);
		return filteredItems[randomIndex];
	}

	performBattle(enemy) {
		this.updateGameInfo(this.generateEnemyInfo(enemy));
		enemy.currentHP = enemy.maxHP;
		this.battle(enemy);
		this.battleAndCheckResult(enemy);
	}

	battleAndCheckResult(enemy) {
		if (this.player.currentHP > 0) {
			if (enemy.currentHP <= 0) {
				const experiencePoints = this.calculateExperiencePoints(enemy);
				this.player.experience += experiencePoints;
				this.updatePlayerStats();
				this.updateGameInfo(`You defeated the ${enemy.icon} ${enemy.name} and gained ${experiencePoints} experience points!`);
				this.checkLevelUp();
			} else {
				this.updateGameInfo(`The battle with the ${enemy.icon} ${enemy.name} ended prematurely. The enemy escaped!`);
			}
		} else {
		  this.updateGameInfo("You were defeated!");
		}
	}

	calculateExperiencePoints(enemy) {
		const baseExperience = 25;
		const enemyLevel = enemy.level;
		const levelDifference = this.player.level - enemy.level;
		const adjustmentFactor = levelDifference >= 0 ? 1 / (1 + levelDifference) : 1 - levelDifference / playerLevel;
		const experiencePoints = Math.floor(baseExperience * enemyLevel * adjustmentFactor * (1 + this.player.bonusExp / 100));

		return experiencePoints;
	}

	generateRandomIntro(enemyType, numEnemies) {
		const personInNeed = gameConfig.peopleInNeed[Math.floor(Math.random() * gameConfig.peopleInNeed.length)];
		const aidRequest = gameConfig.aidRequests[Math.floor(Math.random() * gameConfig.aidRequests.length)];
		const enemyDescriptor = gameConfig.enemyDescriptors[Math.floor(Math.random() * gameConfig.enemyDescriptors.length)];
		const groupPhrase = gameConfig.groupPhrases[Math.floor(Math.random() * gameConfig.groupPhrases.length)];
		const actionVerb = gameConfig.actionVerbs[Math.floor(Math.random() * gameConfig.actionVerbs.length)];
		const location = gameConfig.locations[Math.floor(Math.random() * gameConfig.locations.length)];
		
		return `${personInNeed} ${aidRequest}! ${groupPhrase} ${numEnemies} ${enemyDescriptor} ${enemyType} is ${actionVerb} ${location}!`;
	}

	calculateMissionReward(enemy, numEnemies) {
		const enemyLevel = enemy.level;
		const playerLevel = this.player.level;
		
		const baseReward = numEnemies * 10;

		const levelDifference = playerLevel - enemyLevel;
		let levelModifier = 1;
		
		if (levelDifference > 0) {
			levelModifier -= levelDifference * 0.1;
		}

		const finalReward = Math.max(1, Math.round(baseReward * levelModifier));
		
		return finalReward;
	}

	generateDuelChallengeSentence(enemy) {
		const challengeVerbs = ["challenges", "defies", "dares", "provokes", "taunts"];
		const challengeVerb = challengeVerbs[Math.floor(Math.random() * challengeVerbs.length)];
		
		return `${enemy.name} (${enemy.icon}) ${challengeVerb} you to a duel!`;
	}

	calculateDuelRewardXP(enemy) {
		return this.calculateExperiencePoints(enemy);
	}

	startExploration() {
		const enemy = this.generateEnemy({ areaIndex: this.player.areaIndex }, { maxLevel: this.player.level });
		this.updateGameInfo(`Starting exploration...`);
		this.performBattle(enemy);
	}

	startChallenge() {
		const boss = this.generateEnemy({ areaIndex: this.player.areaIndex, isBoss: true }, {});
		this.updateGameInfo("Starting the challenge...");
		this.performBattle(boss);
	}

	startMission() {
		const enemy = this.generateEnemy({ areaIndex: this.player.areaIndex }, { maxLevel: this.player.level - 2 });
		this.updateGameInfo("Starting the mission...");
		const numEnemies = getRandomNumber(2, 3);
		this.updateGameInfo(this.generateRandomIntro(enemy.name, numEnemies));
		let totalReward = 0;
		let isMissionFailed = false;

		for (let i = 0; i < numEnemies; i++) {
			this.performBattle(enemy);

			if (this.player.currentHP <= 0) {
				isMissionFailed = true;
				break;
			}

			totalReward += this.calculateMissionReward(enemy, numEnemies);
		}

		if (!isMissionFailed) {
			this.updateGameInfo(`Mission completed! Total reward: ${totalReward} coins.`);
			this.player.money += totalReward;
			this.updatePlayerStats();
		} else {
			this.updateGameInfo("Mission failed! You were defeated.");
		}
	}

	startDuel() {
		const enemy = this.generateEnemy({ areaIndex: this.player.areaIndex, isDuelist: true }, { maxLevel: this.player.level });
		this.updateGameInfo(this.generateDuelChallengeSentence(enemy));
		
		this.performBattle(enemy);
		
		if (this.player.currentHP > 0) {
		  const rewardXP = this.calculateDuelRewardXP(enemy);
		  this.player.experience += rewardXP;
		  this.updateGameInfo(`Duel won! You gained ${rewardXP} bonus XP.`);
		} else {
		  this.updateGameInfo("Duel lost! You were defeated.");
		}
	}
}

export default BattleModule;