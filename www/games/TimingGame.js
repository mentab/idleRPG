// "Parry the Strike" — tap the parry button the moment the knight attacks.

function timingGame(resultCallback) {
	const gameArea = document.getElementById('game-area');
	gameArea.innerHTML = '';

	const IDLE   = `   ⚔️\n  (O)\n  /|\\\n  / \\`;
	const RAISE  = `      ⚔️\n  (O)/\n  /|\\\n  / \\`;
	const STRIKE = `\n  (O)\n  /|—⚔️\n  / \\`;

	const pre = document.createElement('pre');
	pre.style.textAlign = 'center';
	pre.style.lineHeight = '1.5';
	pre.textContent = IDLE;

	const caption = document.createElement('p');
	caption.textContent = 'A knight in black armor sizes you up...';

	const btn = document.createElement('button');
	btn.textContent = '🛡️ Parry!';

	gameArea.appendChild(pre);
	gameArea.appendChild(caption);
	gameArea.appendChild(btn);

	let finished = false;
	let attackStarted = false;
	let attackTime = null;
	const delay = 1500 + Math.random() * 2500;

	setTimeout(() => {
		if (finished) return;
		pre.textContent = RAISE;
		caption.textContent = '⚠️ He draws his arm back...';
	}, delay * 0.55);

	setTimeout(() => {
		if (finished) return;
		pre.textContent = STRIKE;
		caption.textContent = '💥 INCOMING STRIKE — PARRY NOW!';
		attackStarted = true;
		attackTime = Date.now();
	}, delay);

	btn.addEventListener('click', () => {
		if (finished) return;
		finished = true;
		if (!attackStarted) {
			pre.textContent = IDLE;
			caption.textContent = '😓 Too early — you left yourself open!';
			setTimeout(() => resultCallback(10), 700);
			return;
		}
		const reaction = Date.now() - attackTime;
		const score = Math.max(5, Math.min(100, Math.round(100 - reaction / 10)));
		caption.textContent = reaction < 300
			? `✨ Perfect parry! (${reaction}ms)`
			: `🛡️ Parried in time! (${reaction}ms)`;
		setTimeout(() => resultCallback(score), 700);
	});

	setTimeout(() => {
		if (finished) return;
		finished = true;
		caption.textContent = '💀 Too slow — the blow lands hard!';
		setTimeout(() => resultCallback(5), 700);
	}, delay + 1500);
}

export default timingGame;
