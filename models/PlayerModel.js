import { mapToArray, arrayToMap } from "../utils/utils.js";

export class Player {
    constructor() {
        this.level = 1;
        this.maxHP = 20;
        this.currentHP = 20;
        this.damage = 5;
        this.defense = 5;
        this.precision = 5;
        this.evasion = 5;
        this.regeneration = 1;
        this.critical = 0;
        this.resistance = 0;
        this.bonusExp = 0;
        this.bonusLoot = 0;
        this.damageItem = null;
        this.defenseItem = null;
        this.regenerationItem = null;
        this.precisionItem = null;
        this.evasionItem = null;
        this.criticalItem = null;
        this.resistanceItem = null;
        this.bonusExpItem = null;
        this.bonusLootItem = null;
        this.inventory = [];
        this.money = 0;
        this.experience = 0;
        this.areaIndex = 0;
        this.killedEnemies = new Map();
        this.claimedRewards = new Map();
        this.gambleCount = 0;
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
					return finalLevel;
				case "critical":
				case "resistance":
					return finalLevel / 2;
				case "regeneration":
					return finalLevel / 25;
				case "bonusExp":
				case "bonusLoot":
					return finalLevel / 3;
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

    calculateEquippedBonusExp() {
        return this.calculateEquippedStat("bonusExp");
    }

    calculateEquippedBonusLoot() {
        return this.calculateEquippedStat("bonusLoot");
    }

    savePlayerData() {
        const savedPlayer = {
            ...this,
            killedEnemies: mapToArray(this.killedEnemies),
            claimedRewards: mapToArray(this.claimedRewards),
        };

        localStorage.setItem("playerData", JSON.stringify(savedPlayer));
        alert("Player data saved!");
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

            alert("Player data loaded!");
        } else {
            alert("No saved data found!");
        }
    }

    resetPlayerData() {
        localStorage.removeItem("playerData");
        location.reload();
    }
}
