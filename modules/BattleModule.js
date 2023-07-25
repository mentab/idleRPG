// BattleModule.js

import { getRandomNumber } from './../utils/utils.js';

const ATTRIBUTES = {
	maxHP: {
	  base: 15,
	  factors: [2, 3, 4, 2, 3, 4, 2, 3, 4, 5],
	  groupFactors: [0, 5, 15, 20, 35, 55, 90, 100, 110, 120],
	},
	damage: {
	  base: 4,
	  factors: [2.5, 3.2, 2.6, 3.3, 2.7, 3.4, 2.8, 3.5, 3.6, 3.7],
	  groupFactors: [0, 5, 0, 10, 0, 15, 0, 20, 25, 30],
	},
	defense: {
	  base: 4,
	  factors: [3.2, 2.5, 3.3, 2.6, 3.4, 2.7, 3.5, 2.8, 3.6, 3.7],
	  groupFactors: [5, 0, 10, 0, 15, 0, 20, 0, 25, 30],
	},
	precision: {
	  base: 25,
	  factors: [0.1, 0.4, 0.2, 0.5, 0.3, 0.6, 0.4, 0.7, 0.8, 0.9],
	  groupFactors: [0, 0, 0, 5, 0, 10, 0, 15, 20, 25],
	},
	evasion: {
	  base: 25,
	  factors: [0.4, 0.1, 0.5, 0.2, 0.6, 0.3, 0.7, 0.4, 0.8, 0.9],
	  groupFactors: [0, 0, 5, 0, 10, 0, 15, 0, 20, 25],
	},
	critical: {
	  base: 0,
	  factors: [0.1, 0.4, 0.2, 0.5, 0.3, 0.6, 0.4, 0.7, 0.1, 0.9],
	  groupFactors: [0, 0, 0, 0, 0, 5, 0, 10, 0, 20],
	},
	resistance: {
	  base: 0,
	  factors: [0.4, 0.1, 0.5, 0.2, 0.6, 0.3, 0.7, 0.4, 0.1, 0.9],
	  groupFactors: [0, 0, 0, 0, 5, 0, 10, 0, 0, 20],
	},
	// block: {
	//   base: 0,
	//   factors: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//   groupFactors: [0, 0, 0, 0, 1, 2, 5, 10, 15, 20],
	// },
	// penetration: {
	//   base: 0,
	//   factors: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//   groupFactors: [0, 0, 0, 0, 0, 1, 2, 5, 10, 15],
	// },
	lootChance: {
	  base: 0,
	  factors: [0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 1],
	  groupFactors: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	},
}

class BattleModule {
	constructor(player, areas, enemies, bosses, randomEnemies, updateGameInfo, updatePlayerStats, checkLevelUp) {
		this.player = player;
		this.areas = areas;
		this.enemies = enemies;
		this.bosses = bosses;
		this.randomEnemies = randomEnemies;
		this.updateGameInfo = updateGameInfo;
		this.updatePlayerStats = updatePlayerStats;
		this.checkLevelUp = checkLevelUp;
	}

	getAttributeValue(enemy, attribute) {
		const level = enemy.level;
		const group = Math.ceil(level / 10);
		const factorIndex = (level - 1) % 10;
		const groupFactorIndex = group - 1;
		const factor = ATTRIBUTES[attribute].factors[factorIndex];
		const groupFactor = ATTRIBUTES[attribute].groupFactors[groupFactorIndex];
		return Math.floor(ATTRIBUTES[attribute].base + (level - 1) * factor + groupFactor);
	};

	getEnemyMaxHP = (enemy) => this.getAttributeValue(enemy, 'maxHP');
	getEnemyDamage = (enemy) => this.getAttributeValue(enemy, 'damage');
	getEnemyDefense = (enemy) => this.getAttributeValue(enemy, 'defense');
	getEnemyPrecision = (enemy) => this.getAttributeValue(enemy, 'precision');
	getEnemyEvasion = (enemy) => this.getAttributeValue(enemy, 'evasion');
	getEnemyCritical = (enemy) => this.getAttributeValue(enemy, 'critical');
	getEnemyResistance = (enemy) => this.getAttributeValue(enemy, 'resistance');
	getEnemyLootChance = (enemy) => this.getAttributeValue(enemy, 'lootChance');

	generateEnemyInfo = (enemy) => `An enemy ${enemy.icon} ${enemy.name} has appeared!\n` +
		   `It has ${this.getEnemyMaxHP(enemy)} HP, ${this.getEnemyDamage(enemy)} DAM, ${this.getEnemyDefense(enemy)} DEF, ${this.getEnemyPrecision(enemy)} PRE, ${this.getEnemyEvasion(enemy)} EVA, ${this.getEnemyCritical(enemy)} CRI, ${this.getEnemyResistance(enemy)} RES`;

	// Function to generate a random enemy based on player's level
	findEntitiesInAreaAndLevelRange(entities, maxLevel, isBoss = false) {
		const validatedMaxLevel = Math.max(1, maxLevel);
		const playerCurrentAreaIndex = this.areas.findIndex((area) => area === this.player.currentArea);

		const eligibleEntities = entities.filter((entity) => {
			const entityAreaIndex = Math.floor((entity.level - 1) / 10);
			return entityAreaIndex === playerCurrentAreaIndex && entity.level <= validatedMaxLevel && (isBoss ? entity.level % 10 === 0 : true);
		});

		if (eligibleEntities.length === 0) {
			const firstEnemyOfArea = entities.find((entity) => {
				const entityAreaIndex = Math.floor((entity.level - 1) / 10);
				return entityAreaIndex === playerCurrentAreaIndex;
			});
			return firstEnemyOfArea ? [firstEnemyOfArea] : [];
		}

		return eligibleEntities;
	}

	generateEntity(entities) {
		return entities[Math.floor(Math.random() * entities.length)];
	}

	generateEnemy(maxLevel) {
		const eligibleEnemies = this.findEntitiesInAreaAndLevelRange(this.enemies, maxLevel);
		return this.generateEntity(eligibleEnemies);
	}

	generateRandomEnemy(playerLevel) {
		const randomIndex = Math.floor(Math.random() * this.randomEnemies.length);
		const enemy = this.randomEnemies[randomIndex];
		return { name: enemy.name, level: playerLevel, icon: enemy.icon, currentHP: 0 };
	}

	generateBoss(maxLevel) {
		const eligibleBosses = this.findEntitiesInAreaAndLevelRange(this.bosses, maxLevel, true);
		return this.generateEntity(eligibleBosses);
	}

	// Function to handle the battle between the player and an enemy
	battle(enemy) {
		const maxTurns = 10000;
		let turns = 0;
		const basePlayerDamage = this.player.damage + this.player.calculateEquippedDamage();
		const basePlayerDefense = this.player.defense + this.player.calculateEquippedDefense();
		const basePlayerPrecision = this.player.precision + this.player.calculateEquippedPrecision();
		const basePlayerEvasion = this.player.evasion + this.player.calculateEquippedEvasion();
		const basePlayerCritical = this.player.critical + this.player.calculateEquippedCritical();
		const basePlayerResistance = this.player.resistance + this.player.calculateEquippedResistance();

		const baseEnemyDamage = this.getEnemyDamage(enemy);
		const baseEnemyDefense = this.getEnemyDefense(enemy);
		const baseEnemyPrecision = this.getEnemyPrecision(enemy);
		const baseEnemyEvasion = this.getEnemyEvasion(enemy);
		const baseEnemyCritical = this.getEnemyCritical(enemy);
		const baseEnemyResistance = this.getEnemyResistance(enemy);

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

				// Enemy's Damage Absorption
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

				// Apply damage absorption
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
			const lootChance = this.getEnemyLootChance(enemy) * (1 + this.player.bonusLoot / 100);

			if (Math.random() < lootChance) {
				const loot = generateLoot(enemy.level);
				if (loot) {
					this.player.inventory.push(loot);
					this.updateGameInfo(`You found a loot: ${loot.name}!`);
				}
			}

			if (Math.random() < lootChance * 4) {
				const moneyAmount = enemy.level * 4;
				this.player.money += moneyAmount;
				this.updateGameInfo(`You found money : ${moneyAmount}!`);
			}
		} else {
			this.updateGameInfo("The battle ended in a draw.");
		}
	}

	calculateDamageReduction(defense){
		return defense / (defense + 50);
	}

	calculateHitChance(attackerAttack, defenderDefense, attackerPrecision, defenderEvasion) {
		const baseHitChance = 0.8; // Base hit chance value
		const maxHitChance = 0.95; // Maximum hit chance value
		const minHitChance = 0.05; // Minimum hit chance value

		// Calculate hit chance modifiers based on attacker's precision and defender's evasion
		const precisionModifier = attackerPrecision - defenderEvasion;
		const hitChanceModifier = precisionModifier * 0.01; // Modify hit chance by 1% per point of precision difference

		// Calculate hit chance based on attacker's attack, defender's defense, and hit chance modifiers
		let hitChance = baseHitChance + hitChanceModifier;

		// Adjust hit chance based on attack and defense difference
		const attackDefenseDifference = attackerAttack - defenderDefense;
		if (attackDefenseDifference > 0) {
		  hitChance += attackDefenseDifference * 0.005; // Increase hit chance by 0.5% per point of attack-defense difference
		} else {
		  hitChance -= Math.abs(attackDefenseDifference) * 0.005; // Decrease hit chance by 0.5% per point of defense-attack difference
		}

		// Limit hit chance within the minimum and maximum values
		hitChance = Math.max(minHitChance, Math.min(hitChance, maxHitChance));

		return hitChance;
	}

	// Function to generate loot
	generateLoot(level) {
		const filteredItems = itemsList.filter((item) => item.level <= level);
		
		if (filteredItems.length === 0) {
			return null;
		}
		
		const randomIndex = Math.floor(Math.random() * filteredItems.length);
		return filteredItems[randomIndex];
	}

	performBattle(enemy) {
		this.updateGameInfo(this.generateEnemyInfo(enemy));
		enemy.currentHP = this.getEnemyMaxHP(enemy);
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
		//const personInNeed = peopleInNeed[Math.floor(Math.random() * peopleInNeed.length)];
		//const aidRequest = aidRequests[Math.floor(Math.random() * aidRequests.length)];
		//const enemyDescriptor = enemyDescriptors[Math.floor(Math.random() * enemyDescriptors.length)];
		//const groupPhrase = groupPhrases[Math.floor(Math.random() * groupPhrases.length)];
		//const actionVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
		//const location = locations[Math.floor(Math.random() * locations.length)];
//
		//return `${personInNeed} ${aidRequest}! ${groupPhrase} ${numEnemies} ${enemyDescriptor} ${enemyType} is ${actionVerb} ${location}!`;
	
		return 'generateRandomIntro !';
	}

	calculateMissionReward(enemy, numEnemies) {
		const enemyLevel = enemy.level;
		const playerLevel = this.player.level;
		
		const baseReward = numEnemies * 10; // Base reward based on the number of enemies
		
		// Calculate the level difference modifier
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
		const enemy = this.generateEnemy(this.player.level);
		this.updateGameInfo(`Starting exploration...`);
		this.performBattle(enemy);
	}

	startChallenge() {
		const boss = this.generateBoss(this.player.level);
		this.updateGameInfo("Starting the challenge...");
		this.performBattle(boss);
	}

	startMission() {
		const enemy = this.generateEnemy(this.player.level - 2);
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
		const enemy = this.generateRandomEnemy(this.player.level);
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