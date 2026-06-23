// "Goblin Raid" — a goblin leaps from one of three bushes; strike it before it vanishes! 5 rounds.

import { initGameArea, createPre, createCaption, createSub, createBtnRow, createBtn } from './gameUtils.js';

function shellGame(resultCallback) {
	const gameArea = initGameArea();

	const ROUNDS = 5;
	let round    = 0;
	let score    = 0;

	const pre     = createPre();
	const caption = createCaption('Goblins lurk in the bushes...');
	const sub     = createSub();
	const btnRow  = createBtnRow();

	const BUSH   = [' ,^, ', '(   )', ' \\~/ '];
	const GOBLIN = [' /|\\ ', '(>_<)', ' \\~/ '];

	const btns = ['⬅️ Left', '⬆️ Center', '➡️ Right'].map(label => {
		const btn = createBtn(label);
		btnRow.appendChild(btn);
		return btn;
	});

	gameArea.append(pre, caption, sub, btnRow);

	function renderBushes(goblinAt = -1) {
		const parts = [0, 1, 2].map(i => i === goblinAt ? GOBLIN : BUSH);
		pre.textContent = [0, 1, 2].map(row => parts.map(p => p[row]).join('   ')).join('\n');
	}

	function runRound() {
		round++;
		const spot      = Math.floor(Math.random() * 3);
		const hitWindow = Math.max(700, 1500 - (round - 1) * 150);
		let roundDone   = false;

		caption.textContent = `Round ${round}/${ROUNDS} — watch the bushes!`;
		sub.textContent     = '';
		renderBushes(-1);

		setTimeout(() => {
			if (roundDone) return;
			renderBushes(spot);
			sub.textContent = '⚡ Strike!';

			const attackTimeout = setTimeout(() => {
				if (roundDone) return;
				roundDone = true;
				btns.forEach(b => b.onclick = null);
				renderBushes(-1);
				sub.textContent = `⏱️ Too slow! The goblin fled. (${score}/${round})`;
				setTimeout(nextRound, 1000);
			}, hitWindow);

			btns.forEach((btn, i) => {
				btn.onclick = () => {
					if (roundDone) return;
					roundDone = true;
					clearTimeout(attackTimeout);
					btns.forEach(b => b.onclick = null);
					if (i === spot) {
						score++;
						pre.textContent = ' \\O/\n  |\n / \\';
						sub.textContent = `✅ Slain! (${score}/${round})`;
					} else {
						renderBushes(-1);
						sub.textContent = `❌ Wrong bush! (${score}/${round})`;
					}
					setTimeout(nextRound, 900);
				};
			});
		}, 400 + Math.random() * 500);
	}

	function nextRound() {
		if (round >= ROUNDS) {
			pre.textContent     = score >= 4 ? ' \\O/\n  |\n / \\' : score >= 2 ? '  O \n /|\\\n / \\' : ' x_x\n  |\n / \\';
			caption.textContent = `Raid repelled — ${score}/${ROUNDS} goblins slain!`;
			sub.textContent     = '';
			resultCallback(Math.round((score / ROUNDS) * 100));
		} else {
			runRound();
		}
	}

	renderBushes(-1);
	setTimeout(runRound, 700);
}

export default shellGame;
