import gameConfig from '../config/gameConfig.js';
import { updateGameNotice } from '../modules/MessageModule.js';

class AscendScreen {
    constructor(player, questModule, updatePlayerStats, onAscend) {
        this.player = player;
        this.questModule = questModule;
        this.updatePlayerStats = updatePlayerStats;
        this.onAscend = onAscend;
    }

    render() {
        const container = document.getElementById('ascend-screen-content');
        container.innerHTML = '';

        const p = this.player;
        const canAscend = p.level >= gameConfig.prestigeMinLevel;
        const pointsEarned = Math.floor(p.level / 10);

        if (!canAscend) {
            container.innerHTML = `
                <p>Reach level <strong>${gameConfig.prestigeMinLevel}</strong> to unlock Ascension.</p>
                <p style="opacity:0.6">Current level: ${p.level}</p>
            `;
            return;
        }

        const div = document.createElement('div');
        div.innerHTML = `
            <p>You are about to reset your run and ascend to <strong>Prestige ${p.prestigeLevel + 1}</strong>.</p>

            <table style="width:100%;border-collapse:collapse;margin-bottom:1rem">
                <tr>
                    <td style="padding:0.2rem 0;opacity:0.7">Current level</td>
                    <td style="text-align:right"><strong>${p.level}</strong></td>
                </tr>
                <tr>
                    <td style="padding:0.2rem 0;opacity:0.7">Prestige points earned</td>
                    <td style="text-align:right"><strong style="color:#ffd700">+${pointsEarned} ✨</strong></td>
                </tr>
                <tr>
                    <td style="padding:0.2rem 0;opacity:0.7">Total after ascension</td>
                    <td style="text-align:right"><strong>${p.prestigePoints + pointsEarned} pts</strong></td>
                </tr>
            </table>

            <div style="margin-bottom:1rem;padding:0.6rem;border:1px solid var(--border);border-radius:4px;font-size:0.9em">
                <div style="margin-bottom:0.3rem"><strong>♻️ Resets</strong></div>
                <div style="opacity:0.7">Level · XP · Gold · Inventory · Stats · Spells · Gear</div>
                <div style="margin-top:0.5rem;margin-bottom:0.3rem"><strong>✅ Persists</strong></div>
                <div style="opacity:0.7">Prestige level · Prestige points · Relics · Contracts</div>
            </div>
        `;

        const btn = document.createElement('button');
        btn.textContent = `🌟 Ascend (earn ${pointsEarned} pts)`;
        btn.style.width = '100%';
        btn.addEventListener('click', () => this._doAscend());
        div.appendChild(btn);

        container.appendChild(div);
    }

    _doAscend() {
        const pointsEarned = this.player.ascend();
        this.questModule.initDailyQuests(gameConfig.questPool);
        this.updatePlayerStats();
        updateGameNotice(`🌟 Ascended! Prestige ${this.player.prestigeLevel} — +${pointsEarned} prestige points!`);
        updateGameNotice(`Go to Relics to spend your prestige points.`);
        if (this.onAscend) this.onAscend();
        this.render();
    }
}

export default AscendScreen;
