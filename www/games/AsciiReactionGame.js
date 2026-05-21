// Simple ASCII timing mini-game: press Space when [!] is near the center.

function asciiReactionGame(resultCallback) {
	const gameArea = document.getElementById('game-area');
	gameArea.innerHTML = '';

	const pre = document.createElement('pre');
	pre.textContent = 'Press SPACE when [!] is at the center…';
	gameArea.appendChild(pre);

	const hint = document.createElement('p');
	hint.textContent = 'Bar: |........[!]........|  —  SPACE';
	gameArea.appendChild(hint);

	const width = 21;
	const center = Math.floor(width / 2);
	let position = 0;
	let direction = 1;
	let finished = false;
	const speedMs = 55 + Math.floor(Math.random() * 40);

	const render = () => {
		const line = Array(width).fill('.');
		line[position] = '!';
		pre.textContent = `|${line.join('')}|`;
	};

	const finish = (score) => {
		if (finished) return;
		finished = true;
		clearInterval(tick);
		window.removeEventListener('keydown', onKey);
		pre.textContent = `|${' '.repeat(center)}[!]${' '.repeat(center)}|\nScore: ${score}/100`;
		setTimeout(() => resultCallback(score), 400);
	};

	const onKey = (event) => {
		if (event.code !== 'Space' || finished) return;
		event.preventDefault();
		const distance = Math.abs(position - center);
		const score = Math.max(0, Math.min(100, 100 - distance * 12));
		finish(score);
	};

	const tick = setInterval(() => {
		position += direction;
		if (position >= width - 1 || position <= 0) {
			direction *= -1;
		}
		render();
	}, speedMs);

	window.addEventListener('keydown', onKey);
	render();

	setTimeout(() => finish(15), 8000);
}

export default asciiReactionGame;
