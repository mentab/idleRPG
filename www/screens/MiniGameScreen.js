// MiniGameScreen.js

import { updateGameNotice } from '../modules/MessageModule.js';
import { createCombatModifier, describeCombatModifier } from '../modules/MiniGameBonusModule.js';

class MiniGameScreen {
	constructor(showNextScreen, player = null) {
		this.miniGames = [];
		this.showNextScreen = showNextScreen;
		this.player = player;
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
		let playerStats = null;
		if (this.player) {
			playerStats = {
				damage:    this.player.damage    + this.player.calculateEquippedDamage(),
				precision: this.player.precision + this.player.calculateEquippedPrecision(),
				defense:   this.player.defense   + this.player.calculateEquippedDefense(),
				evasion:   this.player.evasion   + this.player.calculateEquippedEvasion(),
			};
		}
		const modifier = createCombatModifier(rawResult, playerStats);
		updateGameNotice(describeCombatModifier(modifier));
		action(modifier ?? null);
		this.showNextScreen();
	}
}

export default MiniGameScreen;