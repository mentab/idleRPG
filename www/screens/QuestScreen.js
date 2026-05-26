class QuestScreen {
    constructor(questModule, updatePlayerStats) {
        this.questModule = questModule;
        this.updatePlayerStats = updatePlayerStats;
    }

    render() {
        const container = document.getElementById('quest-list');
        container.innerHTML = '';

        const player = this.questModule.player;
        const quests = player.dailyQuests;

        if (!quests || quests.length === 0) {
            container.innerHTML = '<p>No quests available today.</p>';
            return;
        }

        const header = document.createElement('p');
        header.innerHTML = '<strong>Daily Quests</strong> — reset each day';
        container.appendChild(header);

        quests.forEach((quest, index) => {
            const item = document.createElement('div');
            item.style.marginBottom = '0.8rem';
            item.style.paddingBottom = '0.5rem';
            item.style.borderBottom = '1px solid var(--border)';

            const rewardText = quest.reward.type === 'coins' ? `${quest.reward.amount} coins`
                : quest.reward.type === 'xp' ? `${quest.reward.amount} XP`
                : `${quest.reward.amount} prestige point`;

            const pct = Math.min(100, Math.round((quest.progress / quest.target) * 100));

            item.innerHTML = `
                <strong>${quest.description}</strong><br/>
                <small>Progress: ${quest.progress} / ${quest.target} (${pct}%)</small><br/>
                <small>Reward: ${rewardText}</small><br/>
            `;

            if (quest.claimed) {
                const badge = document.createElement('span');
                badge.textContent = '✅ Claimed';
                item.appendChild(badge);
            } else if (quest.progress >= quest.target) {
                const btn = document.createElement('button');
                btn.textContent = '🎁 Claim Reward!';
                btn.addEventListener('click', () => {
                    this.questModule.claimQuest(index, this.updatePlayerStats);
                    this.render();
                });
                item.appendChild(btn);
            }

            container.appendChild(item);
        });
    }
}

export default QuestScreen;
