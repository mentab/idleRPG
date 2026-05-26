// "Dragon's Breath" — raise your shield in the window as the dragon charges its fire.

function dragonGame(resultCallback) {
	const gameArea = document.getElementById('game-area');
	gameArea.innerHTML = '';

	const TICKS      = 32;
	const GOOD_START = 13;
	const GOOD_END   = 23;
	const GOOD_MID   = (GOOD_START + GOOD_END) / 2;
	let tick         = 0;
	let finished     = false;

	const DRAGON_IDLE   = `🐉\n ~~ \n ~~`;
	const DRAGON_CHARGE = `🐉\n~~~\n🔥~~`;
	const DRAGON_FIRE   = `🐉💥🔥🔥🔥`;

	const pre = document.createElement('pre');
	pre.style.textAlign  = 'center';
	pre.style.lineHeight = '1.5';
	pre.textContent      = DRAGON_IDLE;

	const caption = document.createElement('p');
	caption.textContent = '🐉 The dragon is charging — raise your shield at the right moment!';

	const barDiv = document.createElement('div');
	barDiv.style.fontFamily  = 'monospace';
	barDiv.style.textAlign   = 'center';
	barDiv.style.letterSpacing = '0';

	const btn = document.createElement('button');
	btn.textContent = '🛡️ Shield Up!';

	gameArea.appendChild(pre);
	gameArea.appendChild(caption);
	gameArea.appendChild(barDiv);
	gameArea.appendChild(btn);

	const render = () => {
		const bar = [];
		for (let i = 0; i < TICKS; i++) {
			if (i < tick)                             bar.push('█');
			else if (i >= GOOD_START && i <= GOOD_END) bar.push('▒');
			else                                       bar.push('░');
		}
		barDiv.textContent = `[${bar.join('')}]`;
	};

	const finish = (atTick) => {
		if (finished) return;
		finished = true;
		clearInterval(interval);

		if (atTick < GOOD_START) {
			pre.textContent     = DRAGON_IDLE;
			caption.textContent = '😅 Too early! Shield was up too soon.';
			setTimeout(() => resultCallback(15), 700);
		} else if (atTick <= GOOD_END) {
			const dist  = Math.abs(atTick - GOOD_MID);
			const score = Math.max(65, Math.round(100 - dist * 7));
			pre.textContent     = '🛡️✨';
			caption.textContent = dist < 1.5 ? `⚡ Perfect shield! (${score})` : `🛡️ Shielded in time! (${score})`;
			setTimeout(() => resultCallback(score), 700);
		} else {
			pre.textContent     = DRAGON_FIRE;
			caption.textContent = '🔥 Full power — scorched!';
			setTimeout(() => resultCallback(5), 700);
		}
	};

	btn.addEventListener('click', () => { if (!finished) finish(tick); });

	render();

	const interval = setInterval(() => {
		tick++;
		if (tick > TICKS * 0.38) pre.textContent = DRAGON_CHARGE;
		render();
		if (tick >= TICKS) finish(tick);
	}, 125);
}

export default dragonGame;
