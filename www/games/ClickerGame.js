// "Goblin Horde" — beat back as many goblins as you can in 4 seconds.

import { initGameArea, createPre, createCaption, createSub, createBtnRow, createBtn } from './gameUtils.js';

function clickerGame(resultCallback) {
	const gameArea = initGameArea();

	const frames = [
		` >:(\n/|\\\n/ \\`,
		` >:D\n\\|/\n/ \\`,
		` >:O\n /|\\\n  |`,
	];

	const pre     = createPre();
	const caption = createCaption('A goblin horde swarms you — cut them down!');
	const sub     = createSub('0 strikes');
	const btnRow  = createBtnRow();
	const btn     = createBtn('⚔️ Strike!');

	pre.textContent = frames[0];
	btnRow.appendChild(btn);
	gameArea.append(pre, caption, sub, btnRow);

	let clicks   = 0;
	let frameIdx = 0;

	const anim = setInterval(() => {
		frameIdx        = (frameIdx + 1) % frames.length;
		pre.textContent = frames[frameIdx];
	}, 250);

	const milestones = [
		{ at: 5,  text: 'Rally!' },
		{ at: 10, text: 'Relentless!' },
		{ at: 15, text: 'Unstoppable!' },
		{ at: 20, text: 'LEGENDARY!' },
	];

	btn.addEventListener('click', () => {
		clicks++;
		const milestone = milestones.slice().reverse().find(m => clicks >= m.at);
		sub.textContent = `${clicks} strike${clicks !== 1 ? 's' : ''}!${milestone ? ' ' + milestone.text : ''}`;
	});

	setTimeout(() => {
		clearInterval(anim);
		btn.disabled        = true;
		pre.textContent     = ' >>>\n >>>\n >>>';
		caption.textContent = `The goblins flee! ${clicks} strikes landed.`;
		resultCallback(Math.min(100, Math.round(clicks * 5)));
	}, 4000);
}

export default clickerGame;
