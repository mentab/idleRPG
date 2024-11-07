// MiniGameScreen.js

import { updateGameNotice } from '../modules/MessageModule.js';

class MiniGameScreen {
	constructor(showNextScreen) {
		this.miniGames = [];
		this.showNextScreen = showNextScreen;
	}

	registerMiniGame(miniGameFunction) {
		this.miniGames.push(miniGameFunction);
	}

	render(action) {
		// updateGameInfo("Starting Mini-game...");

		// const randomIndex = Math.floor(Math.random() * this.miniGames.length);
		// const selectedMiniGame = this.miniGames[randomIndex];
// 
		// selectedMiniGame(result => this.finishMiniGame(result, action));

		this.finishMiniGame(555, action)
	}

	finishMiniGame(result, action) {
		// updateGameNotice("Mini-game finished. Result:" + result);
		action(result);

		// Bonuses go from 1 to 3 :
		// Increase the player's stat X by Y% for the next Y turn 
		// Increase the player's stat X by 2Y% for the next 2Y turns
		// Increase the player's stat X by 3Y% for the next 3Y turns

		// Regeneration
		// Counterattack
		// Invicibility
		// Combo ?
		// Revival

		this.showNextScreen();
	}
}

export default MiniGameScreen;