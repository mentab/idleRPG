import { updateGameNotice } from './MessageModule.js';

export class StreakModule {
    constructor() {
        this.currentStreak = 0;
        this.miniGameStreak = 0;
    }

    recordWin(player, questModule) {
        this.currentStreak++;

        if (this.currentStreak === 3) {
            updateGameNotice(`🔥 Win streak x3! +10% bonus coins!`);
        } else if (this.currentStreak === 5) {
            updateGameNotice(`🔥🔥 Win streak x5! +20% bonus XP!`);
            if (questModule) questModule.trackEvent('streak5', 1);
        } else if (this.currentStreak === 10) {
            if (player.relicsOwned?.includes('unstoppable')) {
                updateGameNotice(`🔥🔥🔥 Unstoppable! x10 streak — free loot drop!`);
            } else {
                updateGameNotice(`🔥🔥🔥 Win streak x10! Legendary!`);
            }
        } else if (this.currentStreak > 1) {
            updateGameNotice(`🔥 Win streak x${this.currentStreak}!`);
        }
    }

    recordLoss() {
        if (this.currentStreak >= 3) {
            updateGameNotice(`💔 Streak broken at x${this.currentStreak}!`);
        }
        this.currentStreak = 0;
    }

    recordMiniGameScore(score, questModule) {
        if (score >= 80) {
            this.miniGameStreak++;
            if (this.miniGameStreak >= 3) {
                updateGameNotice(`🔥 On Fire! ${this.miniGameStreak} perfect mini-games in a row!`);
            }
            if (questModule) questModule.trackEvent('miniGameScore80', 1);
        } else {
            this.miniGameStreak = 0;
        }
    }

    getCoinBonus(player) {
        if (this.currentStreak < 3) return 0;
        const base = 0.10;
        return player.relicsOwned?.includes('blood_taste') ? base * 2 : base;
    }

    getXPBonus(player) {
        if (this.currentStreak < 5) return 0;
        const base = 0.20;
        return player.relicsOwned?.includes('blood_taste') ? base * 2 : base;
    }

    shouldDropFreeLoot(player) {
        return player.relicsOwned?.includes('unstoppable') && this.currentStreak > 0 && this.currentStreak % 10 === 0;
    }
}
