// "Dragon's Breath" — raise your shield inside the charge window as the dragon powers up.

import { initGameArea, createPre, createCaption, createSub, createBtnRow, createBtn } from './gameUtils.js';

function dragonGame(resultCallback) {
	const gameArea = initGameArea();

	const TICKS      = 32;
	const GOOD_START = 13;
	const GOOD_END   = 22;
	const GOOD_MID   = (GOOD_START + GOOD_END) / 2;
	let tick         = 0;
	let finished     = false;

	const DRAGON_IDLE   = `  /\\\n (o_o)\n /\\_/\\`;
	const DRAGON_CHARGE = `  /\\\n (O_O)~~~\n /\\_/\\`;
	const DRAGON_FIRE   = `  /\\\n (>_<)=###>\n /\\_/\\`;

	const pre     = createPre();
	const caption = createCaption('The dragon is charging its breath...');
	const sub     = createSub();
	const btnRow  = createBtnRow();
	const btn     = createBtn('🛡️ Shield Up!');

	pre.textContent = DRAGON_IDLE;
	btnRow.appendChild(btn);
	gameArea.append(pre, caption, sub, btnRow);

	const render = () => {
		const bar = [];
		for (let i = 0; i < TICKS; i++) {
			if (i < tick)                              bar.push('█');
			else if (i >= GOOD_START && i <= GOOD_END) bar.push('▒');
			else                                        bar.push('░');
		}
		sub.textContent = `[${bar.join('')}]`;
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
			pre.textContent     = '  O \n [=]\n / \\';
			caption.textContent = dist < 2 ? `⚡ Perfect shield! (${score})` : `🛡️ Shielded in time! (${score})`;
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
