// "Dodge!" — arrows fly from left or right; tap the opposite direction to dodge.

function shootingGame(resultCallback) {
	const gameArea = document.getElementById('game-area');
	gameArea.innerHTML = '';

	const ROUNDS = 5;
	let round = 0;
	let score = 0;

	const pre = document.createElement('pre');
	pre.style.textAlign = 'center';
	pre.style.lineHeight = '1.5';

	const caption = document.createElement('p');
	caption.textContent = 'Arrows will fly at you — dodge in the opposite direction!';

	const btnRow = document.createElement('div');
	btnRow.style.display = 'flex';
	btnRow.style.gap = '16px';
	btnRow.style.justifyContent = 'center';
	btnRow.style.margin = '8px 0';

	const btnLeft = document.createElement('button');
	btnLeft.textContent = '⬅️ Dodge Left';

	const btnRight = document.createElement('button');
	btnRight.textContent = 'Dodge Right ➡️';

	btnRow.appendChild(btnLeft);
	btnRow.appendChild(btnRight);
	gameArea.appendChild(pre);
	gameArea.appendChild(caption);
	gameArea.appendChild(btnRow);

	const setButtons = (enabled) => {
		btnLeft.disabled = !enabled;
		btnRight.disabled = !enabled;
	};
	setButtons(false);

	pre.textContent = '🏹';

	function runRound() {
		if (round >= ROUNDS) {
			pre.textContent = score === ROUNDS ? '🌟' : score >= 3 ? '✅' : '💀';
			caption.textContent = `Combat sequence over — ${score}/${ROUNDS} dodged!`;
			resultCallback(Math.round((score / ROUNDS) * 100));
			return;
		}

		round++;
		const fromLeft = Math.random() < 0.5;

		pre.textContent = fromLeft
			? '→→→→→→→\n→→→→→→→\n→→→→→→→'
			: '←←←←←←←\n←←←←←←←\n←←←←←←←';
		caption.textContent = `Round ${round}/${ROUNDS} — incoming!`;

		let roundDone = false;

		const resolve = (dodgedRight) => {
			if (roundDone) return;
			roundDone = true;
			clearTimeout(timeout);
			setButtons(false);
			btnLeft.removeEventListener('click', onLeft);
			btnRight.removeEventListener('click', onRight);

			const correct = fromLeft ? dodgedRight : !dodgedRight;
			if (correct) {
				score++;
				pre.textContent = fromLeft ? '   →→ 🏃' : '🏃 ←←   ';
				caption.textContent = `✅ Dodged! (${score}/${round})`;
			} else {
				pre.textContent = '💥';
				caption.textContent = `❌ Wrong way — hit! (${score}/${round})`;
			}
			setTimeout(runRound, 1000);
		};

		const timeout = setTimeout(() => {
			if (roundDone) return;
			roundDone = true;
			setButtons(false);
			btnLeft.removeEventListener('click', onLeft);
			btnRight.removeEventListener('click', onRight);
			pre.textContent = '💀';
			caption.textContent = `Too slow! (${score}/${round})`;
			setTimeout(runRound, 1000);
		}, 1500);

		const onLeft = () => resolve(false);
		const onRight = () => resolve(true);

		setTimeout(() => {
			if (roundDone) return;
			setButtons(true);
			btnLeft.addEventListener('click', onLeft);
			btnRight.addEventListener('click', onRight);
			caption.textContent = fromLeft
				? '→ Arrow from the LEFT — dodge RIGHT!'
				: '← Arrow from the RIGHT — dodge LEFT!';
		}, 600);
	}

	setTimeout(runRound, 1200);
}

export default shootingGame;
