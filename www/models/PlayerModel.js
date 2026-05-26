import { mapToArray, arrayToMap } from "../utils/utils.js";
import { updateGameNotice } from "../modules/MessageModule.js";

export class Player {
    constructor() {
        this.level = 1;
        // hp
        this.maxHP = 10;
        this.currentHP = 10;
        this.regeneration = 1;
        // toughness
        this.toughness = 4;
        this.damage = 1;
        this.defense = 1;
        // swiftness
        this.swiftness = 4;
        this.precision = 1;
        this.evasion = 1;
        // fortitude
        this.fortitude = 0;
        this.critical = 1;
        this.resistance = 1;
        // defiance
        this.defiance = 0;
        this.block = 1;
        this.penetration = 1;
        // bonuses
        this.bonusExp = 1;
        this.bonusLoot = 1;
        // item
        this.damageItem = null;
        this.defenseItem = null;
        this.regenerationItem = null;
        this.precisionItem = null;
        this.evasionItem = null;
        this.criticalItem = null;
        this.resistanceItem = null;
        this.blockItem = null;
        this.penetrationItem = null;
        this.bonusExpItem = null;
        this.bonusLootItem = null;
        // spells
        this.spell1 = 0;
        this.spell2 = 0;
        this.spell3 = 0;
        this.spell4 = 0;
        this.spell5 = 0;
        this.spell6 = 0;
        this.spell7 = 0;
        this.spell8 = 0;
        this.spell9 = 0;
        this.spell10 = 0;
        // other data
        this.inventory = [];
        this.money = 0;
        this.experience = 0;
        this.gatheringXP = 0;
        this.areaIndex = 0;
        this.killedEnemies = new Map();
        this.claimedRewards = new Map();
        this.gambleCount = 0;
        this.availableSpellPoints = 1;
    }

	calculateEquippedStat(stat) {
		const item = this[stat + "Item"];
		if (item) {
			const { level, improvementLevel } = item;
			const finalLevel = level + improvementLevel;

			switch (stat) {
				case "defense":
				case "damage":
				case "precision":
				case "evasion":
					return Math.floor(finalLevel / 2);
				case "critical":
				case "resistance":
                case "block":
                case "penetration":
					return Math.ceil(finalLevel / 5);
				case "bonusExp":
				case "bonusLoot":
					return Math.floor(finalLevel / 20);
                case "regeneration":
                    return Math.floor(finalLevel / 15);
				default:
					return 0;
			}
		} else {
			return 0;
		}
	}

    calculateEquippedDefense() {
        return this.calculateEquippedStat("defense");
    }

    calculateEquippedDamage() {
        return this.calculateEquippedStat("damage");
    }

    calculateEquippedRegeneration() {
        return this.calculateEquippedStat("regeneration");
    }

    calculateEquippedPrecision() {
        return this.calculateEquippedStat("precision");
    }

    calculateEquippedEvasion() {
        return this.calculateEquippedStat("evasion");
    }

    calculateEquippedCritical() {
        return this.calculateEquippedStat("critical");
    }

    calculateEquippedResistance() {
        return this.calculateEquippedStat("resistance");
    }

    calculateEquippedBlock() {
        return this.calculateEquippedStat("block");
    }

    calculateEquippedPenetration() {
        return this.calculateEquippedStat("penetration");
    }

    calculateEquippedBonusExp() {
        return this.calculateEquippedStat("bonusExp");
    }

    calculateEquippedBonusLoot() {
        return this.calculateEquippedStat("bonusLoot");
    }

    levelUp() {
        this.maxHP += 1;
        if (this.level % 25 === 0) {
            this.regeneration += 1;
        }
        this.toughness += 1;
        this.swiftness += 1;
        if (this.level % 10 === 0) {
            this.fortitude += 1;
            this.defiance += 1;
            this.availableSpellPoints += 1;
        }
        this.currentHP = this.maxHP;
    }

    regenerate() {
        this.currentHP = Math.min(this.maxHP, this.currentHP + this.regeneration + this.calculateEquippedRegeneration());
    }

    checkLevelUp(levelUpRequirements) {
        for (const requirement of levelUpRequirements) {
            if (this.level < requirement.level && this.experience >= requirement.experience) {
                this.level = requirement.level;
                this.experience = requirement.experience;
                this.levelUp();
                return this.level;
            }
        }
        return null;
    }

    savePlayerData() {
        const savedPlayer = {
            ...this,
            killedEnemies: mapToArray(this.killedEnemies),
            claimedRewards: mapToArray(this.claimedRewards),
        };

        localStorage.setItem("playerData", JSON.stringify(savedPlayer));
        updateGameNotice("Player data saved.");
    }

    loadPlayerData() {
        const savedData = localStorage.getItem("playerData");
        if (savedData) {
            const parsedData = JSON.parse(savedData)

            Object.assign(this, {
                ...parsedData,
                killedEnemies: arrayToMap(parsedData.killedEnemies),
                claimedRewards: arrayToMap(parsedData.claimedRewards)
            });

            updateGameNotice("Player data loaded.");
            return true;
        }

        updateGameNotice("No saved data found.");
        return false;
    }

    resetPlayerData() {
        localStorage.removeItem("playerData");
        location.reload();
    }
}
