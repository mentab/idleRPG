function timingGame(resultCallback) {
	const gameArea = document.getElementById('game-area');
	gameArea.innerHTML = '';

	const button = document.createElement('button');
	button.innerText = 'Wait for the signal, then click!';
	gameArea.appendChild(button);

	const targetTime = Math.random() * 2000 + 1000;
	let startTime = null;
	let finished = false;

	function calculateScore(difference) {
		const maxDifference = 1000;
		const score = Math.floor((1 - difference / maxDifference) * 100);
		return score;
	}

	button.addEventListener('click', () => {
		if (finished) return;
		finished = true;

		if (!startTime) {
			resultCallback(15);
			return;
		}

		const endTime = Date.now();
		const reactionTime = endTime - startTime;
		const difference = Math.abs(reactionTime - targetTime);
		resultCallback(calculateScore(difference));
	});

	setTimeout(() => {
		button.innerText = 'Click now!';
		startTime = Date.now();
	}, targetTime);
}

export default timingGame;