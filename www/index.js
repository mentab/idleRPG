// main.js

import ChooseScreen from './screens/ChooseScreen.js';
import AreasScreen from './screens/AreasScreen.js';
import InventoryScreen from './screens/InventoryScreen.js';
import ShopScreen from './screens/ShopScreen.js';
import StatsScreen from './screens/StatsScreen.js';
import SpellsScreen from './screens/SpellsScreen.js';
import EquippedScreen from './screens/EquippedScreen.js';
import GatherScreen from './screens/GatherScreen.js';
// CraftScreen disabled until recipe system is implemented (phase 2+)
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
import asciiReactionGame from './games/AsciiReactionGame.js';
import shootingGame from './games/ShootingGame.js';
import duelGame from './games/DuelGame.js';
import bombGame from './games/BombGame.js';
import shellGame from './games/ShellGame.js';
import sequenceGame from './games/SequenceGame.js';
import dragonGame from './games/DragonGame.js';
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
			this.onMiniGameComplete.bind(this),
			this.player
		);
		this.miniGameScreen.registerMiniGame(timingGame, 'Parry');
		this.miniGameScreen.registerMiniGame(clickerGame, 'Frenzy');
		this.miniGameScreen.registerMiniGame(memoryGame, 'Rune Stones');
		this.miniGameScreen.registerMiniGame(asciiReactionGame, 'Spellcast');
		this.miniGameScreen.registerMiniGame(shootingGame, 'Dodge');
		this.miniGameScreen.registerMiniGame(duelGame, 'Duel of Blades');
		this.miniGameScreen.registerMiniGame(bombGame, 'Cut the Fuse');
		this.miniGameScreen.registerMiniGame(shellGame, 'Shell Game');
		this.miniGameScreen.registerMiniGame(sequenceGame, 'Arcane Sequence');
		this.miniGameScreen.registerMiniGame(dragonGame, 'Dragon\'s Breath');

		this.areasScreen = new AreasScreen(
			this.player,
			this.updatePlayerStats.bind(this)
		);
		this.inventoryScreen = new InventoryScreen(
			this.player,
			this.updatePlayerStats.bind(this)
		);
		this.shopScreen = new ShopScreen(
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
			this.player,
			this.updatePlayerStats.bind(this)
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
			case 'btnShop':
				this.showShopScreen();
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
			// btnCraft: crafting screen disabled until recipes are implemented
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
			case "btnSave":
				this.player.savePlayerData();
				break;
			case "btnLoad":
				if (this.player.loadPlayerData()) {
					this.updatePlayerStats();
				}
				break;
			case "btnReset":
				this.player.resetPlayerData();
				break;
			default:
				break;
		}
	}

	hideMiniGamePanel() {
		const panel = document.getElementById('combat-minigame-panel');
		const gameArea = document.getElementById('game-area');
		const log = document.getElementById('game-info-list');

		if (panel) panel.classList.add('hidden');
		if (gameArea) gameArea.innerHTML = '';
		if (log) log.classList.remove('hidden');
	}

	showGameInfoScreen() {
		this.hideMiniGamePanel();
		this.showScreen('game-info-screen');
	}

	onMiniGameComplete() {
		this.hideMiniGamePanel();
	}

	showMiniGameScreen(action) {
		this.showScreen('game-info-screen');

		const panel = document.getElementById('combat-minigame-panel');
		const log = document.getElementById('game-info-list');

		if (panel) panel.classList.remove('hidden');
		if (log) log.classList.add('hidden');

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

	showShopScreen() {
		this.showScreen("shop-screen");
		this.shopScreen.render();
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

	showImprovementsScreen() {
		this.showScreen("improvements-screen");
		this.improvementsScreen.render();
	}

	showScreen(screenId) {
		const screens = document.querySelectorAll("#main-screens > div");
		for (let i = 0; i < screens.length; i++) {
			const screen = screens[i];
			if (screen.id === screenId) {
				screen.classList.remove('hidden');
			} else {
				screen.classList.add('hidden');
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

	checkLevelUp() {
		const newLevel = this.player.checkLevelUp(gameConfig.levelUpRequirements);
		if (newLevel !== null) {
			updateGameNotice(`Congratulations! You leveled up to level ${newLevel}.`);
			updateGameNotice(`Go to stats screen to upgrade your stats!`);
			this.updatePlayerStats();
		}
	}

	regenerateHP() {
		if (this.player.currentHP < this.player.maxHP) {
			this.player.regenerate();
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