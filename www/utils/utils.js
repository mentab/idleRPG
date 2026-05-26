// utils.js

export const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const mapToArray = (map) => Array.from(map.entries());

export const arrayToMap = (array) => new Map(array);

export const wait = (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

export function getRarityClass(level) {
	if (level >= 80) return 'rarity-legendary';
	if (level >= 55) return 'rarity-epic';
	if (level >= 30) return 'rarity-rare';
	return 'rarity-common';
}

export function getRarityLabel(level) {
	if (level >= 80) return '🟡 Legendary';
	if (level >= 55) return '🟣 Epic';
	if (level >= 30) return '🔵 Rare';
	return 'Common';
}

export function getRarityMultiplier(level) {
	if (level >= 80) return 1.5;
	if (level >= 55) return 1.25;
	if (level >= 30) return 1.10;
	return 1.0;
}