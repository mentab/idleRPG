// main.js

import ChooseScreen from './screens/ChooseScreen.js';
import AreasScreen from './screens/AreasScreen.js';
import InventoryScreen from './screens/InventoryScreen.js';
import ShopScreen from './screens/ShopScreen.js';
import StatsScreen from './screens/StatsScreen.js';
import SpellsScreen from './screens/SpellsScreen.js';
import EquippedScreen from './screens/EquippedScreen.js';
import GatherScreen from './screens/GatherScreen.js';
import CraftScreen from './screens/CraftScreen.js';
import MiniGameScreen from './screens/MiniGameScreen.js';
import AchievementsScreen from './screens/AchievementsScreen.js';
import ImprovementsScreen from './screens/ImprovementsScreen.js';
import RelicsScreen from './screens/RelicsScreen.js';
import QuestScreen from './screens/QuestScreen.js';
import gameConfig from './config/gameConfig.js';
import BattleModule from './modules/BattleModule.js';
import { healForMoney } from './modules/HealModule.js';
import { gambleMoney } from './modules/GambleModule.js';
import { Player } from './models/PlayerModel.js';
import { StreakModule } from './modules/StreakModule.js';
import { QuestModule } from './modules/QuestModule.js';
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
import AscendScreen from './screens/AscendScreen.js';
import { DebugPanel } from './modules/DebugPanel.js';

class Game {
	constructor() {
		this.hpDelay = 2000;
		this.player = new Player();
		this.streakModule = new StreakModule();
		this.questModule = new QuestModule(this.player);
		this.battleModule = new BattleModule(
			this.player,
			this.updatePlayerStats.bind(this),
			this.checkLevelUp.bind(this),
			this.streakModule,
			this.questModule
		);
		this.inBattle = false;
		this.battleModule.onBattleEnd = () => { this.inBattle = false; };
		this.chooseScreen = new ChooseScreen(
			this.handleScreenButtonClick.bind(this)
		);
		this.miniGameScreen = new MiniGameScreen(
			this.onMiniGameComplete.bind(this),
			this.player,
			this.streakModule,
			this.questModule
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
			this.updatePlayerStats.bind(this),
			this.questModule
		);
		this.statsScreen = new StatsScreen(
			this.player,
			this.updatePlayerStats.bind(this)
		);
		this.spellsScreen = new SpellsScreen(
			this.player,
			this.updatePlayerStats.bind(this)
		);
		this.equippedScreen = new EquippedScreen(
			this.player,
			this.updatePlayerStats.bind(this)
		);
		this.gatherScreen = new GatherScreen(
			this.player,
			this.updatePlayerStats.bind(this),
			this.questModule
		);
		this.craftScreen = new CraftScreen(
			this.player,
			this.updatePlayerStats.bind(this),
			this.questModule
		);
		this.achievementsScreen = new AchievementsScreen(
			this.player,
			this.updatePlayerStats.bind(this)
		);
		this.improvementsScreen = new ImprovementsScreen(
			this.player,
			this.updatePlayerStats.bind(this)
		);
		this.relicsScreen = new RelicsScreen(
			this.player,
			this.updatePlayerStats.bind(this)
		);
		this.questScreen = new QuestScreen(
			this.questModule,
			this.updatePlayerStats.bind(this)
		);
		this.ascendScreen = new AscendScreen(
			this.player,
			this.questModule,
			this.updatePlayerStats.bind(this),
			this.showGameInfoScreen.bind(this)
		);

		this.debugPanel = new DebugPanel({
			player: this.player,
			battleModule: this.battleModule,
			gatherScreen: this.gatherScreen,
			craftScreen: this.craftScreen,
			questModule: this.questModule,
			updatePlayerStats: this.updatePlayerStats.bind(this),
			checkLevelUp: this.checkLevelUp.bind(this),
		});

		this.showGameInfoScreen();
	}

	handleScreenButtonClick(buttonId) {
		const lockedDuringBattle = ['btnExploration','btnChallenge','btnMission','btnDuel',
			'btnAreas','btnInventory','btnShop','btnStats','btnSpells','btnEquipped',
			'btnAchievements','btnGather','btnCraft','btnImprove','btnRelics','btnContracts','btnAscend','btnGamble','btnHeal'];
		if (this.inBattle && lockedDuringBattle.includes(buttonId)) {
			updateGameNotice('Finish the current battle first!');
			return;
		}

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
			case 'btnCraft':
				this.showCraftScreen();
				break;
			case 'btnImprove':
				this.showImprovementsScreen();
				break;
			case 'btnRelics':
				this.showRelicsScreen();
				break;
			case 'btnContracts':
				this.showQuestScreen();
				break;
			case 'btnAscend':
				this.showAscendScreen();
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

		this.inBattle = true;
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

	showCraftScreen() {
		this.showScreen("crafting-screen");
		this.craftScreen.render();
	}

	showImprovementsScreen() {
		this.showScreen("improvements-screen");
		this.improvementsScreen.render();
	}

	showRelicsScreen() {
		this.showScreen("relics-screen");
		this.relicsScreen.render();
	}

	showQuestScreen() {
		this.showScreen("quest-screen");
		this.questScreen.render();
	}

	showAscendScreen() {
		this.showScreen('ascend-screen');
		this.ascendScreen.render();
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

		const prestigeEl = document.getElementById("playerPrestige");
		if (prestigeEl) {
			prestigeEl.textContent = this.player.prestigeLevel > 0 ? `✨ Prestige ${this.player.prestigeLevel}` : '';
		}

		const ascendBtn = document.getElementById("btnAscend");
		if (ascendBtn) {
			ascendBtn.disabled = this.player.level < gameConfig.prestigeMinLevel;
			ascendBtn.title = this.player.level < gameConfig.prestigeMinLevel
				? `Reach level ${gameConfig.prestigeMinLevel} to Ascend`
				: `Ascend now! Earn ${Math.floor(this.player.level / 10)} prestige points`;
		}

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

		this.player.loadPlayerData();
		this.questModule.initDailyQuests(gameConfig.questPool);
		this.updatePlayerStats();
		this.chooseScreen.init();
		this.debugPanel.init();
		this.hpLoop();
	}
}

const game = new Game().init();