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