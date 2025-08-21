export function clearGameInfo() {
    const gameInfoElement = document.getElementById("game-info-list");
    gameInfoElement.innerHTML = "";
}

export function updateGameInfo(message) {
    const gameInfoElement = document.getElementById("game-info-list");
    const messageElement = document.createElement("section");
    messageElement.innerHTML = message;
    gameInfoElement.insertBefore(messageElement, gameInfoElement.firstChild);

    const maxMessages = 50;
    const messageElements = gameInfoElement.children;

    while (messageElements.length > maxMessages) {
        gameInfoElement.removeChild(messageElements[maxMessages]);
    }
}

export function updateInfoBattle(turns, player, enemy, battleMessages) {
    const gameInfoElement = document.getElementById("game-info-list");
    const messageElement = document.createElement("section");

    const playerHealthPercentage = (player.currentHP / player.maxHP) * 100;
    const enemyHealthPercentage = (enemy.currentHP / enemy.maxHP) * 100;

    messageElement.innerHTML = `
    <div class="game-info" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; margin: 10px 0;">
        <div class="player-info" style="flex: 1; padding-right: 10px;">
            <p><strong>💖 [Player] : ${player.currentHP}/${player.maxHP}</strong></p>
            <progress class="health-bar" value="${playerHealthPercentage}" max="100" style="width: 100%; height: 20px;"></progress>
            <p>${Math.round(playerHealthPercentage)}% HP</p>
        </div>
        <div class="enemy-info" style="flex: 1; padding-left: 10px;">
            <p><strong>${enemy.icon} [${enemy.name}] : ${enemy.currentHP}/${enemy.maxHP}</strong></p>
            <progress class="health-bar" value="${enemyHealthPercentage}" max="100" style="width: 100%; height: 20px;"></progress>
            <p>${Math.round(enemyHealthPercentage)}% HP</p>
        </div>
    </div>
    <details>
        <summary>Details</summary>
        ${battleMessages.join('<br/>')}
    </details>
    `;

    gameInfoElement.insertBefore(messageElement, gameInfoElement.firstChild);
}

export function updateGameNotice(message) {
    const noticeContainer = document.getElementById("game-notice-container");
    const noticeElement = document.createElement("div");

    noticeElement.classList.add("game-notice");
    noticeElement.innerHTML = message;
    
    noticeContainer.appendChild(noticeElement);
    
    setTimeout(() => {
        noticeElement.classList.add("fade-out");
        setTimeout(() => {
            noticeContainer.removeChild(noticeElement);
        }, 500);
    }, 5000);

    const maxNotices = 5;
    const noticeElements = noticeContainer.children;
    while (noticeElements.length > maxNotices) {
        noticeContainer.removeChild(noticeElements[0]);
    }
}