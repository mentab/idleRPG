
import MainScreen from './MainScreen.js';
import AreasScreen from './AreasScreen.js';
import InventoryScreen from './InventoryScreen.js';
import BuyScreen from './BuyScreen.js';
import SellScreen from './SellScreen.js';
import StatsScreen from './StatsScreen.js';
import EquippedScreen from './EquippedScreen.js';
import GatherScreen from './GatherScreen.js';
import CraftingScreen from './CraftingScreen.js';

class Game {
	constructor() {
		this.gameContainer = document.getElementById('game-container');
		this.gameInfoContainer = document.getElementById('game-info');
		this.currentArea = ''; // Store the current area
		this.playerStats = {
		  level: 1,
		  currentHP: 100,
		  maxHP: 100,
		  regeneration: 5,
		  experience: 0,
		  money: 0,
		  // Add other player stats as needed
		};

		// Create instances of each screen
		this.mainScreen = new MainScreen(
			this.gameContainer,
			this.handleScreenButtonClick.bind(this)
		);
		this.areasScreen = new AreasScreen(
			this.gameContainer,
			areas,
			player,
			this.updateGameInfo.bind(this),
			this.updatePlayerStats.bind(this)
		);
		this.inventoryScreen = new InventoryScreen(
			this.gameContainer,
			player,
			statNames,
			this.updateGameInfo.bind(this),
			this.updatePlayerStats.bind(this)
		);
		this.buyScreen = new BuyScreen(
			this.gameContainer,
			player,
			itemsList,
			this.updateGameInfo.bind(this),
			this.updatePlayerStats.bind(this)
		);
		this.sellScreen = new SellScreen(
			this.gameContainer,
			player,
			this.updateGameInfo.bind(this),
			this.updatePlayerStats.bind(this)
		);
		this.statsScreen = new StatsScreen(
			this.gameContainer,
			player,
			this.calculateEquippedStats.bind(this),
			this.getNextLevelExperience.bind(this),
			this.calculateEquippedBonus.bind(this)
		);
		this.equippedScreen = new EquippedScreen(
			this.gameContainer,
			player
		);
		this.gatherScreen = new GatherScreen(this.gameContainer);
		this.craftingScreen = new CraftingScreen(
			this.gameContainer,
			player,
			recipes,
			this.updateGameInfo.bind(this),
			this.updatePlayerStats.bind(this)
		);
	
		// Start the game with the main screen
		this.showMainScreen();
	}

	handleScreenButtonClick(buttonId) {
		switch (buttonId) {
			case 'btnExploration':
				this.startExploration();
				break;
			case 'btnChallenge':
				this.startChallenge();
				break;
			case 'btnMission':
				this.startMission();
				break;
			case 'btnDuel':
				this.startDuel();
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
			case 'btnGather':
				this.showGatherScreen();
				break;
			case 'btnCraft':
				this.showCraftingScreen();
				break;
			case "btnGamble":
				this.gambleMoney();
				break;
			case "btnHeal":
				this.healForMoney();
				break;
			case "btnExperience":
				player.experience += 5000;
				updateGameInfo("Adding 5000 experience...");
				checkLevelUp();
				break;
			case "btnMoney":
				player.money += 5000;
				updateGameInfo("Adding 5000 money...");
				updatePlayerStats();
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

	// Methods to show different screens
	showMainScreen() {
		this.hideAllScreens();
		this.mainScreen.render();
	}

	showAreasScreen() {
		this.hideAllScreens();
		this.areasScreen.render();
	}

	showInventoryScreen() {
		this.hideAllScreens();
		this.inventoryScreen.render();
	}

	showBuyScreen() {
		this.hideAllScreens();
		this.buyScreen.render();
	}

	showSellScreen() {
		this.hideAllScreens();
		this.sellScreen.render();
	}

	showStatsScreen() {
		this.hideAllScreens();
		this.statsScreen.render();
	}

	showEquippedScreen() {
		this.hideAllScreens();
		this.equippedScreen.render();
	}

	showGatherScreen() {
		this.hideAllScreens();
		this.gatherScreen.render();
	}

	showCraftingScreen() {
		this.hideAllScreens();
		this.craftingScreen.render();
	}

	// Add other show methods for additional screens

	hideAllScreens() {
		const allScreens = document.querySelectorAll('.screen');
		allScreens.forEach((screen) => {
			screen.classList.add('hidden');
		});
	}

	updateGameInfo(message) {
		const gameInfoElement = document.getElementById("game-info");
		const messageElement = document.createElement("div");
		messageElement.innerHTML = message;
		messageElement.classList.add("game-message"); // Apply a CSS class for styling
		gameInfoElement.insertBefore(messageElement, gameInfoElement.firstChild);
	}

	gambleMoney() {
		const gamblingCost = 10;
		if (gamblingCost <= player.money) {
			const symbols = ["🗡️", "🛡️", "🔮", "👑"];
			const spinResult = [];

			for (let i = 0; i < 3; i++) {
				const randomIndex = Math.floor(Math.random() * symbols.length);
				spinResult.push(symbols[randomIndex]);
			}

			updateGameInfo("Spinning the slot machine...");
			updateGameInfo("Result: " + spinResult.join(" "));

			if (spinResult[0] === spinResult[1] && spinResult[1] === spinResult[2]) {
				const winnings = gamblingCost * 3;
				player.money += winnings;
				updateGameInfo("Congratulations! You won " + winnings + " money!");
			} else {
				player.money -= gamblingCost;
				updateGameInfo("Oh no! You lost " + gamblingCost + " money.");
			}

			updateGameInfo("Your current balance is: " + player.money + " money.");
			updatePlayerStats();
		} else {
			updateGameInfo("Not enough money to gamble.");
		}
	}

	healForMoney() {
		if (player.currentHP === player.maxHP) {
			updateGameInfo("Your HP is already full!");
			return;
		}

		const healingCost = 10;
		if (player.money >= healingCost) {
			player.money -= healingCost;
			player.currentHP += 10; // Assuming each healing costs 10 money and heals 10 HP
			if (player.currentHP > player.maxHP) {
				player.currentHP = player.maxHP;
			}
			updateGameInfo("You've been healed!");
			updatePlayerStats();
		} else {
			updateGameInfo("You don't have enough money to heal!");
		}
	}

	getItemValue(item) {
		const { type, stat, level } = item;

		if (type === "stat") {
			switch (stat) {
				case "defense":
				case "damage":
					return level * 20;
				case "precision":
				case "evasion":
					return level * 10;
				case "critical":
				case "resistance":
					return level * 5;
				case "bonusExp":
				case "bonusLoot":
					return level * 50;
				case "regeneration":
					return level * 100;
				default:
					return 0;
			}
		} else if (type === "gathering") {
			return level * 2;
		} else {
			return 0;
		}
	}

	// Function to save player data to localStorage
	savePlayerData() {
		localStorage.setItem("playerData", JSON.stringify(player));
		alert("Player data saved!");
	}

	// Function to load player data from localStorage
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

	// Function to reset player data
	resetPlayerData() {
		localStorage.removeItem("playerData");
		location.reload();
	}
}

// Create an instance of the Game class to start the game
const game = new Game();