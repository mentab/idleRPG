function timingGame(resultCallback) {
	const gameArea = document.getElementById('game-area');
	const button = document.createElement('button');
	button.innerText = 'Click Me at the Right Moment!';
	gameArea.appendChild(button);

	const targetTime = Math.random() * 2000 + 1000;
	let startTime;

	function calculateScore(difference) {
		const maxDifference = 1000;
		const score = Math.floor((1 - difference / maxDifference) * 100);
		return score;
	}

	button.addEventListener('click', () => {
		const endTime = Date.now();
		const reactionTime = endTime - startTime;
		const difference = Math.abs(reactionTime - targetTime);
		resultCallback(calculateScore(difference));
		gameArea.removeChild(button);
	});

	setTimeout(() => {
		button.innerText = 'Click now!';
		startTime = Date.now();
	}, targetTime);
}

export default timingGame;