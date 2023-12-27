export function updateGameInfo(message) {
    const gameInfoElement = document.getElementById("game-info");
    const messageElement = document.createElement("section");
    messageElement.innerHTML = message;
    gameInfoElement.insertBefore(messageElement, gameInfoElement.firstChild);

    const maxMessages = 50;
    const messageElements = gameInfoElement.children;

    while (messageElements.length > maxMessages) {
        gameInfoElement.removeChild(messageElements[maxMessages]);
    }
}