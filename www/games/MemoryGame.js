function memoryGame(resultCallback) {
	const gameArea = document.getElementById('game-area');
	gameArea.innerHTML = '';

	const symbols = ['🗡️', '🔮', '👑'];
	const totalPairs = 3;
	const cards = generateCards(symbols, totalPairs);

	let selectedCards = [];
	let matches = 0;
	let misses = 0;
	let isWaiting = false;
	let finished = false;
	const maxMisses = 3;

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
			const symbol = symbols[i];
			const card1 = createCard(symbol);
			const card2 = createCard(symbol);

			cards.push(card1);
			cards.push(card2);
		}

		// Shuffle the cards using Fisher-Yates algorithm
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
		const symbol = card.getAttribute('data-symbol');

		card.innerText = symbol;

		// Set a short timeout to flip the card back if not matched
		setTimeout(() => {
			if (!selectedCards.includes(card)) {
				card.innerText = '❓';
			}
		}, 1000);
	}

	function unflipCards() {
		selectedCards.forEach((card) => {
			card.innerText = '❓';
		});
		selectedCards = [];
		isWaiting = false;
	}

	function checkMatch() {
		const [card1, card2] = selectedCards;
		const symbol1 = card1.getAttribute('data-symbol');
		const symbol2 = card2.getAttribute('data-symbol');

		if (symbol1 === symbol2) {
			card1.removeEventListener('click', () => {});
			card2.removeEventListener('click', () => {});
			matches++;

			if (matches === totalPairs) {
				endGame(true);
			} else {
				selectedCards = [];
				isWaiting = false;
			}
		} else {
			misses++;
			if (misses >= maxMisses) {
				endGame(false);
			} else {
				unflipCards();
			}
		}
	}
}

export default memoryGame;