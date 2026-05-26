// BattleModule.js

import { getRandomNumber, wait } from './../utils/utils.js';
import gameConfig from './../config/gameConfig.js';
import { clearGameInfo, updateGameInfo, updateInfoBattle, updateGameNotice } from './MessageModule.js';
import { cloneCombatModifier, applyCombatModifier } from './MiniGameBonusModule.js';

class BattleModule {
	constructor(player, updatePlayerStats, checkLevelUp) {
		this.player = player;
		this.updatePlayerStats = updatePlayerStats;
		this.checkLevelUp = checkLevelUp;
		this.combatModifier = null;
		this.retainCombatModifier = false;
		this.fleeMode = false;
		this.fleeRequested = false;
		this.fleedFromBattle = false;
		this.bossMode = false;
		this.bossPhaseTriggered = false;
		this._fleeHandler = null;
	}

	setCombatModifier(modifier) {
		this.combatModifier = cloneCombatModifier(modifier);
	}

	clearCombatModifier() {
		this.combatModifier = null;
		this.retainCombatModifier = false;
	}

	generateEnemyInfo = (enemy) => `${enemy.icon} ${enemy.name} has appeared!\n` +
		   `${enemy.maxHP} HP, ${enemy.damage} DAM, ${enemy.defense} DEF, ${enemy.precision} PRE, ${enemy.evasion} EVA, ${enemy.critical} CRI, ${enemy.resistance} RES, ${enemy.block} BLK, ${enemy.penetration} PEN`;

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

	_showFlee() {
		const fleeButton = document.getElementById('flee-button');
		if (fleeButton) {
			fleeButton.classList.remove('hidden');
			this._fleeHandler = () => { this.fleeRequested = true; };
			fleeButton.addEventListener('click', this._fleeHandler);
		}
	}

	_hideFlee() {
		const fleeButton = document.getElementById('flee-button');
		if (fleeButton) {
			fleeButton.classList.add('hidden');
			if (this._fleeHandler) {
				fleeButton.removeEventListener('click', this._fleeHandler);
				this._fleeHandler = null;
			}
		}
		this.fleeMode = false;
		this.fleeRequested = false;
	}

	async battle(enemy) {
		const maxTurns = 10000;
		let turns = 1;

		while (this.player.currentHP > 0 && enemy.currentHP > 0 && turns < maxTurns) {
			const playerCopy = { ...this.player };
			const enemyCopy = { ...enemy };

			let basePlayerDamage = playerCopy.damage + this.player.calculateEquippedDamage();
			let basePlayerDefense = playerCopy.defense + this.player.calculateEquippedDefense();
			let basePlayerPrecision = playerCopy.precision + this.player.calculateEquippedPrecision();
			let basePlayerEvasion = playerCopy.evasion + this.player.calculateEquippedEvasion();
			let basePlayerCritical = playerCopy.critical + this.player.calculateEquippedCritical();
			let basePlayerResistance = playerCopy.resistance + this.player.calculateEquippedResistance();
			let basePlayerBlock = playerCopy.block + this.player.calculateEquippedBlock();
			let basePlayerPenetration = playerCopy.penetration + this.player.calculateEquippedPenetration();
	
			let baseEnemyDamage = enemyCopy.damage;
			let baseEnemyDefense = enemyCopy.defense;
			let baseEnemyPrecision = enemyCopy.precision;
			let baseEnemyEvasion = enemyCopy.evasion;
			let baseEnemyCritical = enemyCopy.critical;
			let baseEnemyResistance = enemyCopy.resistance;
			let baseEnemyBlock = enemyCopy.block;
			let baseEnemyPenetration = enemyCopy.penetration;
	
			let playerDamageReduction = this.calculateDamageReduction(basePlayerDefense);
			let enemyDamageReduction = this.calculateDamageReduction(baseEnemyDefense);
	
			let playerDamage = Math.floor(Math.max(basePlayerDamage * (1 - enemyDamageReduction) / 2, 1));
			let enemyDamage = Math.floor(Math.max(baseEnemyDamage * (1 - playerDamageReduction) / 2, 1));
	
			let playerHitChance = this.calculateHitChance(basePlayerPrecision, baseEnemyEvasion);
			let enemyHitChance = this.calculateHitChance(baseEnemyPrecision, basePlayerEvasion);

			let playerCritical = basePlayerCritical / 100;
			let enemyCritical = baseEnemyCritical / 100;
	
			let playerResistance = basePlayerResistance / 100;
			let enemyResistance = baseEnemyResistance / 100;

			let playerBlock = basePlayerBlock / 100;
			let enemyBlock = baseEnemyBlock / 100;

			let playerPenetration = basePlayerPenetration / 100;
			let enemyPenetration = baseEnemyPenetration / 100;

			const playerHit = Math.random() < playerHitChance;
			const enemyHit = Math.random() < enemyHitChance;

			await wait(0.2);

			const battleMessages = [];

			// Boss phase 2: triggers once when boss falls below 50% HP
			if (this.bossMode && !this.bossPhaseTriggered && enemy.currentHP <= Math.floor(enemy.maxHP / 2)) {
				this.bossPhaseTriggered = true;
				enemy.damage = Math.floor(enemy.damage * 1.3);
				enemy.precision = Math.floor(enemy.precision * 1.3);
				battleMessages.push(`💀 ${enemy.name} enters a rage! Damage and precision increased!`);
			}

			// Duelist taunts each turn
			if (enemy.type === 'DUELIST') {
				const verb = gameConfig.challengeVerbs[Math.floor(Math.random() * gameConfig.challengeVerbs.length)];
				battleMessages.push(`💬 ${enemy.name} ${verb} you!`);
			}

			const miniGameLine = applyCombatModifier(this.combatModifier, playerCopy);
			if (miniGameLine) {
				battleMessages.push(miniGameLine);
			}

			// Player's Spell Turn
			for (const playerSpell of gameConfig.spells) {
				const spellLevel = playerCopy[playerSpell.id];
				if (spellLevel) {
					battleMessages.push(`${playerSpell.icon} The player cast ${playerSpell.name}`);
    		    	for (let effect of playerSpell.effects) {
    		    		let spellAmount;
    		    		switch(effect.target) {
    		    			case "self":
    		    				spellAmount = Math.ceil(playerCopy[effect.stat] * gameConfig.effectValue * spellLevel);
    	        	    		playerCopy[effect.stat] = playerCopy[effect.stat] + spellAmount;
    	        	    		battleMessages.push(`Player increases it's ${effect.stat} by ${spellAmount} for the next turn!`);
    		    				break;
    		    			case "enemy":
    		    				spellAmount = Math.ceil(enemyCopy[effect.stat] * gameConfig.effectValue * spellLevel);
    	        	    		enemyCopy[effect.stat] = enemyCopy[effect.stat] - spellAmount;
    	        	    		battleMessages.push(`Player reduces enemy's ${effect.stat} by ${spellAmount} for the next turn!`);
    		    				break;
    		    		}
    		    	}
				}
			}

			await wait(0.2);

			// Enemy's Spell Turn
			if (enemyCopy.spell) {
				const enemySpell = enemyCopy.spell;
				battleMessages.push(`${enemySpell.icon} The enemy cast ${enemySpell.name}`);
				for (let effect of enemySpell.effects) {
					let spellAmount;
					switch(effect.target) {
						case "self":
							spellAmount = Math.ceil(enemyCopy[effect.stat] * Math.ceil(enemyCopy.level / 10) * gameConfig.effectValue);
							enemyCopy[effect.stat] = enemyCopy[effect.stat] + spellAmount;
							battleMessages.push(`Enemy increases it's ${effect.stat} by ${spellAmount} for the next turn!`);
							break;
						case "enemy":
							spellAmount = Math.ceil(playerCopy[effect.stat] * Math.ceil(enemyCopy.level / 10) * gameConfig.effectValue);
							playerCopy[effect.stat] = playerCopy[effect.stat] - spellAmount;
							battleMessages.push(`Enemy reduces player's ${effect.stat} by ${spellAmount} for the next turn!`);
							break;
					}
				}
			}

			await wait(0.2);

			// Player's Turn
			if (playerHit) {
			    battleMessages.push('🎯 The player strikes!');
			    let playerDamageDealt = playerDamage;
			
			    battleMessages.push(`⚔️ Base player damage: ${playerDamageDealt}`);
			
			    // Checking for penetration
			    if (Math.random() < playerPenetration) {
			        playerDamageDealt *= 2; 
			        battleMessages.push(`💥 Player's penetration breaks through the enemy's defense! Damage doubled to ${playerDamageDealt}`);
			    } 
			    // Checking for enemy block
			    else if (Math.random() < enemyBlock) {
			        playerDamageDealt = 0;
			        battleMessages.push(`🛡️ The enemy blocks the attack! No damage dealt.`);
			    } 
			    else {
			        // Checking for a critical hit
			        if (Math.random() < playerCritical) {
			            playerDamageDealt = Math.floor(playerDamage * (1 + playerCritical));
			            battleMessages.push(`🌟 Critical hit! The player deals ${playerDamageDealt} devastating damage!`);
			        }
			
			        // Checking for enemy resistance
			        if (Math.random() < enemyResistance) {
			            playerDamageDealt -= Math.floor(playerDamage * (1 - enemyResistance));
			            battleMessages.push(`🛡️ The enemy resists the damage, reducing it to ${playerDamageDealt}`);
			        }
			    }
			
			    battleMessages.push(`🔥 Final damage dealt to the enemy: ${playerDamageDealt}`);
			
			    // Reducing enemy HP
			    enemy.currentHP = Math.max(enemy.currentHP - playerDamageDealt, 0);
			} else {
			    battleMessages.push('❌ The player misses the attack!');
			}

			await wait(0.2);

			// Enemy's Turn
			if (enemyHit) {
				battleMessages.push('🎯 The enemy strikes!');
				let enemyDamageDealt = enemyDamage;

				battleMessages.push(`⚔️ Base enemy damage: ${enemyDamageDealt}`);

				if (Math.random() < enemyPenetration) {
					enemyDamageDealt *= 2; 
					battleMessages.push(`💥 Enemy's penetration breaks through the player's defense! Damage doubled to ${enemyDamageDealt}`);
				} else if (Math.random() < playerBlock) {
					enemyDamageDealt = 0;
					battleMessages.push(`🛡️ The player blocks the attack! No damage dealt.`);
				}
				else {
					if (Math.random() < enemyCritical) {
						enemyDamageDealt = Math.floor(enemyDamage * (1 + enemyCritical));
						battleMessages.push(`🌟 Critical hit! The enemy deals ${enemyDamageDealt} devastating damage!`);
					}
	
					if (Math.random() < playerResistance) {
						enemyDamageDealt -= Math.floor(enemyDamage * (1 - playerResistance));
						battleMessages.push(`🛡️ The player resists the damage, reducing it to ${enemyDamageDealt}`);
					}
				}

				battleMessages.push(`🔥 Final damage dealt to the player: ${enemyDamageDealt}`);

				this.player.currentHP = Math.max(this.player.currentHP - enemyDamageDealt, 0);
			} else {
				battleMessages.push('❌ The enemy misses the attack!');
			}

			updateInfoBattle(turns, this.player, enemy, battleMessages);

			// Flee check: player can flee when HP drops below 33% in exploration mode
			if (this.fleeMode && this.fleeRequested) {
				this._hideFlee();
				this.fleedFromBattle = true;
				break;
			}

			turns++;
		}

		if (this.fleeMode) {
			this._hideFlee();
		}

		if (enemy.currentHP <= 0) {
			const lootChance = enemy.lootChance * (1 + this.player.bonusLoot / 100);

			if (Math.random() < lootChance) {
				const loot = this.generateLoot(enemy.level);
				if (loot) {
					this.player.inventory.push({...loot});
					updateGameNotice(`Found ${loot.name} ${loot.icon}!`);
				}
			}

			if (Math.random() < lootChance * 4) {
				const moneyAmount = enemy.level * 4;
				this.player.money += moneyAmount;
				updateGameNotice(`Found ${moneyAmount} coins!`);
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

	async performBattle(enemy, awardXP = true) {
		updateGameInfo(this.generateEnemyInfo(enemy));
		enemy.currentHP = enemy.maxHP;
		await this.battle(enemy);
		this.battleAndCheckResult(enemy, awardXP);
	}

	battleAndCheckResult(enemy, awardXP = true) {
		if (this.fleedFromBattle) {
			this.fleedFromBattle = false;
			updateGameInfo("You fled from battle!");
			if (!this.retainCombatModifier) this.clearCombatModifier();
			return;
		}

		if (this.player.currentHP > 0) {
			if (enemy.currentHP <= 0) {
				updateGameInfo("Victory!");
				if (awardXP) {
					const experiencePoints = this.calculateExperiencePoints(enemy);
					this.player.experience += experiencePoints;
					this.updatePlayerStats();
					updateGameNotice(`Gained ${experiencePoints} EXP!`);
					this.checkLevelUp();
				}
			} else {
				updateGameInfo("Draw!");
			}
		} else {
		  updateGameInfo("Defeat!");
		}

		if (!this.retainCombatModifier) {
			this.clearCombatModifier();
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

	startExploration(combatModifier = null) {
		this.setCombatModifier(combatModifier);
		this.fleeMode = true;
		this.fleeRequested = false;
		this.fleedFromBattle = false;
		const enemy = this.generateEnemy({ areaIndex: this.player.areaIndex, type: 'BASE' }, { maxLevel: this.player.level });
		clearGameInfo();
		updateGameNotice(`Starting exploration...`);
		this._showFlee();
		this.performBattle(enemy);
	}

	startChallenge(combatModifier = null) {
		this.setCombatModifier(combatModifier);
		this.bossMode = true;
		this.bossPhaseTriggered = false;
		const boss = this.generateEnemy({ areaIndex: this.player.areaIndex, type: 'BOSS' }, {});
		clearGameInfo();
		updateGameNotice("Starting challenge...");
		this.performBattle(boss).then(() => {
			this.bossMode = false;
			this.bossPhaseTriggered = false;
		});
	}

	async startMission(combatModifier = null) {
		this.setCombatModifier(combatModifier);
		this.retainCombatModifier = true;
		const enemy = this.generateEnemy({ areaIndex: this.player.areaIndex, type: 'BASE' }, { maxLevel: this.player.level - 2 });
		clearGameInfo();
		updateGameNotice("Starting mission...");
		const numEnemies = getRandomNumber(2, 3);
		updateGameInfo(this.generateRandomIntro(enemy.name, numEnemies));
		updateGameNotice("Your HP carries between fights — survive all enemies!");
		let totalReward = 0;
		let isMissionFailed = false;

		for (let i = 0; i < numEnemies; i++) {
			await this.performBattle(enemy);

			if (this.player.currentHP <= 0) {
				isMissionFailed = true;
				break;
			}

			totalReward += this.calculateMissionReward(enemy, numEnemies);
		}

		if (!isMissionFailed) {
			updateGameInfo(`Mission completed!`);
			updateGameNotice(`Reward ${totalReward} bonus coins`);
			this.player.money += totalReward;
			this.updatePlayerStats();
		} else {
			updateGameInfo("Mission failed!");
		}

		this.retainCombatModifier = false;
		this.clearCombatModifier();
	}

	async startDuel(combatModifier = null) {
		this.setCombatModifier(combatModifier);
		const enemy = this.generateEnemy({ areaIndex: this.player.areaIndex, type: 'DUELIST' }, { maxLevel: this.player.level });
		updateGameInfo(this.generateDuelChallengeSentence(enemy));

		await this.performBattle(enemy, false);

		if (this.player.currentHP > 0 && !this.fleedFromBattle) {
			const rewardXP = Math.floor(this.calculateExperiencePoints(enemy) * 1.5);
			this.player.experience += rewardXP;
			this.updatePlayerStats();
			updateGameInfo(`Duel won!`);
			updateGameNotice(`Gained ${rewardXP} XP (Duel bonus!)`);
			this.checkLevelUp();
		} else if (this.player.currentHP <= 0) {
			updateGameInfo("Duel lost!");
		}
		this.fleedFromBattle = false;
	}
}

export default BattleModule;