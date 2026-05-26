// "Forge the Blade" — heat the iron into the glowing zone, then strike before it overheats.

import { initGameArea, createPre, createCaption, createSub, createBtnRow, createBtn } from './gameUtils.js';

function bombGame(resultCallback) {
	const gameArea = initGameArea();

	const HEAT_MAX = 22;
	const ZONE_MIN = 8;
	const ZONE_MAX = 14;
	const ZONE_MID = (ZONE_MIN + ZONE_MAX) / 2;
	let heat     = 0;
	let finished = false;

	const pre     = createPre();
	const caption = createCaption('Heat the iron — strike in the ▓ zone!');
	const sub     = createSub();
	const btnRow  = createBtnRow();
	const btn     = createBtn('🔨 Strike!');

	btnRow.appendChild(btn);
	gameArea.append(pre, caption, sub, btnRow);

	const render = () => {
		const bar = [];
		for (let i = 1; i <= HEAT_MAX; i++) {
			const inZone  = i >= ZONE_MIN && i <= ZONE_MAX;
			const heated  = i < heat;
			const isFront = i === heat;
			if (isFront && inZone)  bar.push('◆');
			else if (isFront)       bar.push('►');
			else if (heated && inZone) bar.push('▓');
			else if (heated)        bar.push('═');
			else if (inZone)        bar.push('░');
			else                    bar.push(' ');
		}
		pre.textContent = `>=[${bar.join('')}]=*`;
	};

	const finish = (atHeat) => {
		if (finished) return;
		finished = true;
		clearInterval(interval);
		sub.textContent = '';

		if (atHeat < ZONE_MIN) {
			pre.textContent     = '>===X';
			caption.textContent = atHeat === 0
				? 'You never struck! The iron goes cold.'
				: `Too cold — the blade shatters! (${atHeat}/${ZONE_MIN})`;
			setTimeout(() => resultCallback(atHeat === 0 ? 5 : 18), 700);
		} else if (atHeat <= ZONE_MAX) {
			const dist  = Math.abs(atHeat - ZONE_MID);
			const score = Math.max(65, Math.round(100 - dist * 9));
			pre.textContent     = '>===*=*';
			caption.textContent = dist < 1.5 ? `⚡ Masterwork blade! (${score})` : `🔨 Well-tempered! (${score})`;
			setTimeout(() => resultCallback(score), 700);
		} else {
			pre.textContent     = '>~~~~';
			caption.textContent = 'Overheated! The blade melts in the forge!';
			setTimeout(() => resultCallback(5), 700);
		}
	};

	btn.addEventListener('click', () => { if (!finished) finish(heat); });
	render();

	const interval = setInterval(() => {
		heat++;
		if (heat > HEAT_MAX) finish(heat);
		else render();
	}, 190);
}

export default bombGame;
