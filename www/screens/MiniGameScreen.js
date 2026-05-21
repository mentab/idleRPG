// MiniGameScreen.js

import { updateGameNotice } from '../modules/MessageModule.js';
import { createCombatModifier, describeCombatModifier } from '../modules/MiniGameBonusModule.js';

class MiniGameScreen {
	constructor(showNextScreen) {
		this.miniGames = [];
		this.showNextScreen = showNextScreen;
	}

	registerMiniGame(miniGameFunction, label = 'Mini-game') {
		this.miniGames.push({ play: miniGameFunction, label });
	}

	render(action) {
		if (this.miniGames.length === 0) {
			updateGameNotice('No mini-game — fighting without a modifier.');
			this.finishMiniGame(50, action);
			return;
		}

		updateGameNotice('Mini-game before combat — high score = buff, low score = debuff.');

		const randomIndex = Math.floor(Math.random() * this.miniGames.length);
		const { play, label } = this.miniGames[randomIndex];
		const labelEl = document.getElementById('minigame-label');
		if (labelEl) {
			labelEl.textContent = label;
		}

		play((rawResult) => this.finishMiniGame(rawResult, action));
	}

	finishMiniGame(rawResult, action) {
		const modifier = createCombatModifier(rawResult);
		updateGameNotice(describeCombatModifier(modifier));
		action(modifier ?? null);
		this.showNextScreen();
	}
}

export default MiniGameScreen;