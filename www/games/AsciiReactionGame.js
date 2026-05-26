// "Spellcast" — release the spell at peak power (center of the bar). Button, no spacebar.

function asciiReactionGame(resultCallback) {
	const gameArea = document.getElementById('game-area');
	gameArea.innerHTML = '';

	const pre = document.createElement('pre');
	pre.style.textAlign = 'center';
	pre.style.lineHeight = '1.6';

	const caption = document.createElement('p');
	caption.textContent = '✨ Channel the energy — release at peak power (center)!';

	const btn = document.createElement('button');
	btn.textContent = '✨ Release!';

	gameArea.appendChild(pre);
	gameArea.appendChild(caption);
	gameArea.appendChild(btn);

	const WIDTH = 21;
	const CENTER = Math.floor(WIDTH / 2);
	let position = 0;
	let direction = 1;
	let finished = false;
	const speedMs = 50 + Math.floor(Math.random() * 45);

	const render = () => {
		const line = Array(WIDTH).fill('·');
		line[CENTER] = '|';
		line[position] = '◆';
		const power = Math.max(0, 100 - Math.abs(position - CENTER) * 12);
		pre.textContent = `[${line.join('')}]\nPower: ${power}%`;
	};

	const finish = (score) => {
		if (finished) return;
		finished = true;
		clearInterval(tick);
		const line = Array(WIDTH).fill('·');
		line[CENTER] = '✨';
		pre.textContent = `[${line.join('')}]`;
		caption.textContent = score >= 80 ? '💥 Perfect release!' : score >= 50 ? '✨ Good cast!' : '💨 Off-target...';
		setTimeout(() => resultCallback(score), 400);
	};

	btn.addEventListener('click', () => {
		if (finished) return;
		const score = Math.max(0, Math.min(100, 100 - Math.abs(position - CENTER) * 12));
		finish(score);
	});

	const tick = setInterval(() => {
		position += direction;
		if (position >= WIDTH - 1 || position <= 0) direction *= -1;
		render();
	}, speedMs);

	render();
	setTimeout(() => finish(10), 8000);
}

export default asciiReactionGame;
