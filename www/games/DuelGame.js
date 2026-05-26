// "Duel of Blades" — read the enemy's telegraph and block the right zone. 5 rounds.

function duelGame(resultCallback) {
	const gameArea = document.getElementById('game-area');
	gameArea.innerHTML = '';

	const ROUNDS = 5;
	let round = 0;
	let score = 0;

	const ENEMY_IDLE = ` ⚔️ \n(O) \n/|\\ \n/ \\ `;
	const ENEMY_HIGH = `⚔️  \n(O) \n |  \n/ \\ `;
	const ENEMY_LOW  = `    \n(O) \n/|  \n⚔️\\ `;

	const pre = document.createElement('pre');
	pre.style.textAlign = 'center';
	pre.style.lineHeight = '1.5';
	pre.textContent = ENEMY_IDLE;

	const caption = document.createElement('p');
	caption.textContent = 'Read the stance — block before it\'s too late!';

	const btnRow = document.createElement('div');
	btnRow.style.display = 'flex';
	btnRow.style.gap = '16px';
	btnRow.style.justifyContent = 'center';
	btnRow.style.margin = '8px 0';

	const btnHigh = document.createElement('button');
	btnHigh.textContent = '🛡️ Block High';

	const btnLow = document.createElement('button');
	btnLow.textContent = '🛡️ Block Low';

	btnRow.appendChild(btnHigh);
	btnRow.appendChild(btnLow);
	gameArea.appendChild(pre);
	gameArea.appendChild(caption);
	gameArea.appendChild(btnRow);

	const setButtons = (enabled) => {
		btnHigh.disabled = !enabled;
		btnLow.disabled = !enabled;
	};
	setButtons(false);

	function runRound() {
		if (round >= ROUNDS) {
			pre.textContent = score >= 4 ? '🌟' : score >= 2 ? '⚔️' : '💀';
			caption.textContent = `Duel over — ${score}/${ROUNDS} blocks!`;
			resultCallback(Math.round((score / ROUNDS) * 100));
			return;
		}

		round++;
		const isHigh = Math.random() < 0.5;

		pre.textContent = isHigh ? ENEMY_HIGH : ENEMY_LOW;
		caption.textContent = `Round ${round}/${ROUNDS} — ${isHigh ? '⬆️ High stance!' : '⬇️ Low stance!'}`;

		let roundDone = false;

		const resolve = (blockedHigh) => {
			if (roundDone) return;
			roundDone = true;
			clearTimeout(timeout);
			setButtons(false);
			btnHigh.removeEventListener('click', onHigh);
			btnLow.removeEventListener('click', onLow);

			const correct = isHigh === blockedHigh;
			if (correct) {
				score++;
				pre.textContent = '✨';
				caption.textContent = `✅ Perfect block! (${score}/${round})`;
			} else {
				pre.textContent = '💥';
				caption.textContent = `❌ Wrong block! (${score}/${round})`;
			}
			setTimeout(runRound, 900);
		};

		const timeout = setTimeout(() => {
			if (roundDone) return;
			roundDone = true;
			setButtons(false);
			btnHigh.removeEventListener('click', onHigh);
			btnLow.removeEventListener('click', onLow);
			pre.textContent = '💀';
			caption.textContent = `Too slow! (${score}/${round})`;
			setTimeout(runRound, 900);
		}, 1300);

		const onHigh = () => resolve(true);
		const onLow  = () => resolve(false);

		setTimeout(() => {
			if (roundDone) return;
			setButtons(true);
			btnHigh.addEventListener('click', onHigh);
			btnLow.addEventListener('click', onLow);
		}, 350);
	}

	setTimeout(runRound, 1000);
}

export default duelGame;
