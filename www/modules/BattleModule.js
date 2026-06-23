// BattleModule.js

import { getRandomNumber } from './../utils/utils.js';
import gameConfig from './../config/gameConfig.js';
import { clearGameInfo, updateGameInfo, updateBattleSummary, updateGameNotice } from './MessageModule.js';
import { cloneCombatModifier, applyCombatModifier } from './MiniGameBonusModule.js';

class BattleModule {
    constructor(player, updatePlayerStats, checkLevelUp, streakModule = null, questModule = null) {
        this.player = player;
        this.updatePlayerStats = updatePlayerStats;
        this.checkLevelUp = checkLevelUp;
        this.combatModifier = null;
        this.retainCombatModifier = false;
        this.fleeMode = false;
        this.fleedFromBattle = false;
        this.bossMode = false;
        this.bossPhaseTriggered = false;
        this.streakModule = streakModule;
        this.questModule = questModule;
        this.currentBattleType = null;
        this.onBattleEnd = null;
    }

    setCombatModifier(modifier) {
        this.combatModifier = cloneCombatModifier(modifier);
    }

    clearCombatModifier() {
        this.combatModifier = null;
        this.retainCombatModifier = false;
    }

    generateEnemyInfo = (enemy) => `${enemy.icon} ${enemy.name} — HP:${enemy.maxHP} DAM:${enemy.damage} DEF:${enemy.defense} PRE:${enemy.precision} EVA:${enemy.evasion}`;

    filterEntities(entities, mandatoryFilters, optionalFilters = {}) {
        const eligibleEntities = entities.filter((entity) => {
            const isMatchingMandatory = Object.entries(mandatoryFilters).every(([key, value]) => entity[key] === value);
            const maxLevel = optionalFilters.maxLevel;
            const isLowerLevel = !maxLevel || entity.level <= maxLevel;
            return isMatchingMandatory && isLowerLevel;
        });

        if (eligibleEntities.length === 0) {
            const filtered = entities.filter((entity) =>
                Object.entries(mandatoryFilters).every(([key, value]) => entity[key] === value)
            );
            return [filtered.sort((a, b) => a.level - b.level)[0]];
        }

        return eligibleEntities;
    }

    generateEntity(entities) {
        return { ...entities[Math.floor(Math.random() * entities.length)] };
    }

    generateEnemy(mandatoryFilters, optionalFilters = {}) {
        const eligibleEntities = this.filterEntities(gameConfig.enemies, mandatoryFilters, optionalFilters);
        const enemy = this.generateEntity(eligibleEntities);
        this.applyAreaModifiers(enemy);
        return enemy;
    }

    applyAreaModifiers(enemy) {
        const modifiers = gameConfig.areas[this.player.areaIndex]?.modifiers ?? [];
        for (const mod of modifiers) {
            if (enemy[mod.stat] !== undefined) {
                enemy[mod.stat] = Math.floor(enemy[mod.stat] * (1 + mod.bonus));
            }
        }
    }

    battle(enemy) {
        const maxTurns = 30;
        let turns = 1;
        const allRounds = [];

        while (this.player.currentHP > 0 && enemy.currentHP > 0 && turns <= maxTurns) {
            const playerCopy = { ...this.player };
            const enemyCopy = { ...enemy };

            const relicFlatBoost = (this.player.relicsOwned ?? []).includes('battle_hardened') ? 5 : 0;
            const basePlayerDamage     = playerCopy.damage     + this.player.calculateEquippedDamage()     + relicFlatBoost;
            const basePlayerDefense    = playerCopy.defense    + this.player.calculateEquippedDefense()    + relicFlatBoost;
            const basePlayerPrecision  = playerCopy.precision  + this.player.calculateEquippedPrecision();
            const basePlayerEvasion    = playerCopy.evasion    + this.player.calculateEquippedEvasion();
            const basePlayerCritical   = playerCopy.critical   + this.player.calculateEquippedCritical();
            const basePlayerResistance = playerCopy.resistance + this.player.calculateEquippedResistance();
            const basePlayerBlock      = playerCopy.block      + this.player.calculateEquippedBlock();
            const basePlayerPenetration= playerCopy.penetration+ this.player.calculateEquippedPenetration();

            const playerDamageReduction = this.calculateDamageReduction(basePlayerDefense);
            const enemyDamageReduction  = this.calculateDamageReduction(enemyCopy.defense);

            const playerDamage = Math.floor(Math.max(basePlayerDamage * (1 - enemyDamageReduction) / 2, 1));
            const enemyDamage  = Math.floor(Math.max(enemyCopy.damage * (1 - playerDamageReduction) / 2, 1));

            const playerHitChance = this.calculateHitChance(basePlayerPrecision, enemyCopy.evasion);
            const enemyHitChance  = this.calculateHitChance(enemyCopy.precision, basePlayerEvasion);

            const playerCritical   = basePlayerCritical    / 100;
            const enemyCritical    = enemyCopy.critical    / 100;
            const playerResistance = basePlayerResistance  / 100;
            const enemyResistance  = enemyCopy.resistance  / 100;
            const playerBlock      = basePlayerBlock       / 100;
            const enemyBlock       = enemyCopy.block       / 100;
            const playerPenetration= basePlayerPenetration / 100;
            const enemyPenetration = enemyCopy.penetration / 100;

            const playerHit = Math.random() < playerHitChance;
            const enemyHit  = Math.random() < enemyHitChance;

            const battleMessages = [];

            // Boss phase 2
            if (this.bossMode && !this.bossPhaseTriggered && enemy.currentHP <= Math.floor(enemy.maxHP / 2)) {
                this.bossPhaseTriggered = true;
                enemy.damage    = Math.floor(enemy.damage    * 1.3);
                enemy.precision = Math.floor(enemy.precision * 1.3);
                battleMessages.push(`💀 ${enemy.name} enrages — Damage and Precision +30%!`);
            }

            if (enemy.type === 'DUELIST') {
                const verb = gameConfig.challengeVerbs[Math.floor(Math.random() * gameConfig.challengeVerbs.length)];
                battleMessages.push(`💬 "${verb}!"`);
            }

            const miniGameLine = applyCombatModifier(this.combatModifier, playerCopy);
            if (miniGameLine) battleMessages.push(miniGameLine);

            // Player spells
            for (const spell of gameConfig.spells) {
                const spellLevel = playerCopy[spell.id];
                if (spellLevel) {
                    for (const effect of spell.effects) {
                        const amount = Math.ceil(playerCopy[effect.stat] * gameConfig.effectValue * spellLevel);
                        if (effect.target === 'self') {
                            playerCopy[effect.stat] += amount;
                            battleMessages.push(`${spell.icon} You cast ${spell.name}: +${amount} ${effect.stat}`);
                        } else {
                            enemyCopy[effect.stat] -= amount;
                            battleMessages.push(`${spell.icon} You cast ${spell.name}: enemy −${amount} ${effect.stat}`);
                        }
                    }
                }
            }

            // Enemy spell
            if (enemyCopy.spell) {
                const s = enemyCopy.spell;
                for (const effect of s.effects) {
                    const amount = Math.ceil(enemyCopy[effect.stat] * Math.ceil(enemyCopy.level / 10) * gameConfig.effectValue);
                    if (effect.target === 'self') {
                        enemyCopy[effect.stat] += amount;
                        battleMessages.push(`${s.icon} ${enemyCopy.name} casts ${s.name}: +${amount} ${effect.stat}`);
                    } else {
                        playerCopy[effect.stat] -= amount;
                        battleMessages.push(`${s.icon} ${enemyCopy.name} casts ${s.name}: your −${amount} ${effect.stat}`);
                    }
                }
            }

            // Player attack
            if (playerHit) {
                let dmg = playerDamage;
                if (Math.random() < playerPenetration) {
                    dmg *= 2;
                    battleMessages.push(`💥 Armor pierced! You deal ${dmg} damage`);
                } else if (Math.random() < enemyBlock) {
                    dmg = 0;
                    battleMessages.push(`🛡️ Your attack is blocked`);
                } else {
                    if (Math.random() < playerCritical) {
                        const multi = this.player.relicsOwned?.includes('lucky_strike') ? 3 : (1 + playerCritical);
                        dmg = Math.floor(playerDamage * multi);
                        battleMessages.push(`🌟 Critical hit for ${dmg} damage!`);
                    } else {
                        if (Math.random() < enemyResistance) {
                            dmg -= Math.floor(playerDamage * (1 - enemyResistance));
                        }
                        battleMessages.push(`⚔️ You deal ${dmg} damage`);
                    }
                }
                enemy.currentHP = Math.max(enemy.currentHP - dmg, 0);
            } else {
                battleMessages.push(`❌ Your attack misses`);
            }

            // Enemy attack
            if (enemyHit) {
                let dmg = enemyDamage;
                if (Math.random() < enemyPenetration) {
                    dmg *= 2;
                    battleMessages.push(`💥 ${enemyCopy.name} pierces for ${dmg} damage!`);
                } else if (Math.random() < playerBlock) {
                    dmg = 0;
                    battleMessages.push(`🛡️ You block ${enemyCopy.name}'s attack`);
                } else {
                    if (Math.random() < enemyCritical) {
                        dmg = Math.floor(enemyDamage * (1 + enemyCritical));
                        battleMessages.push(`💀 ${enemyCopy.name} crits for ${dmg} damage!`);
                    } else {
                        if (Math.random() < playerResistance) {
                            dmg -= Math.floor(enemyDamage * (1 - playerResistance));
                        }
                        battleMessages.push(`🎯 ${enemyCopy.name} hits you for ${dmg} damage`);
                    }
                }
                this.player.currentHP = Math.max(this.player.currentHP - dmg, 0);
            } else {
                battleMessages.push(`❌ ${enemyCopy.name} misses`);
            }

            const fled = this.fleeMode && this.player.currentHP > 0 && this.player.currentHP < this.player.maxHP * 0.33;
            allRounds.push({
                turn: turns,
                playerHP: this.player.currentHP,
                playerMaxHP: this.player.maxHP,
                enemyHP: enemy.currentHP,
                enemyMaxHP: enemy.maxHP,
                messages: battleMessages,
                fled,
            });

            if (fled) {
                this.fleedFromBattle = true;
                break;
            }

            turns++;
        }

        return allRounds;
    }

    calculateDamageReduction(defense) {
        return defense / (defense + 50);
    }

    calculateHitChance(attackerPrecision, defenderEvasion) {
        const precisionModifier = attackerPrecision - defenderEvasion;
        const hitChance = 0.5 + precisionModifier * 0.002;
        return Math.max(0.05, Math.min(0.95, hitChance));
    }

    generateLoot(level) {
        const filteredItems = gameConfig.itemsList.filter((item) => item.level <= level);
        if (filteredItems.length === 0) return null;
        return filteredItems[Math.floor(Math.random() * filteredItems.length)];
    }

    performBattle(enemy, awardXP = true) {
        enemy.currentHP = enemy.maxHP;
        const playerHPBefore = this.player.currentHP;
        const rounds = this.battle(enemy);
        updateBattleSummary(rounds, this.player, enemy, playerHPBefore);
        this.battleAndCheckResult(enemy, awardXP);
    }

    battleAndCheckResult(enemy, awardXP = true) {
        if (this.fleedFromBattle) {
            this.fleedFromBattle = false;
            updateGameInfo("⚠️ Retreated — low HP!");
            if (!this.retainCombatModifier) this.clearCombatModifier();
            return;
        }

        if (this.player.currentHP > 0) {
            if (enemy.currentHP <= 0) {
                updateGameInfo("Victory!");

                const relics = this.player.relicsOwned ?? [];
                const scavengerBonus = relics.includes('scavenger') ? 0.15 : 0;
                const lootChance = enemy.lootChance * (1 + this.player.bonusLoot / 100) + scavengerBonus;

                const gotLoot = Math.random() < lootChance;
                if (gotLoot) {
                    const loot = this.generateLoot(enemy.level);
                    if (loot) {
                        this.player.inventory.push({ ...loot });
                        updateGameNotice(`Found ${loot.name} ${loot.icon}!`);
                        if (this.questModule) this.questModule.trackEvent('lootDrop', 1);
                    }
                }

                if (!gotLoot && this.streakModule?.shouldDropFreeLoot(this.player)) {
                    const loot = this.generateLoot(enemy.level);
                    if (loot) {
                        this.player.inventory.push({ ...loot });
                        updateGameNotice(`🔥 Unstoppable bonus: ${loot.name} ${loot.icon}!`);
                        if (this.questModule) this.questModule.trackEvent('lootDrop', 1);
                    }
                }

                if (Math.random() < lootChance * 4) {
                    const coinMultiplier = relics.includes('gold_rush') ? 1.2 : 1;
                    const streakCoinBonus = this.streakModule ? this.streakModule.getCoinBonus(this.player) : 0;
                    const challengeMultiplier = this.currentBattleType === 'challenge' ? 3 : 1;
                    const moneyAmount = Math.floor(enemy.level * 4 * coinMultiplier * challengeMultiplier * (1 + streakCoinBonus));
                    this.player.money += moneyAmount;
                    updateGameNotice(`Found ${moneyAmount} coins!`);
                }

                const killedEnemies = this.player.killedEnemies;
                killedEnemies.set(enemy.id, (killedEnemies.get(enemy.id) ?? 0) + 1);

                if (this.streakModule) this.streakModule.recordWin(this.player, this.questModule);
                if (this.questModule) {
                    this.questModule.trackEvent('anyWin', 1);
                    this.questModule.trackEvent('winNoFlee', 1);
                    if (this.currentBattleType === 'exploration') this.questModule.trackEvent('explorationWin', 1);
                    if (this.currentBattleType === 'challenge')   this.questModule.trackEvent('challengeWin', 1);
                }

                if (relics.includes('survivors_grit')) {
                    const heal = Math.max(1, Math.floor(this.player.maxHP * 0.10));
                    this.player.currentHP = Math.min(this.player.maxHP, this.player.currentHP + heal);
                    updateGameNotice(`💪 Survivor's Grit: +${heal} HP`);
                }

                if (awardXP) {
                    const xp = this.calculateExperiencePoints(enemy);
                    this.player.experience += xp;
                    this.updatePlayerStats();
                    updateGameNotice(`+${xp} XP`);
                    this.checkLevelUp();
                }
            } else {
                updateGameInfo("Draw!");
            }
        } else {
            updateGameInfo("Defeat!");
            if (this.streakModule) this.streakModule.recordLoss();
        }

        if (!this.retainCombatModifier) this.clearCombatModifier();
    }

    calculateExperiencePoints(enemy) {
        const baseExperience = 25;
        const levelDifference = this.player.level - enemy.level;
        const adjustmentFactor = levelDifference >= 0 ? 1 / (1 + levelDifference) : 1 - levelDifference / this.player.level;

        const relics = this.player.relicsOwned ?? [];
        const ironWillBonus   = relics.includes('iron_will')         ? 0.10 : 0;
        const challengerBonus = (relics.includes('challengers_mark') && this.currentBattleType === 'challenge') ? 1.0 : 0;
        const streakXPBonus   = this.streakModule ? this.streakModule.getXPBonus(this.player) : 0;

        const multiplier = 1 + this.player.bonusExp / 100 + ironWillBonus + challengerBonus + streakXPBonus;
        return Math.floor(baseExperience * enemy.level * adjustmentFactor * multiplier);
    }

    generateRandomIntro(enemyType, numEnemies) {
        const personInNeed   = gameConfig.peopleInNeed   [Math.floor(Math.random() * gameConfig.peopleInNeed.length)];
        const aidRequest     = gameConfig.aidRequests    [Math.floor(Math.random() * gameConfig.aidRequests.length)];
        const enemyDescriptor= gameConfig.enemyDescriptors[Math.floor(Math.random() * gameConfig.enemyDescriptors.length)];
        const groupPhrase    = gameConfig.groupPhrases   [Math.floor(Math.random() * gameConfig.groupPhrases.length)];
        const actionVerb     = gameConfig.actionVerbs    [Math.floor(Math.random() * gameConfig.actionVerbs.length)];
        const location       = gameConfig.locations      [Math.floor(Math.random() * gameConfig.locations.length)];
        return `${personInNeed} ${aidRequest}! ${groupPhrase} ${numEnemies} ${enemyDescriptor} ${enemyType} is ${actionVerb} ${location}!`;
    }

    calculateMissionReward(enemy, numEnemies) {
        const levelDifference = this.player.level - enemy.level;
        const levelModifier = Math.max(0.1, 1 - Math.max(0, levelDifference) * 0.1);
        return Math.max(1, Math.round(numEnemies * 10 * levelModifier));
    }

    generateDuelChallengeSentence(enemy) {
        const verbs = ["challenges", "defies", "dares", "provokes", "taunts"];
        return `${enemy.icon} ${enemy.name} ${verbs[Math.floor(Math.random() * verbs.length)]} you to a duel!`;
    }

    startExploration(combatModifier = null) {
        this.currentBattleType = 'exploration';
        this.fleeMode = true;
        this.fleedFromBattle = false;
        this.setCombatModifier(combatModifier);
        const enemy = this.generateEnemy({ areaIndex: this.player.areaIndex, type: 'BASE' }, { maxLevel: this.player.level });
        clearGameInfo();
        this.performBattle(enemy);
        this.fleeMode = false;
        if (this.onBattleEnd) this.onBattleEnd();
    }

    startChallenge(combatModifier = null) {
        this.currentBattleType = 'challenge';
        this.setCombatModifier(combatModifier);
        this.bossMode = true;
        this.bossPhaseTriggered = false;
        const boss = this.generateEnemy({ areaIndex: this.player.areaIndex, type: 'BOSS' }, {});
        clearGameInfo();
        updateGameNotice("Boss fight! 2× XP and bonus coins.");
        this.performBattle(boss);
        this.bossMode = false;
        this.bossPhaseTriggered = false;
        if (this.onBattleEnd) this.onBattleEnd();
    }

    startMission(combatModifier = null) {
        this.currentBattleType = 'mission';
        this.setCombatModifier(combatModifier);
        this.retainCombatModifier = true;
        const enemy = this.generateEnemy({ areaIndex: this.player.areaIndex, type: 'BASE' }, { maxLevel: this.player.level - 2 });
        clearGameInfo();
        const numEnemies = getRandomNumber(2, 3);
        updateGameInfo(this.generateRandomIntro(enemy.name, numEnemies));
        updateGameNotice("HP carries between fights — survive all enemies!");
        let totalReward = 0;
        let failed = false;

        for (let i = 0; i < numEnemies; i++) {
            this.performBattle(enemy);
            if (this.player.currentHP <= 0) {
                failed = true;
                break;
            }
            totalReward += this.calculateMissionReward(enemy, numEnemies);
        }

        if (!failed) {
            updateGameInfo("Mission completed!");
            updateGameNotice(`Reward: +${totalReward} coins`);
            this.player.money += totalReward;
            this.updatePlayerStats();
            if (this.questModule) this.questModule.trackEvent('missionWin', 1);
        } else {
            updateGameInfo("Mission failed!");
            if (this.streakModule) this.streakModule.recordLoss();
        }

        this.retainCombatModifier = false;
        this.clearCombatModifier();
        if (this.onBattleEnd) this.onBattleEnd();
    }

    startDuel(combatModifier = null) {
        this.currentBattleType = 'duel';
        this.setCombatModifier(combatModifier);
        const enemy = this.generateEnemy({ areaIndex: this.player.areaIndex, type: 'DUELIST' }, { maxLevel: this.player.level });
        clearGameInfo();
        updateGameInfo(this.generateDuelChallengeSentence(enemy));
        this.performBattle(enemy, false);

        if (this.player.currentHP > 0 && !this.fleedFromBattle) {
            const xp = Math.floor(this.calculateExperiencePoints(enemy) * 1.5);
            this.player.experience += xp;
            this.updatePlayerStats();
            updateGameInfo("Duel won!");
            updateGameNotice(`+${xp} XP (Duel bonus!)`);
            if (this.questModule) this.questModule.trackEvent('duelWin', 1);
            this.checkLevelUp();
        } else if (this.player.currentHP <= 0) {
            updateGameInfo("Duel lost!");
        }
        this.fleedFromBattle = false;
        if (this.onBattleEnd) this.onBattleEnd();
    }
}

export default BattleModule;
