// "Rune Stones" — a sorcerer flashes rune pairs; find them all before running out of chances.

function memoryGame(resultCallback) {
	const gameArea = document.getElementById('game-area');
	gameArea.innerHTML = '';

	const intro = document.createElement('p');
	intro.textContent = '🔮 A sorcerer flashes rune stones at you. Remember their pairs!';
	gameArea.appendChild(intro);

	const symbols = ['⚡', '🔥', '💧'];
	const totalPairs = 3;
	const cards = generateCards(symbols, totalPairs);

	let selectedCards = [];
	let matches = 0;
	let misses = 0;
	let isWaiting = false;
	let finished = false;
	const maxMisses = 3;

	const missCounter = document.createElement('p');
	missCounter.textContent = `Mistakes left: ${maxMisses}`;
	gameArea.appendChild(missCounter);

	const endGame = (won) => {
		if (finished) return;
		finished = true;
		clearTimeout(timeoutId);
		resultCallback(won ? 90 : Math.max(10, 40 - misses * 10));
	};

	const timeoutId = setTimeout(() => endGame(false), 45000);

	cards.forEach((card) => {
		gameArea.appendChild(card);
		card.addEventListener('click', () => {
			if (finished) return;
			if (!isWaiting && !selectedCards.includes(card) && selectedCards.length < 2) {
				flipCard(card);
				selectedCards.push(card);
				if (selectedCards.length === 2) {
					isWaiting = true;
					setTimeout(checkMatch, 1000);
				}
			}
		});
	});

	function generateCards(symbols, totalPairs) {
		const cards = [];
		for (let i = 0; i < totalPairs; i++) {
			cards.push(createCard(symbols[i]));
			cards.push(createCard(symbols[i]));
		}
		for (let i = cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[cards[i], cards[j]] = [cards[j], cards[i]];
		}
		return cards;
	}

	function createCard(symbol) {
		const card = document.createElement('button');
		card.innerText = '❓';
		card.setAttribute('data-symbol', symbol);
		return card;
	}

	function flipCard(card) {
		card.innerText = card.getAttribute('data-symbol');
		setTimeout(() => {
			if (!selectedCards.includes(card)) card.innerText = '❓';
		}, 1000);
	}

	function unflipCards() {
		selectedCards.forEach((card) => { card.innerText = '❓'; });
		selectedCards = [];
		isWaiting = false;
	}

	function checkMatch() {
		const [card1, card2] = selectedCards;
		if (card1.getAttribute('data-symbol') === card2.getAttribute('data-symbol')) {
			card1.disabled = true;
			card2.disabled = true;
			matches++;
			selectedCards = [];
			isWaiting = false;
			if (matches === totalPairs) endGame(true);
		} else {
			misses++;
			missCounter.textContent = `Mistakes left: ${maxMisses - misses}`;
			if (misses >= maxMisses) {
				endGame(false);
			} else {
				unflipCards();
			}
		}
	}
}

export default memoryGame;
