import { updateGameNotice } from './MessageModule.js';

export class QuestModule {
    constructor(player) {
        this.player = player;
    }

    _todayString() {
        return new Date().toISOString().slice(0, 10);
    }

    initDailyQuests(questPool) {
        const today = this._todayString();
        if (this.player.lastQuestDate === today && this.player.dailyQuests?.length > 0) {
            return;
        }
        const shuffled = [...questPool].sort(() => Math.random() - 0.5);
        this.player.dailyQuests = shuffled.slice(0, 3).map(q => ({
            ...q,
            progress: 0,
            claimed: false,
        }));
        this.player.lastQuestDate = today;
    }

    trackEvent(type, value = 1) {
        if (!this.player.dailyQuests) return;
        for (const quest of this.player.dailyQuests) {
            if (quest.claimed || quest.progress >= quest.target) continue;
            if (quest.type !== type) continue;
            quest.progress = Math.min(quest.target, quest.progress + value);
            if (quest.progress >= quest.target) {
                updateGameNotice(`✅ Quest done: "${quest.description}" — claim your reward!`);
            }
        }
    }

    claimQuest(index, updatePlayerStats) {
        const quest = this.player.dailyQuests?.[index];
        if (!quest || quest.claimed || quest.progress < quest.target) return false;
        quest.claimed = true;
        const r = quest.reward;
        if (r.type === 'coins') {
            this.player.money += r.amount;
            updateGameNotice(`💰 Quest reward: +${r.amount} coins!`);
        } else if (r.type === 'xp') {
            this.player.experience += r.amount;
            updateGameNotice(`🌟 Quest reward: +${r.amount} XP!`);
        } else if (r.type === 'prestigePoints') {
            this.player.prestigePoints += r.amount;
            updateGameNotice(`✨ Quest reward: +${r.amount} Prestige Point!`);
        }
        if (updatePlayerStats) updatePlayerStats();
        return true;
    }
}
