// "Combat Frenzy" — strike the enemy horde as many times as you can in 3 seconds.

function clickerGame(resultCallback) {
	const gameArea = document.getElementById('game-area');
	gameArea.innerHTML = '';

	const frames = [
		` >:(\n/|\\\n/ \\`,
		` >:D\n\\|/\n/ \\`,
		` ò_ó\n /|\\\n  |`,
	];

	const pre = document.createElement('pre');
	pre.style.textAlign = 'center';
	pre.style.lineHeight = '1.5';
	pre.textContent = frames[0];

	const caption = document.createElement('p');
	caption.textContent = 'Enemies swarm you — strike them down!';

	const btn = document.createElement('button');
	btn.textContent = '⚔️ Strike!';

	const counter = document.createElement('p');
	counter.style.fontWeight = 'bold';
	counter.textContent = '0 strikes';

	gameArea.appendChild(pre);
	gameArea.appendChild(caption);
	gameArea.appendChild(btn);
	gameArea.appendChild(counter);

	let clicks = 0;
	let frameIdx = 0;

	const anim = setInterval(() => {
		frameIdx = (frameIdx + 1) % frames.length;
		pre.textContent = frames[frameIdx];
	}, 250);

	btn.addEventListener('click', () => {
		clicks++;
		counter.textContent = `${clicks} strike${clicks !== 1 ? 's' : ''}!`;
	});

	setTimeout(() => {
		clearInterval(anim);
		btn.disabled = true;
		pre.textContent = '💨';
		caption.textContent = `The horde scatters! ${clicks} strikes landed.`;
		resultCallback(clicks);
	}, 3000);
}

export default clickerGame;
