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

export function updateBattleSummary(rounds, player, enemy, playerHPBefore = null) {
    const gameInfoElement = document.getElementById("game-info-list");
    const el = document.createElement("section");

    const nRounds = rounds.length;
    const last = nRounds > 0 ? rounds[nRounds - 1] : { playerHP: player.currentHP, enemyHP: enemy.currentHP, fled: false };
    const fled    = last.fled;
    const victory = last.enemyHP <= 0;
    const defeat  = last.playerHP <= 0;

    const damageDealt = enemy.maxHP - last.enemyHP;
    const damageTaken = playerHPBefore != null ? Math.max(0, playerHPBefore - last.playerHP) : '?';

    let outcomeText, outcomeColor;
    if (fled)         { outcomeText = '🏃 Retreated';  outcomeColor = '#ff9800'; }
    else if (victory) { outcomeText = '⚔️ Victory!';   outcomeColor = '#4caf50'; }
    else if (defeat)  { outcomeText = '💀 Defeat';     outcomeColor = '#f44336'; }
    else              { outcomeText = '⏱️ Draw';       outcomeColor = '#888888'; }

    const roundsHTML = rounds.map(r => {
        const events = r.messages.map(m => `<span>${m}</span>`).join('<br>');
        return `
        <tr>
            <td style="padding:0.2rem 0.4rem;border-bottom:1px solid var(--border);opacity:0.5;font-weight:bold;vertical-align:top">${r.turn}</td>
            <td style="padding:0.2rem 0.4rem;border-bottom:1px solid var(--border);vertical-align:top;line-height:1.6">${events}</td>
            <td style="padding:0.2rem 0.4rem;border-bottom:1px solid var(--border);text-align:right;white-space:nowrap;opacity:0.75;vertical-align:top">${r.playerHP}/${player.maxHP}</td>
            <td style="padding:0.2rem 0.4rem;border-bottom:1px solid var(--border);text-align:right;white-space:nowrap;opacity:0.75;vertical-align:top">${r.enemyHP}/${enemy.maxHP}</td>
        </tr>`;
    }).join('');

    el.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.3rem;">
            <span><strong>${enemy.icon} ${enemy.name}</strong> <small style="opacity:0.7">Lv ${enemy.level}</small></span>
            <strong style="color:${outcomeColor};font-size:1.05rem">${outcomeText}</strong>
        </div>
        <div style="display:flex;gap:1.2rem;flex-wrap:wrap;opacity:0.85;margin-bottom:0.3rem;">
            <small>🔄 ${nRounds} round${nRounds !== 1 ? 's' : ''}</small>
            <small>🗡️ Dealt <strong>${damageDealt}</strong></small>
            <small>🩸 Took <strong>${damageTaken}</strong></small>
            <small>💖 <strong>${last.playerHP}/${player.maxHP}</strong> HP left</small>
        </div>
        <details>
            <summary><small>Round details</small></summary>
            <table style="width:100%;border-collapse:collapse;font-size:0.8em;margin-top:0.25rem">
                <thead>
                    <tr style="opacity:0.5">
                        <th style="text-align:left;padding:0.2rem 0.4rem;border-bottom:1px solid var(--border);width:2rem">#</th>
                        <th style="text-align:left;padding:0.2rem 0.4rem;border-bottom:1px solid var(--border)">Events</th>
                        <th style="text-align:right;padding:0.2rem 0.4rem;border-bottom:1px solid var(--border);white-space:nowrap">💖 HP</th>
                        <th style="text-align:right;padding:0.2rem 0.4rem;border-bottom:1px solid var(--border);white-space:nowrap">${enemy.icon} HP</th>
                    </tr>
                </thead>
                <tbody>${roundsHTML}</tbody>
            </table>
        </details>`;

    gameInfoElement.insertBefore(el, gameInfoElement.firstChild);
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