function clickerGame(resultCallback) {
	const gameArea = document.getElementById('game-area');
	gameArea.innerHTML = "";
	
	const button = document.createElement('button');
	button.innerText = 'Click Me as Many Times as You Can!';
	gameArea.appendChild(button);

	let clickCount = 0;
	const gameTime = 3;

	button.addEventListener('click', () => {
		clickCount++;
		button.innerText = `Clicked: ${clickCount} times`;
	});

	function calculateScore(clickCount) {
		return clickCount;
	}

	setTimeout(() => {
		button.removeEventListener('click', () => {
			clickCount++;
		});
		button.disabled = true;
		gameArea.removeChild(button);
	
		resultCallback(calculateScore(clickCount));
	}, gameTime * 1000);
}


export default clickerGame;