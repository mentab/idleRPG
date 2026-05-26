// "Arcane Sequence" — watch 4 rune symbols appear in order, then replicate the sequence.

function sequenceGame(resultCallback) {
	const gameArea = document.getElementById('game-area');
	gameArea.innerHTML = '';

	const SYMBOLS  = ['⚔️', '🛡️', '🔥', '⚡'];
	const sequence = [...SYMBOLS].sort(() => Math.random() - 0.5);
	let showIdx    = 0;
	let recallIdx  = 0;
	let correct    = 0;
	let phase      = 'show';

	const pre = document.createElement('pre');
	pre.style.textAlign  = 'center';
	pre.style.fontSize   = '2.2em';
	pre.style.lineHeight = '1.4';

	const caption = document.createElement('p');
	caption.textContent = 'Watch the sequence...';

	const progress = document.createElement('p');
	progress.style.letterSpacing = '6px';
	progress.style.textAlign     = 'center';

	const btnRow = document.createElement('div');
	btnRow.style.display        = 'flex';
	btnRow.style.gap            = '12px';
	btnRow.style.justifyContent = 'center';
	btnRow.style.flexWrap       = 'wrap';
	btnRow.style.margin         = '8px 0';

	gameArea.appendChild(pre);
	gameArea.appendChild(caption);
	gameArea.appendChild(progress);
	gameArea.appendChild(btnRow);

	const updateProgress = () => {
		progress.textContent = sequence.map((_, i) => i < recallIdx ? '●' : '○').join(' ');
	};

	// Phase 1 — show each symbol with a blank flash between each
	function showNext() {
		if (showIdx >= sequence.length) {
			pre.textContent = '?';
			caption.textContent = 'Now repeat the sequence!';
			phase = 'recall';
			buildButtons();
			return;
		}
		pre.textContent = '';
		setTimeout(() => {
			pre.textContent     = sequence[showIdx];
			caption.textContent = `Symbol ${showIdx + 1} / ${sequence.length}`;
			showIdx++;
			setTimeout(showNext, 720);
		}, 130);
	}

	// Phase 2 — recall buttons
	function buildButtons() {
		btnRow.innerHTML = '';
		SYMBOLS.forEach(sym => {
			const btn         = document.createElement('button');
			btn.textContent   = sym;
			btn.style.fontSize = '1.5em';
			btn.style.padding  = '8px 16px';
			btn.addEventListener('click', () => handleRecall(sym));
			btnRow.appendChild(btn);
		});
	}

	function handleRecall(tapped) {
		if (phase !== 'recall') return;

		if (tapped === sequence[recallIdx]) {
			correct++;
			recallIdx++;
			updateProgress();
			pre.textContent = '✅';

			if (recallIdx >= sequence.length) {
				phase = 'done';
				caption.textContent = `Perfect sequence! ✨`;
				btnRow.innerHTML    = '';
				setTimeout(() => resultCallback(100), 700);
			} else {
				caption.textContent = `Correct! Keep going...`;
			}
		} else {
			phase = 'done';
			[...btnRow.children].forEach(b => b.disabled = true);
			pre.textContent     = '❌';
			caption.textContent = `Wrong! Expected ${sequence[recallIdx]}. Got ${correct}/${sequence.length}.`;
			setTimeout(() => resultCallback(Math.round((correct / sequence.length) * 100)), 700);
		}
	}

	updateProgress();
	setTimeout(showNext, 600);
}

export default sequenceGame;
