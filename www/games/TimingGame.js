// "Parry the Strike" — tap Parry the instant the knight swings.

import { initGameArea, createPre, createCaption, createSub, createBtnRow, createBtn } from './gameUtils.js';

function timingGame(resultCallback) {
	const gameArea = initGameArea();

	const IDLE   = `  -|-\n  (O)\n  /|\\\n  / \\`;
	const RAISE  = `   ==\n  (O)\n  /|\\\n  / \\`;
	const STRIKE = `  (O)\n  /|--\n  / \\\n     `;

	const pre     = createPre();
	const caption = createCaption('A knight in black armor sizes you up...');
	const sub     = createSub();
	const btnRow  = createBtnRow();
	const btn     = createBtn('🛡️ Parry!');

	pre.textContent = IDLE;
	btnRow.appendChild(btn);
	gameArea.append(pre, caption, sub, btnRow);

	let finished      = false;
	let attackStarted = false;
	let attackTime    = null;
	const attackDelay = 1500 + Math.random() * 2500;
	const hasFeint    = Math.random() < 0.3;

	if (hasFeint) {
		setTimeout(() => {
			if (finished) return;
			pre.textContent     = RAISE;
			caption.textContent = '⚠️ He draws his arm back...';
		}, attackDelay * 0.32);

		setTimeout(() => {
			if (finished || attackStarted) return;
			pre.textContent     = IDLE;
			caption.textContent = '😏 A feint — he lowers his guard.';
		}, attackDelay * 0.52);

		setTimeout(() => {
			if (finished || attackStarted) return;
			pre.textContent     = RAISE;
			caption.textContent = '⚠️ Wait — he raises again!';
		}, attackDelay * 0.75);
	} else {
		setTimeout(() => {
			if (finished) return;
			pre.textContent     = RAISE;
			caption.textContent = '⚠️ He draws his arm back...';
		}, attackDelay * 0.55);
	}

	setTimeout(() => {
		if (finished) return;
		pre.textContent     = STRIKE;
		caption.textContent = '💥 INCOMING STRIKE — PARRY NOW!';
		attackStarted = true;
		attackTime    = Date.now();
	}, attackDelay);

	btn.addEventListener('click', () => {
		if (finished) return;
		finished = true;
		if (!attackStarted) {
			pre.textContent     = IDLE;
			caption.textContent = '😓 Too early — you left yourself open!';
			setTimeout(() => resultCallback(10), 700);
			return;
		}
		const reaction = Date.now() - attackTime;
		const score    = Math.max(5, Math.min(100, Math.round(100 - reaction / 15)));
		pre.textContent     = '  O \n [=]\n / \\\n    ';
		caption.textContent = reaction < 400 ? `✨ Perfect parry! (${reaction}ms)` : `🛡️ Parried! (${reaction}ms)`;
		sub.textContent     = `Score: ${score}`;
		setTimeout(() => resultCallback(score), 700);
	});

	setTimeout(() => {
		if (finished) return;
		finished = true;
		caption.textContent = '💀 Too slow — the blow lands hard!';
		setTimeout(() => resultCallback(5), 700);
	}, attackDelay + 2200);
}

export default timingGame;
