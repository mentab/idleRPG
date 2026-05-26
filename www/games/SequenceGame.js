// "Arcane Sequence" — watch 4 rune symbols appear in order, then replicate the sequence.

import { initGameArea, createPre, createCaption, createSub, createBtnRow, createBtn } from './gameUtils.js';

function sequenceGame(resultCallback) {
	const gameArea = initGameArea();

	const SYMBOLS  = ['⚔️', '🛡️', '🔥', '⚡'];
	const sequence = [...SYMBOLS].sort(() => Math.random() - 0.5);
	let showIdx    = 0;
	let recallIdx  = 0;
	let correct    = 0;
	let phase      = 'show';

	const pre     = createPre();
	const caption = createCaption('Watch the sequence...');
	const sub     = createSub();
	const btnRow  = createBtnRow();
	btnRow.style.minHeight = '60px';

	pre.style.fontSize = '2.2em';
	gameArea.append(pre, caption, sub, btnRow);

	const updateProgress = () => {
		sub.textContent = sequence.map((_, i) => i < recallIdx ? '●' : '○').join('  ');
	};
	updateProgress();

	function showNext() {
		if (showIdx >= sequence.length) {
			pre.textContent     = '?';
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

	function buildButtons() {
		btnRow.innerHTML = '';
		SYMBOLS.forEach(sym => {
			const btn = createBtn(sym, () => handleRecall(sym));
			btn.style.fontSize = '1.5em';
			btnRow.appendChild(btn);
		});
	}

	function handleRecall(tapped) {
		if (phase !== 'recall') return;

		if (tapped === sequence[recallIdx]) {
			correct++;
			recallIdx++;
			updateProgress();
			pre.textContent = '(^o^)';

			if (recallIdx >= sequence.length) {
				phase               = 'done';
				caption.textContent = 'Perfect sequence! ✨';
				btnRow.innerHTML    = '';
				setTimeout(() => resultCallback(100), 700);
			} else {
				caption.textContent = 'Correct! Keep going...';
			}
		} else {
			phase = 'done';
			[...btnRow.children].forEach(b => b.disabled = true);
			pre.textContent     = '(x_x)';
			caption.textContent = `Wrong! Expected ${sequence[recallIdx]}. Got ${correct}/${sequence.length}.`;
			setTimeout(() => resultCallback(Math.round((correct / sequence.length) * 100)), 700);
		}
	}

	setTimeout(showNext, 600);
}

export default sequenceGame;
