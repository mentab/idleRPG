// Converts mini-game raw results into combat buffs / debuffs for the next fight(s).

const COMBAT_STATS = ['damage', 'precision', 'defense', 'evasion'];

/**
 * @param {number|boolean} rawResult
 * @returns {number} 0–100
 */
export function normalizeMiniGameScore(rawResult) {
	if (typeof rawResult === 'boolean') {
		return rawResult ? 85 : 20;
	}

	if (typeof rawResult !== 'number' || Number.isNaN(rawResult)) {
		return 50;
	}

	// Clicker game returns click count (typically 0–30 in 3s)
	if (rawResult > 100) {
		return Math.min(100, Math.round(rawResult * 5));
	}

	return Math.max(0, Math.min(100, Math.round(rawResult)));
}

/**
 * @param {number} score 0–100
 * @returns {{ type: 'buff'|'debuff', stat: string, percent: number, turns: number, score: number, tier: number }}
 */
export function createCombatModifier(score) {
	const normalized = normalizeMiniGameScore(score);
	let tier;

	if (normalized >= 80) tier = 3;
	else if (normalized >= 55) tier = 2;
	else if (normalized >= 30) tier = 1;
	else tier = 0;

	const stat = COMBAT_STATS[Math.floor(Math.random() * COMBAT_STATS.length)];

	if (tier >= 2) {
		return {
			type: 'buff',
			stat,
			percent: tier === 3 ? 15 : 10,
			turns: tier === 3 ? 3 : 2,
			turnsLeft: tier === 3 ? 3 : 2,
			score: normalized,
			tier,
		};
	}

	return {
		type: 'debuff',
		stat,
		percent: tier === 0 ? 12 : 8,
		turns: tier === 0 ? 2 : 1,
		turnsLeft: tier === 0 ? 2 : 1,
		score: normalized,
		tier,
	};
}

export function describeCombatModifier(modifier) {
	if (!modifier) {
		return 'No mini-game combat modifier.';
	}

	const sign = modifier.type === 'buff' ? '+' : '-';
	const label = modifier.type === 'buff' ? 'Buff' : 'Debuff';

	return `${label}: ${sign}${modifier.percent}% ${modifier.stat} for ${modifier.turns} turn(s) (score ${modifier.score}/100).`;
}

/**
 * Applies active modifier to battle stat copies for one turn; decrements turnsLeft.
 * @returns {string|null} log line for the battle
 */
export function applyCombatModifier(modifier, playerCopy) {
	if (!modifier || modifier.turnsLeft <= 0) {
		return null;
	}

	const stat = modifier.stat;
	const base = playerCopy[stat] ?? 0;
	const factor = modifier.percent / 100;

	if (modifier.type === 'buff') {
		playerCopy[stat] = Math.ceil(base * (1 + factor));
	} else {
		playerCopy[stat] = Math.max(1, Math.floor(base * (1 - factor)));
	}

	modifier.turnsLeft -= 1;

	const emoji = modifier.type === 'buff' ? '✨' : '💀';
	return `${emoji} Mini-game: ${modifier.stat} ${modifier.type === 'buff' ? '+' : '-'}${modifier.percent}% (${modifier.turnsLeft} turn(s) left).`;
}

export function cloneCombatModifier(modifier) {
	if (!modifier || !modifier.stat) return null;
	return { ...modifier, turnsLeft: modifier.turns };
}
