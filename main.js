// main.js

import MainScreen from './screens/MainScreen.js';
import AreasScreen from './screens/AreasScreen.js';
import InventoryScreen from './screens/InventoryScreen.js';
import BuyScreen from './screens/BuyScreen.js';
import SellScreen from './screens/SellScreen.js';
import StatsScreen from './screens/StatsScreen.js';
import EquippedScreen from './screens/EquippedScreen.js';
import MiniGameScreen from './screens/MiniGameScreen.js';
import AchievementsScreen from './screens/AchievementsScreen.js';
import ImprovementsScreen from './screens/ImprovementsScreen.js';
import gameConfig from './config/gameConfig.js';
import BattleModule from './modules/BattleModule.js';
import { healForMoney } from './modules/HealModule.js';
import { gambleMoney } from './modules/GambleModule.js';
import timingGame from './games/TimingGame.js';
import clickerGame from './games/ClickerGame.js';
import memoryGame from './games/MemoryGame.js';

class Game {
	constructor() {
		this.hpDelay = 200;
		this.player = {
			level: 1,
			maxHP: 25,
			currentHP: 25,
			damage: 6,
			defense: 6,
			regeneration: 1,
			precision: 25,
			evasion: 25,
			critical: 0,
			resistance: 0,
			bonusExp: 0,
			bonusLoot: 0,
			damageItem: null,
			defenseItem: null,
			regenerationItem: null,
			precisionItem: null,
			evasionItem: null,
			criticalItem: null,
			resistanceItem: null,
			bonusExpItem: null,
			bonusLootItem: null,
			calculateEquippedDefense: () => this.calculateEquippedStat("defense"),
			calculateEquippedDamage: () => this.calculateEquippedStat("damage"),
			calculateEquippedRegeneration: () => this.calculateEquippedStat("regeneration"),
			calculateEquippedPrecision: () => this.calculateEquippedStat("precision"),
			calculateEquippedEvasion: () => this.calculateEquippedStat("evasion"),
			calculateEquippedCritical: () => this.calculateEquippedStat("critical"),
			calculateEquippedResistance: () => this.calculateEquippedStat("resistance"),
			calculateEquippedBonusExp: () => this.calculateEquippedStat("bonusExp"),
			calculateEquippedBonusLoot: () => this.calculateEquippedStat("bonusLoot"),
			inventory: [],
			money: 0,
			experience: 0,
			areaIndex: 0,
			killedEnemies: new Map(),
			claimedRewards: new Map()
		};
		this.battleModule = new BattleModule(
			this.player,
			this.updateGameInfo.bind(this),
			this.updatePlayerStats.bind(this),
			this.checkLevelUp.bind(this)
		);
		this.mainScreen = new MainScreen(
			this.handleScreenButtonClick.bind(this)
		);
		this.miniGameScreen = new MiniGameScreen(
			this.updateGameInfo.bind(this),
			this.showMainScreen.bind(this)
		);
		this.miniGameScreen.registerMiniGame(timingGame);
		this.miniGameScreen.registerMiniGame(clickerGame);
		this.miniGameScreen.registerMiniGame(memoryGame);

		this.areasScreen = new AreasScreen(
			this.player,
			this.updateGameInfo.bind(this),
			this.updatePlayerStats.bind(this)
		);
		this.inventoryScreen = new InventoryScreen(
			this.player,
			this.updateGameInfo.bind(this),
			this.updatePlayerStats.bind(this)
		);
		this.buyScreen = new BuyScreen(
			this.player,
			this.getItemValue,
			this.updateGameInfo.bind(this),
			this.updatePlayerStats.bind(this)
		);
		this.sellScreen = new SellScreen(
			this.player,
			this.getItemValue,
			this.updateGameInfo.bind(this),
			this.updatePlayerStats.bind(this)
		);
		this.statsScreen = new StatsScreen(
			this.player
		);
		this.equippedScreen = new EquippedScreen(
			this.player
		);
		this.achievementsScreen = new AchievementsScreen(
			this.player,
			this.updateGameInfo.bind(this),
			this.updatePlayerStats.bind(this)
		);
		this.improvementsScreen = new ImprovementsScreen(
			this.player,
			this.updateGameInfo.bind(this),
			this.updatePlayerStats.bind(this)
		);

		this.showMainScreen();
	}

	handleScreenButtonClick(buttonId) {
		switch (buttonId) {
			case 'btnExploration':
				this.showMiniGameScreen(this.battleModule.startExploration.bind(this.battleModule));
				break;
			case 'btnChallenge':
				this.showMiniGameScreen(this.battleModule.startChallenge.bind(this.battleModule));
				break;
			case 'btnMission':
				this.showMiniGameScreen(this.battleModule.startMission.bind(this.battleModule));
				break;
			case 'btnDuel':
				this.showMiniGameScreen(this.battleModule.startDuel.bind(this.battleModule));
				break;
			case 'btnAreas':
				this.showAreasScreen();
				break;
			case 'btnInventory':
				this.showInventoryScreen();
				break;
			case 'btnBuy':
				this.showBuyScreen();
				break;
			case 'btnSell':
				this.showSellScreen();
				break;
			case 'btnStats':
				this.showStatsScreen();
				break;
			case 'btnEquipped':
				this.showEquippedScreen();
				break;
			case 'btnAchievements':
				this.showAchievementsScreen();
				break;
			case 'btnImprove':
				this.showImprovementsScreen();
				break;
			case "btnGamble":
				gambleMoney(
					this.player,
					this.updateGameInfo.bind(this),
					this.updatePlayerStats.bind(this)
				);
				break;
			case "btnHeal":
				healForMoney(
					this.player,
					this.updateGameInfo.bind(this),
					this.updatePlayerStats.bind(this)
				);
				break;
			case "btnExperience":
				this.player.experience += 5000;
				this.updateGameInfo("Adding 5000 experience...");
				this.checkLevelUp();
				break;
			case "btnMoney":
				this.player.money += 5000;
				this.updateGameInfo("Adding 5000 money...");
				this.updatePlayerStats();
				break;
			case "btnSave":
				this.savePlayerData();
			case "btnLoad":
				this.loadPlayerData();
			case "btnReset":
				this.resetPlayerData();
				break;
			default:
				break;
		}
	}

	showMainScreen() {
		this.showScreen("main-screen");
		this.mainScreen.render();
	}

	showMiniGameScreen(action) {
		this.showScreen("mini-game-screen");
		this.miniGameScreen.render(action);
	}

	showAreasScreen() {
		this.showScreen("areas-screen");
		this.areasScreen.render();
	}

	showInventoryScreen() {
		this.showScreen("inventory-screen");
		this.inventoryScreen.render();
	}

	showBuyScreen() {
		this.showScreen("buy-screen");
		this.buyScreen.render();
	}

	showSellScreen() {
		this.showScreen("sell-screen");
		this.sellScreen.render();
	}

	showStatsScreen() {
		this.showScreen("stats-screen");
		this.statsScreen.render();
	}

	showEquippedScreen() {
		this.showScreen("equipped-screen");
		this.equippedScreen.render();
	}

	showAchievementsScreen() {
		this.showScreen("achievements-screen");
		this.achievementsScreen.render();
	}

	showImprovementsScreen() {
		this.showScreen("improvements-screen");
		this.improvementsScreen.render();
	}

	showScreen(screenId) {
		const screens = document.querySelectorAll("#main-screens > div");
		for (let i = 0; i < screens.length; i++) {
			const screen = screens[i];
			if (screen.id === screenId) {
				screen.classList.remove("hidden");
			} else {
				screen.classList.add("hidden");
			}
		}
	}

	updateGameInfo(message) {
		const gameInfoElement = document.getElementById("game-info");
		const messageElement = document.createElement("article");
		messageElement.innerHTML = message;
		gameInfoElement.insertBefore(messageElement, gameInfoElement.firstChild);
	}

	getItemValue(item) {
		const { type, stat, level, improvementLevel  } = item;

		if (type === "stat") {
			switch (stat) {
				case "defense":
				case "damage":
					return (level + improvementLevel) * 20;
				case "precision":
				case "evasion":
					return (level + improvementLevel) * 10;
				case "critical":
				case "resistance":
					return (level + improvementLevel) * 5;
				case "bonusExp":
				case "bonusLoot":
					return (level + improvementLevel) * 50;
				case "regeneration":
					return (level + improvementLevel) * 100;
				default:
					return 0;
			}
		} else {
			return 0;
		}
	}

	savePlayerData() {
		localStorage.setItem("playerData", JSON.stringify(player));
		alert("Player data saved!");
	}

	loadPlayerData() {
		const savedData = localStorage.getItem("playerData");
		if (savedData) {
			Object.assign(player, JSON.parse(savedData));
			this.updatePlayerStats();
			alert("Player data loaded!");
		} else {
			alert("No saved data found!");
		}
	}

	resetPlayerData() {
		localStorage.removeItem("playerData");
		location.reload();
	}

	updatePlayerStats() {
		document.getElementById("playerCurrentArea").textContent = `${gameConfig.areas[this.player.areaIndex].name} ${gameConfig.areas[this.player.areaIndex].icon}`;
		document.getElementById("playerLevel").textContent = this.player.level;
		document.getElementById("playerCurrentHP").textContent = this.player.currentHP;
		document.getElementById("playerMaxHP").textContent = this.player.maxHP;
		document.getElementById("playerRegeneration").textContent = `${this.player.regeneration} (+${this.player.calculateEquippedRegeneration()})`;
		document.getElementById("playerExperience").textContent = `${this.player.experience} / ${this.getNextLevelExperience()}`;
		document.getElementById("playerMoney").textContent = this.player.money;
		this.updatePlayerCurrentHP();
	}

	getNextLevelExperience() {
		const nextLevelRequirement = gameConfig.levelUpRequirements.find((requirement) => requirement.level === this.player.level + 1);
		return nextLevelRequirement ? nextLevelRequirement.experience : "MAX";
	}

	calculateEquippedStat(itemType) {
		const item = this.player[itemType + "Item"];
		if (item) {
			const { level, improvementLevel } = item;
			const finalLevel = level + improvementLevel;

			switch (itemType) {
				case "defense":
				case "damage":
					return finalLevel;
				case "regeneration":
					return finalLevel / 25;
				case "precision":
				case "evasion":
					return finalLevel / 3;
				case "critical":
				case "resistance":
					return finalLevel / 2;
				case "bonusExp":
				case "bonusLoot":
					return finalLevel;
				default:
					return 0;
			}
		} else {
			return 0;
		}
	}

	levelUp() {
		this.player.maxHP += 5;
		this.player.currentHP = this.player.maxHP;
		this.player.damage += 2;
		this.player.defense += 2;
		if (this.player.level % 5 == 0) this.player.precision += 1;
		if (this.player.level % 5 == 0) this.player.evasion += 1;
		if (this.player.level % 10 == 0) this.player.regeneration += 1;
		if (this.player.level % 5 == 0) this.player.critical += 1;
		if (this.player.level % 5 == 0) this.player.resistance += 1;
		this.updateGameInfo(`Congratulations! You leveled up to level ${this.player.level}.`);
		this.updatePlayerStats();
	}
	
	checkLevelUp() {
		const currentLevel = this.player.level;
		const experiencePoints = this.player.experience;
	
		for (let i = 0; i < gameConfig.levelUpRequirements.length; i++) {
			const requirement = gameConfig.levelUpRequirements[i];
			if (currentLevel < requirement.level && experiencePoints >= requirement.experience) {
				this.player.level = requirement.level;
				this.player.experience = requirement.experience;
				this.levelUp();
				this.updatePlayerStats();
				break;
			}
		}
	}

	regenerateHP() {
		if (this.player.currentHP < this.player.maxHP) {
			this.player.currentHP = Math.min(this.player.maxHP, this.player.currentHP + this.player.regeneration + this.player.calculateEquippedRegeneration());
			this.updatePlayerCurrentHP();
		}
	}

	updatePlayerCurrentHP() {
		const currentHPElement = document.getElementById("playerCurrentHP");
		currentHPElement.textContent = this.player.currentHP;
	}
	
	hpLoop() {
		this.regenerateHP();
		setTimeout(this.hpLoop.bind(this), this.hpDelay);
	}

	init() {
		const backToMainButtons = document.querySelectorAll(".btnBackToMain");

		backToMainButtons.forEach((button) => {
			button.addEventListener("click", this.showMainScreen.bind(this));
		});

		this.updatePlayerStats();
		this.mainScreen.init();
		this.hpLoop();
	}
}

const game = new Game().init();