// "Shell Game" — track the skull through the shuffles and tap the right cup. 3 rounds.

function shellGame(resultCallback) {
	const gameArea = document.getElementById('game-area');
	gameArea.innerHTML = '';

	const ROUNDS = 3;
	const SWAPS  = 4;
	let round    = 0;
	let score    = 0;

	const caption    = document.createElement('p');
	const subCaption = document.createElement('p');
	const cupRow     = document.createElement('div');
	cupRow.style.display        = 'flex';
	cupRow.style.gap            = '12px';
	cupRow.style.justifyContent = 'center';
	cupRow.style.margin         = '8px 0';

	gameArea.appendChild(caption);
	gameArea.appendChild(subCaption);
	gameArea.appendChild(cupRow);

	const delay = (ms) => new Promise(res => setTimeout(res, ms));

	function renderCups(cups, reveal) {
		cupRow.innerHTML = '';
		cups.forEach((c) => {
			const btn         = document.createElement('button');
			btn.textContent   = reveal ? c : '🏆';
			btn.style.fontSize = '1.6em';
			btn.style.padding  = '8px 16px';
			btn.disabled       = true;
			cupRow.appendChild(btn);
		});
	}

	function enablePick(cups, onPick) {
		cupRow.innerHTML = '';
		cups.forEach((c, i) => {
			const btn         = document.createElement('button');
			btn.textContent   = '🏆';
			btn.style.fontSize = '1.6em';
			btn.style.padding  = '8px 16px';
			btn.addEventListener('click', () => onPick(i, cups));
			cupRow.appendChild(btn);
		});
	}

	async function runRound() {
		round++;
		caption.textContent    = `Round ${round}/${ROUNDS} — watch the skull!`;
		subCaption.textContent = '';

		const cups    = ['🏆', '🏆', '🏆'];
		const skulIdx = Math.floor(Math.random() * 3);
		cups[skulIdx] = '💀';

		// Reveal
		renderCups(cups, true);
		await delay(1200);

		// Hide
		renderCups(cups, false);
		subCaption.textContent = 'Shuffling...';
		await delay(400);

		// Shuffle with animation
		for (let s = 0; s < SWAPS; s++) {
			const a = Math.floor(Math.random() * 3);
			const b = (a + 1 + Math.floor(Math.random() * 2)) % 3;
			[cups[a], cups[b]] = [cups[b], cups[a]];
			renderCups(cups, false);
			subCaption.textContent = `Swap ${s + 1}/${SWAPS}...`;
			await delay(380);
		}

		// Ask
		subCaption.textContent = 'Which cup hides the 💀?';
		enablePick(cups, (picked, cups) => {
			[...cupRow.children].forEach((b, i) => {
				b.disabled     = true;
				b.textContent  = cups[i];
			});

			if (cups[picked] === '💀') {
				score++;
				caption.textContent = `✅ Found it! (${score}/${round})`;
			} else {
				caption.textContent = `❌ Wrong cup! (${score}/${round})`;
			}

			setTimeout(() => {
				if (round >= ROUNDS) {
					subCaption.textContent = '';
					caption.textContent    = `Game over — ${score}/${ROUNDS} found!`;
					resultCallback(Math.round((score / ROUNDS) * 100));
				} else {
					runRound();
				}
			}, 1100);
		});
	}

	caption.textContent = 'Get ready...';
	renderCups(['🏆', '🏆', '🏆'], false);
	setTimeout(() => runRound(), 700);
}

export default shellGame;
