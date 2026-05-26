// "Duel of Blades" — read the enemy's ASCII stance and block the correct zone. 5 rounds.

import { initGameArea, createPre, createCaption, createSub, createBtnRow, createBtn } from './gameUtils.js';

function duelGame(resultCallback) {
	const gameArea = initGameArea();

	const ROUNDS = 5;
	let round    = 0;
	let score    = 0;

	const ENEMY_IDLE = `-|- \n(O) \n/|\\ \n/ \\ `;
	const ENEMY_HIGH = `=== \n(O) \n |  \n/ \\ `;
	const ENEMY_MID  = `    \n(O) \n-|--\n/ \\ `;
	const ENEMY_LOW  = `    \n(O) \n/|  \n--\\ `;

	const pre     = createPre();
	const caption = createCaption('Read the stance — block the incoming attack!');
	const sub     = createSub();
	const btnRow  = createBtnRow();
	const btnHigh = createBtn('🛡️ Block High');
	const btnMid  = createBtn('🛡️ Block Mid');
	const btnLow  = createBtn('🛡️ Block Low');

	pre.textContent = ENEMY_IDLE;
	btnRow.append(btnHigh, btnMid, btnLow);
	gameArea.append(pre, caption, sub, btnRow);

	function runRound() {
		if (round >= ROUNDS) {
			pre.textContent     = score >= 4 ? ' \\O/\n  |\n / \\\n    ' : score >= 2 ? '  O \n /|\\\n / \\\n    ' : ' x_x\n  |\n / \\\n    ';
			caption.textContent = `Duel over — ${score}/${ROUNDS} blocks!`;
			sub.textContent     = '';
			resultCallback(Math.round((score / ROUNDS) * 100));
			return;
		}

		round++;
		const attack = Math.floor(Math.random() * 3); // 0=high, 1=mid, 2=low

		pre.textContent     = attack === 0 ? ENEMY_HIGH : attack === 1 ? ENEMY_MID : ENEMY_LOW;
		caption.textContent = `Round ${round}/${ROUNDS} — read the stance!`;

		let roundDone = false;

		const resolve = (blocked) => {
			if (roundDone) return;
			roundDone = true;
			clearTimeout(timeout);
			btnHigh.removeEventListener('click', onHigh);
			btnMid.removeEventListener('click', onMid);
			btnLow.removeEventListener('click', onLow);

			const correct = blocked === attack;
			if (correct) {
				score++;
				pre.textContent = ' \\O/\n  |\n / \\\n    ';
				sub.textContent = `✅ Perfect block! (${score}/${round})`;
			} else {
				pre.textContent = ' x_x\n  |\n / \\\n    ';
				sub.textContent = `❌ Wrong block! (${score}/${round})`;
			}
			setTimeout(runRound, 900);
		};

		const timeout = setTimeout(() => {
			if (roundDone) return;
			roundDone = true;
			btnHigh.removeEventListener('click', onHigh);
			btnMid.removeEventListener('click', onMid);
			btnLow.removeEventListener('click', onLow);
			pre.textContent = ' z_z\n  |\n / \\\n    ';
			sub.textContent = `⏱️ Too slow! (${score}/${round})`;
			setTimeout(runRound, 900);
		}, 2500);

		const onHigh = () => resolve(0);
		const onMid  = () => resolve(1);
		const onLow  = () => resolve(2);
		btnHigh.addEventListener('click', onHigh);
		btnMid.addEventListener('click', onMid);
		btnLow.addEventListener('click', onLow);
	}

	setTimeout(runRound, 1000);
}

export default duelGame;
