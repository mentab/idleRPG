function clickerGame(resultCallback) {
	const gameArea = document.getElementById('game-area');
	gameArea.innerHTML = '';

	const button = document.createElement('button');
	button.innerText = 'Click! (3 seconds)';
	gameArea.appendChild(button);

	let clickCount = 0;
	const gameTime = 3;

	const onClick = () => {
		clickCount++;
		button.innerText = `Clicks: ${clickCount}`;
	};

	button.addEventListener('click', onClick);

	setTimeout(() => {
		button.removeEventListener('click', onClick);
		button.disabled = true;
		resultCallback(clickCount);
	}, gameTime * 1000);
}


export default clickerGame;