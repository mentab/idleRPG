// BattleModule.js

import { getRandomNumber } from './../utils/utils.js';
import gameConfig from './../config/gameConfig.js';
import { updateGameInfo } from './MessageModule.js';

class BattleModule {
	constructor(player, updatePlayerStats, checkLevelUp) {
		this.player = player;
		this.updatePlayerStats = updatePlayerStats;
		this.checkLevelUp = checkLevelUp;
	}

	generateEnemyInfo = (enemy) => `${enemy.icon} ${enemy.name} has appeared!\n` +
		   `${enemy.maxHP} HP, ${enemy.damage} DAM, ${enemy.defense} DEF, ${enemy.precision} PRE, ${enemy.evasion} EVA, ${enemy.critical} CRI, ${enemy.resistance} RES`;

	filterEntities(entities, mandatoryFilters, optionalFilters = {}) {
		const defaultMandatoryFilters = { ...mandatoryFilters };

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
		let turns = 1;
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

		const playerDamage = Math.floor(Math.max(basePlayerDamage * (1 - enemyDamageReduction), 1));
		const enemyDamage = Math.floor(Math.max(baseEnemyDamage * (1 - playerDamageReduction), 1));

		const playerHitChance = this.calculateHitChance(basePlayerPrecision, baseEnemyEvasion);
		const enemyHitChance = this.calculateHitChance(baseEnemyPrecision, basePlayerEvasion);

		const playerCritical = basePlayerCritical / 100;
		const enemyCritical = baseEnemyCritical / 100;

		const playerResistance = basePlayerResistance / 100;
		const enemyResistance = baseEnemyResistance / 100;

		while (this.player.currentHP > 0 && enemy.currentHP > 0 && turns < maxTurns) {
			const playerHit = Math.random() < playerHitChance;
			const enemyHit = Math.random() < enemyHitChance;


			// Player's Turn
			if (playerHit) {
				let playerDamageDealt = playerDamage;

				if (Math.random() < playerCritical) {
					playerDamageDealt = Math.floor(playerDamage * (1 + playerCritical));
				}

				if (Math.random() < enemyResistance) {
					playerDamageDealt -= Math.floor(playerDamage * (1 - enemyResistance));
				}

				enemy.currentHP = Math.max(enemy.currentHP - playerDamageDealt, 0);
			}

			// Enemy's Turn
			if (enemyHit) {
				let enemyDamageDealt = enemyDamage;

				if (Math.random() < enemyCritical) {
					enemyDamageDealt = Math.floor(enemyDamage * (1 + enemyCritical));
				}

				if (Math.random() < playerResistance) {
					enemyDamageDealt -= Math.floor(enemyDamage * (1 - playerResistance));
				}

				this.player.currentHP = Math.max(this.player.currentHP - enemyDamageDealt, 0);
			}

			updateGameInfo(`Turn ${turns} : ${enemy.icon} ${enemy.currentHP}/${enemy.maxHP} - 💖 ${this.player.currentHP}/${this.player.maxHP}`);

			turns++;
		}

		if (enemy.currentHP <= 0) {
			const lootChance = enemy.lootChance * (1 + this.player.bonusLoot / 100);

			if (Math.random() < lootChance) {
				const loot = this.generateLoot(enemy.level);
				if (loot) {
					this.player.inventory.push({...loot});
					updateGameInfo(`Found ${loot.name} ${loot.icon}!`);
				}
			}

			if (Math.random() < lootChance * 4) {
				const moneyAmount = enemy.level * 4;
				this.player.money += moneyAmount;
				updateGameInfo(`Found ${moneyAmount} coins!`);
			}

			const killedEnemies = this.player.killedEnemies;

			if (killedEnemies.has(enemy.id)) {
				killedEnemies.set(enemy.id, killedEnemies.get(enemy.id) + 1);
			} else {
				killedEnemies.set(enemy.id, 1);
			}
		}
	}

	calculateDamageReduction(defense){
		return defense / (defense + 50);
	}

	calculateHitChance(attackerPrecision, defenderEvasion) {
		const baseHitChance = 0.5;
		const maxHitChance = 0.95;
		const minHitChance = 0.05;
		
		const precisionModifier = attackerPrecision - defenderEvasion;
		const hitChanceModifier = precisionModifier * 0.002;
		
		let hitChance = baseHitChance + hitChanceModifier;
		
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
		updateGameInfo(this.generateEnemyInfo(enemy));
		enemy.currentHP = enemy.maxHP;
		this.battle(enemy);
		this.battleAndCheckResult(enemy);
	}

	battleAndCheckResult(enemy) {
		if (this.player.currentHP > 0) {
			if (enemy.currentHP <= 0) {
				updateGameInfo("Victory!");
				const experiencePoints = this.calculateExperiencePoints(enemy);
				this.player.experience += experiencePoints;
				this.updatePlayerStats();
				updateGameInfo(`Gained ${experiencePoints} EXP!`);
				this.checkLevelUp();
			} else {
				updateGameInfo("Draw!");
			}
		} else {
		  updateGameInfo("Defeat!");
		}
	}

	calculateExperiencePoints(enemy) {
		const baseExperience = 25;
		const enemyLevel = enemy.level;
		const levelDifference = this.player.level - enemy.level;
		const adjustmentFactor = levelDifference >= 0 ? 1 / (1 + levelDifference) : 1 - levelDifference / this.player.level;
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
		const enemy = this.generateEnemy({ areaIndex: this.player.areaIndex, type: 'BASE' }, { maxLevel: this.player.level });
		updateGameInfo(`Starting exploration...`);
		this.performBattle(enemy);
	}

	startChallenge() {
		const boss = this.generateEnemy({ areaIndex: this.player.areaIndex, type: 'BOSS' }, {});
		updateGameInfo("Starting challenge...");
		this.performBattle(boss);
	}

	startMission() {
		const enemy = this.generateEnemy({ areaIndex: this.player.areaIndex, type: 'BASE' }, { maxLevel: this.player.level - 2 });
		updateGameInfo("Starting mission...");
		const numEnemies = getRandomNumber(2, 3);
		updateGameInfo(this.generateRandomIntro(enemy.name, numEnemies));
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
			updateGameInfo(`Mission completed! Reward ${totalReward} bonus coins`);
			this.player.money += totalReward;
			this.updatePlayerStats();
		} else {
			updateGameInfo("Mission failed!");
		}
	}

	startDuel() {
		const enemy = this.generateEnemy({ areaIndex: this.player.areaIndex, type: 'DUELIST' }, { maxLevel: this.player.level });
		updateGameInfo(this.generateDuelChallengeSentence(enemy));
		
		this.performBattle(enemy);
		
		if (this.player.currentHP > 0) {
		  const rewardXP = this.calculateDuelRewardXP(enemy);
		  this.player.experience += rewardXP;
		  updateGameInfo(`Duel won! Reward ${rewardXP} bonus EXP`);
		} else {
		  updateGameInfo("Duel lost!");
		}
	}
}

export default BattleModule;