// "Rune Stones" — a sorcerer flashes rune pairs; find them all before running out of chances.

import { initGameArea, createCaption, createSub } from './gameUtils.js';

function memoryGame(resultCallback) {
	const gameArea = initGameArea();

	const caption  = createCaption('🔮 A sorcerer flashes rune stones. Match all pairs!');
	const sub      = createSub('Mistakes left: 3');
	const cardGrid = document.createElement('div');
	Object.assign(cardGrid.style, {
		display: 'flex', gap: '10px', justifyContent: 'center',
		flexWrap: 'wrap', width: '100%', margin: '8px 0',
	});

	gameArea.append(caption, sub, cardGrid);

	const symbols    = ['⚡', '🔥', '💧'];
	const totalPairs = 3;
	const maxMisses  = 3;

	let selectedCards = [];
	let matches   = 0;
	let misses    = 0;
	let isWaiting = false;
	let finished  = false;

	const endGame = (won) => {
		if (finished) return;
		finished = true;
		clearTimeout(timeoutId);
		resultCallback(won ? 90 : Math.max(10, 40 - misses * 10));
	};

	const timeoutId = setTimeout(() => endGame(false), 45000);

	// Build shuffled card deck
	const deck = [...symbols, ...symbols];
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}

	deck.forEach((sym) => {
		const btn = document.createElement('button');
		btn.innerText      = '❓';
		btn.dataset.symbol = sym;
		Object.assign(btn.style, { fontSize: '1.8em', width: '64px', height: '64px', padding: '0', flexShrink: '0' });

		btn.addEventListener('click', () => {
			if (finished || isWaiting || btn.disabled || selectedCards.includes(btn)) return;
			btn.innerText = sym;
			selectedCards.push(btn);
			if (selectedCards.length === 2) {
				isWaiting = true;
				setTimeout(checkMatch, 900);
			}
		});

		cardGrid.appendChild(btn);
	});

	function checkMatch() {
		const [a, b] = selectedCards;
		if (a.dataset.symbol === b.dataset.symbol) {
			[a, b].forEach(c => {
				c.disabled          = true;
				c.style.outline     = '3px solid gold';
				c.style.outlineOffset = '2px';
				c.style.opacity     = '0.75';
			});
			matches++;
			selectedCards = [];
			isWaiting     = false;
			if (matches === totalPairs) endGame(true);
		} else {
			misses++;
			sub.textContent = `Mistakes left: ${maxMisses - misses}`;
			if (misses >= maxMisses) {
				endGame(false);
			} else {
				a.innerText = b.innerText = '❓';
				selectedCards = [];
				isWaiting     = false;
			}
		}
	}
}

export default memoryGame;
