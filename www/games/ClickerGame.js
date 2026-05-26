// "Goblin Horde" — strike goblins, but time your hits on the pulse for bonus damage.

import { initGameArea, createPre, createCaption, createSub, createBtnRow, createBtn } from './gameUtils.js';

const DURATION      = 4000;  // 4s total
const PULSE_EVERY   = 700;   // pulse window every 700ms
const PULSE_WINDOW  = 220;   // 220ms to hit the pulse
const PTS_PULSE     = 8;     // perfect hit during pulse
const PTS_NORMAL    = 4;     // normal hit

const FRAME_IDLE    = ` >:(\n/|\\\n/ \\`;
const FRAME_OPEN    = ` >:O\n\\|/\n/ \\`; // vulnerable (pulse window)
const FRAME_HIT     = ` X_X\n/|\\\n/ \\`;

function clickerGame(resultCallback) {
	const gameArea = initGameArea();

	const pre     = createPre();
	const caption = createCaption('Goblins swarm! Strike them — hit while they OPEN for bonus!');
	const sub     = createSub('Waiting...');
	const btnRow  = createBtnRow();
	const btn     = createBtn('⚔️ Strike!');

	pre.textContent = FRAME_IDLE;
	btnRow.appendChild(btn);
	gameArea.append(pre, caption, sub, btnRow);

	let points       = 0;
	let totalClicks  = 0;
	let pulseActive  = false;
	let hitFlash     = false;

	// Pulse loop — goblin briefly opens up
	const pulseInterval = setInterval(() => {
		pulseActive = true;
		pre.textContent = FRAME_OPEN;
		setTimeout(() => {
			if (!hitFlash) pre.textContent = FRAME_IDLE;
			pulseActive = false;
		}, PULSE_WINDOW);
	}, PULSE_EVERY);

	btn.addEventListener('click', () => {
		totalClicks++;
		if (pulseActive) {
			points += PTS_PULSE;
			sub.textContent = `⚡ PERFECT! ${totalClicks} strikes — ${points} pts`;
		} else {
			points += PTS_NORMAL;
			sub.textContent = `${totalClicks} strikes — ${points} pts`;
		}
		// Flash hit frame briefly
		hitFlash = true;
		pre.textContent = FRAME_HIT;
		setTimeout(() => {
			hitFlash = false;
			pre.textContent = pulseActive ? FRAME_OPEN : FRAME_IDLE;
		}, 100);
	});

	setTimeout(() => {
		clearInterval(pulseInterval);
		btn.disabled        = true;
		pre.textContent     = ' >>>\n >>>\n >>>';
		caption.textContent = `Horde repelled! ${totalClicks} strikes — ${points} pts`;
		resultCallback(Math.min(100, points));
	}, DURATION);
}

export default clickerGame;
