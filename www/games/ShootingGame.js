// "Goblin Volley" — orc archers loose from left or right; dodge the right way!

import { initGameArea, createPre, createCaption, createSub, createBtnRow, createBtn } from './gameUtils.js';

function shootingGame(resultCallback) {
	const gameArea = initGameArea();

	const ROUNDS = 5;
	let round    = 0;
	let score    = 0;

	const pre      = createPre();
	const caption  = createCaption('Orc archers take aim — dodge their volleys!');
	const sub      = createSub();
	const btnRow   = createBtnRow();
	const btnLeft  = createBtn('⬅️ Dodge Left');
	const btnRight = createBtn('Dodge Right ➡️');

	pre.textContent = ' \\o/\n  |>\n / \\';
	btnRow.append(btnLeft, btnRight);
	gameArea.append(pre, caption, sub, btnRow);

	function runRound() {
		if (round >= ROUNDS) {
			pre.textContent     = score === ROUNDS ? ' \\O/\n  |\n / \\' : score >= 3 ? '  O \n /|\\\n / \\' : ' x_x\n  |\n / \\';
			caption.textContent = `Skirmish over — ${score}/${ROUNDS} volleys dodged!`;
			sub.textContent     = '';
			resultCallback(Math.round((score / ROUNDS) * 100));
			return;
		}

		round++;
		const fromLeft  = Math.random() < 0.5;
		const ARROW     = fromLeft ? '------>' : '<------';
		const BAR_W     = 20;
		const stepMs    = Math.max(55, 105 - (round - 1) * 12);
		const timeoutMs = Math.max(1400, 2800 - (round - 1) * 350);
		let pos         = fromLeft ? -7 : BAR_W;
		let roundDone   = false;

		caption.textContent = `Round ${round}/${ROUNDS} — dodge the volley!`;
		sub.textContent     = round > 3 ? '⚡ Faster now!' : '';

		const anim = setInterval(() => {
			const bar = Array(BAR_W).fill(' ');
			for (let i = 0; i < 7; i++) {
				const x = pos + i;
				if (x >= 0 && x < BAR_W) bar[x] = ARROW[i];
			}
			const line = bar.join('');
			pre.textContent = line + '\n' + line + '\n' + line;
			pos += fromLeft ? 1 : -1;
		}, stepMs);

		const resolve = (dodgedRight) => {
			if (roundDone) return;
			roundDone = true;
			clearInterval(anim);
			clearTimeout(timeout);
			btnLeft.removeEventListener('click', onLeft);
			btnRight.removeEventListener('click', onRight);

			const correct = fromLeft ? !dodgedRight : dodgedRight;
			if (correct) {
				score++;
				pre.textContent = fromLeft ? 'O ←←\n |\n/ \\' : ' →→ O\n    |\n   / \\';
				sub.textContent = `✅ Dodged! (${score}/${round})`;
			} else {
				pre.textContent = ' x_x\n  |\n / \\';
				sub.textContent = `❌ Wrong way! (${score}/${round})`;
			}
			setTimeout(runRound, 900);
		};

		const timeout = setTimeout(() => {
			if (roundDone) return;
			roundDone = true;
			clearInterval(anim);
			btnLeft.removeEventListener('click', onLeft);
			btnRight.removeEventListener('click', onRight);
			pre.textContent = ' z_z\n  |\n / \\';
			sub.textContent = `⏱️ Too slow! (${score}/${round})`;
			setTimeout(runRound, 900);
		}, timeoutMs);

		const onLeft  = () => resolve(false);
		const onRight = () => resolve(true);
		btnLeft.addEventListener('click', onLeft);
		btnRight.addEventListener('click', onRight);
	}

	setTimeout(runRound, 1200);
}

export default shootingGame;
