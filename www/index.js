// main.js

import ChooseScreen from './screens/ChooseScreen.js';
import AreasScreen from './screens/AreasScreen.js';
import InventoryScreen from './screens/InventoryScreen.js';
import BuyScreen from './screens/BuyScreen.js';
import SellScreen from './screens/SellScreen.js';
import StatsScreen from './screens/StatsScreen.js';
import SpellsScreen from './screens/SpellsScreen.js';
import EquippedScreen from './screens/EquippedScreen.js';
import GatherScreen from './screens/GatherScreen.js';
import CraftScreen from './screens/CraftScreen.js';
import MiniGameScreen from './screens/MiniGameScreen.js';
import AchievementsScreen from './screens/AchievementsScreen.js';
import ImprovementsScreen from './screens/ImprovementsScreen.js';
import gameConfig from './config/gameConfig.js';
import BattleModule from './modules/BattleModule.js';
import { healForMoney } from './modules/HealModule.js';
import { gambleMoney } from './modules/GambleModule.js';
import { Player } from './models/PlayerModel.js';
import timingGame from './games/TimingGame.js';
import clickerGame from './games/ClickerGame.js';
import memoryGame from './games/MemoryGame.js';
import { updateGameNotice } from './modules/MessageModule.js';

class Game {
	constructor() {
		this.hpDelay = 2000;
		this.player = new Player();
		this.battleModule = new BattleModule(
			this.player,
			this.updatePlayerStats.bind(this),
			this.checkLevelUp.bind(this)
		);
		this.chooseScreen = new ChooseScreen(
			this.handleScreenButtonClick.bind(this)
		);
		this.miniGameScreen = new MiniGameScreen(
			this.showGameInfoScreen.bind(this)
		);
		this.miniGameScreen.registerMiniGame(timingGame);
		this.miniGameScreen.registerMiniGame(clickerGame);
		this.miniGameScreen.registerMiniGame(memoryGame);

		this.areasScreen = new AreasScreen(
			this.player,
			this.updatePlayerStats.bind(this)
		);
		this.inventoryScreen = new InventoryScreen(
			this.player,
			this.updatePlayerStats.bind(this)
		);
		this.buyScreen = new BuyScreen(
			this.player,
			this.updatePlayerStats.bind(this)
		);
		this.sellScreen = new SellScreen(
			this.player,
			this.updatePlayerStats.bind(this)
		);
		this.statsScreen = new StatsScreen(
			this.player
		);
		this.spellsScreen = new SpellsScreen(
			this.player
		);
		this.equippedScreen = new EquippedScreen(
			this.player,
			this.updatePlayerStats.bind(this)
		);
		this.gatherScreen = new GatherScreen(
			this.player
		);
		this.craftScreen = new CraftScreen(
			this.player
		);
		this.achievementsScreen = new AchievementsScreen(
			this.player,
			this.updatePlayerStats.bind(this)
		);
		this.improvementsScreen = new ImprovementsScreen(
			this.player,
			this.updatePlayerStats.bind(this)
		);

		this.showGameInfoScreen();
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
			case 'btnSpells':
				this.showSpellsScreen();
				break;
			case 'btnEquipped':
				this.showEquippedScreen();
				break;
			case 'btnAchievements':
				this.showAchievementsScreen();
				break;
			case 'btnGather':
				this.showGatherScreen();
				break;
			case 'btnCraft':
				this.showCraftScreen();
				break;
			case 'btnImprove':
				this.showImprovementsScreen();
				break;
			case "btnGamble":
				gambleMoney(
					this.player,
					this.updatePlayerStats.bind(this)
				);
				break;
			case "btnHeal":
				healForMoney(
					this.player,
					this.updatePlayerStats.bind(this)
				);
				break;
			case "btnExperience":
				updateGameNotice("Adding 5000 experience...");
				this.player.experience += 5000;
				this.checkLevelUp();
				break;
			case "btnMoney":
				updateGameNotice("Adding 5000 money...");
				this.player.money += 5000;
				this.updatePlayerStats();
				break;
			case "btnSave":
				updateGameNotice("Saving data...");
				this.player.savePlayerData();
				break;
			case "btnLoad":
				updateGameNotice("Loading data...");
				this.player.loadPlayerData();
				this.updatePlayerStats();
				break;
			case "btnReset":
				this.player.resetPlayerData();
				break;
			default:
				break;
		}
	}

	showGameInfoScreen() {
		this.showScreen("game-info-screen");
		// this.chooseScreen.render();
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

	showSpellsScreen() {
		this.showScreen("spells-screen");
		this.spellsScreen.render();
	}

	showEquippedScreen() {
		this.showScreen("equipped-screen");
		this.equippedScreen.render();
	}

	showAchievementsScreen() {
		this.showScreen("achievements-screen");
		this.achievementsScreen.render();
	}

	showGatherScreen() {
		this.showScreen("gather-screen");
		this.gatherScreen.render();
	}

	showCraftScreen() {
		this.showScreen("craft-screen");
		this.craftScreen.render();
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

	updatePlayerStats() {
		document.getElementById("playerCurrentArea").textContent = `${gameConfig.areas[this.player.areaIndex].name} ${gameConfig.areas[this.player.areaIndex].icon}`;
		document.getElementById("playerLevel").textContent = this.player.level;
		document.getElementById("playerCurrentHP").textContent = this.player.currentHP;
		document.getElementById("playerMaxHP").textContent = this.player.maxHP;
		document.getElementById("playerExperience").textContent = `${this.player.experience} / ${this.getNextLevelExperience()}`;
		document.getElementById("playerMoney").textContent = this.player.money;
		document.getElementById("gambleCost").textContent = this.player.gambleCount + 1;
		this.updatePlayerCurrentHP();
	}

	getNextLevelExperience() {
		const nextLevelRequirement = gameConfig.levelUpRequirements.find((requirement) => requirement.level === this.player.level + 1);
		return nextLevelRequirement ? nextLevelRequirement.experience : "MAX";
	}

	levelUp() {
		this.player.maxHP += 1;

		if (this.player.level % 25 == 0) {
			this.player.regeneration += 1;
		}

		this.player.toughness += 1;
		this.player.swiftness += 1;

		if (this.player.level % 10 == 0) {
			this.player.fortitude += 1;
			this.player.defiance += 1;
			this.player.availableSpellPoints += 1;
		}

		this.player.currentHP = this.player.maxHP;

		updateGameNotice(`Congratulations! You leveled up to level ${this.player.level}.`);
		updateGameNotice(`Go to stats screen to upgrade your stats!`)

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
		// window.screen.orientation.lock('landscape');

		this.updatePlayerStats();
		this.chooseScreen.init();
		this.hpLoop();
	}
}

const game = new Game().init();