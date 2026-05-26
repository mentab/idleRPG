
function shootingGame(resultCallback) {
	const gameArea = document.getElementById('game-area');
	gameArea.innerHTML = "";

	const symbols = ['🎯', '⚽', '🍎', '🚀', '🍕']; // Add your symbols here
	const targets = [];
	let score = 0;
	const gameTime = 10;
	let timer;

	// Create targets with symbols
	function createTarget() {
		const target = document.createElement('div');
		target.classList.add('target');
		target.innerText = symbols[Math.floor(Math.random() * symbols.length)];

		// Add click event listener to the target
		target.addEventListener('click', () => {
			score++;
			updateScore();
			gameArea.removeChild(target);
		});

		targets.push(target);
		gameArea.appendChild(target);
	}

	const scoreDisplay = document.createElement('div');
	scoreDisplay.innerText = `Score: 0`;
	gameArea.appendChild(scoreDisplay);

	function updateScore() {
		scoreDisplay.innerText = `Score: ${score}`;
	}

	// Start the game by creating targets at regular intervals
	function startGame() {
		timer = setInterval(createTarget, 1000);
		setTimeout(() => {
			clearInterval(timer);
			resultCallback(score);
		}, gameTime * 1000);
	}

	startGame();
}

export default shootingGame;