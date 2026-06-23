// "Spellcast" — release the spell when the gem is at peak power (center of the bar).

import { initGameArea, createPre, createCaption, createSub, createBtnRow, createBtn } from './gameUtils.js';

function asciiReactionGame(resultCallback) {
	const gameArea = initGameArea();

	const pre     = createPre();
	const caption = createCaption('✨ Channel the energy — release at peak power!');
	const sub     = createSub('Power: 0%');
	const btnRow  = createBtnRow();
	const btn     = createBtn('✨ Release!');

	btnRow.appendChild(btn);
	gameArea.append(pre, caption, sub, btnRow);

	const WIDTH   = 21;
	const TARGET  = 3 + Math.floor(Math.random() * (WIDTH - 6));
	let position  = 0;
	let direction = 1;
	let finished  = false;
	const speedMs = 45 + Math.floor(Math.random() * 35);

	const render = () => {
		const line = Array(WIDTH).fill('·');
		line[TARGET]   = '|';
		line[position] = '◆';
		pre.textContent = `[${line.join('')}]`;
		sub.textContent = `Power: ${Math.max(0, 100 - Math.abs(position - TARGET) * 12)}%`;
	};

	const finish = (score) => {
		if (finished) return;
		finished = true;
		clearInterval(tick);
		const line = Array(WIDTH).fill('·');
		line[TARGET]    = '*';
		pre.textContent = `[${line.join('')}]`;
		caption.textContent = score >= 80 ? '💥 Perfect release!' : score >= 50 ? '✨ Good cast!' : '💨 Off-target...';
		sub.textContent     = `Score: ${score}`;
		setTimeout(() => resultCallback(score), 400);
	};

	btn.addEventListener('click', () => {
		if (finished) return;
		finish(Math.max(0, Math.min(100, 100 - Math.abs(position - TARGET) * 12)));
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
