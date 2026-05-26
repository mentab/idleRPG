// "Cut the Fuse" — the fuse burns down; cut it inside the marked zone before it explodes.

function bombGame(resultCallback) {
	const gameArea = document.getElementById('game-area');
	gameArea.innerHTML = '';

	const FUSE_MAX  = 22;
	const ZONE_MIN  = 7;
	const ZONE_MAX  = 14;
	const ZONE_MID  = (ZONE_MIN + ZONE_MAX) / 2;
	let fuse        = FUSE_MAX;
	let finished    = false;

	const pre = document.createElement('pre');
	pre.style.textAlign = 'center';
	pre.style.fontFamily = 'monospace';

	const caption = document.createElement('p');
	caption.textContent = 'Cut the fuse inside the ▓ zone!';

	const legend = document.createElement('p');
	legend.style.fontFamily = 'monospace';
	legend.style.fontSize = '0.8em';
	legend.style.opacity = '0.7';
	// Fixed guide showing zone position
	const guide = Array(FUSE_MAX).fill('·');
	for (let i = ZONE_MIN - 1; i < ZONE_MAX; i++) guide[i] = '↑';
	legend.textContent = `   [${guide.join('')}]`;

	const btn = document.createElement('button');
	btn.textContent = '✂️ Cut!';

	gameArea.appendChild(pre);
	gameArea.appendChild(caption);
	gameArea.appendChild(legend);
	gameArea.appendChild(btn);

	const render = () => {
		const bar = [];
		for (let i = 1; i <= FUSE_MAX; i++) {
			if (i > fuse)                            bar.push(' ');
			else if (i >= ZONE_MIN && i <= ZONE_MAX) bar.push('▓');
			else                                     bar.push('═');
		}
		pre.textContent = `💣[${bar.join('')}]~`;
	};

	const finish = (atFuse) => {
		if (finished) return;
		finished = true;
		clearInterval(interval);
		legend.textContent = '';

		if (atFuse === 0) {
			pre.textContent = '💥💥💥';
			caption.textContent = 'BOOM! The bomb went off!';
			setTimeout(() => resultCallback(5), 700);
		} else if (atFuse > ZONE_MAX) {
			caption.textContent = `✂️ Too early — fuse still too long! (${atFuse} left)`;
			setTimeout(() => resultCallback(18), 700);
		} else if (atFuse >= ZONE_MIN) {
			const dist  = Math.abs(atFuse - ZONE_MID);
			const score = Math.max(65, Math.round(100 - dist * 9));
			pre.textContent = '✂️💣';
			caption.textContent = dist < 1.5 ? `💥 Perfect cut! (${score})` : `✅ Clean cut! (${score})`;
			setTimeout(() => resultCallback(score), 700);
		} else {
			caption.textContent = `😰 Too close to the bomb! (${atFuse} left)`;
			setTimeout(() => resultCallback(28), 700);
		}
	};

	btn.addEventListener('click', () => { if (!finished) finish(fuse); });

	render();

	const interval = setInterval(() => {
		fuse--;
		if (fuse <= 0) { fuse = 0; finish(0); }
		else render();
	}, 190);
}

export default bombGame;
