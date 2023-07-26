
function shootingGame(resultCallback) {
  const gameArea = document.getElementById('game-area');
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

  // Update the score displayed in the game area
  function updateScore() {
    const scoreDisplay = document.createElement('div');
    scoreDisplay.innerText = `Score: ${score}`;
    gameArea.appendChild(scoreDisplay);
  }

  // Start the game by creating targets at regular intervals
  function startGame() {
    timer = setInterval(createTarget, 1000);
    setTimeout(() => {
      clearInterval(timer);
      resultCallback(score);
    }, gameTime * 1000);
  }

  // Start the game when the page loads
  startGame();
}

export default shootingGame;