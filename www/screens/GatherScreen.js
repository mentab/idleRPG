// GatherScreen.js

import gameConfig from './../config/gameConfig.js';
import { updateGameNotice } from '../modules/MessageModule.js';

const GATHER_COOLDOWN = 30; // seconds

class GatherScreen {
	constructor(player, updatePlayerStats, questModule = null) {
		this.player = player;
		this.updatePlayerStats = updatePlayerStats;
		this.questModule = questModule;
		this.cooldowns = new Map(); // areaIndex -> timestamp
		this._timerInterval = null;
	}

	render() {
		const container = document.getElementById("gather-item-list");
		container.innerHTML = '';

		const areaIndex = this.player.areaIndex;
		const area = gameConfig.areas[areaIndex];
		const resources = gameConfig.gatheringItems.filter(i => i.areaIndex === areaIndex);

		if (resources.length === 0) {
			container.innerHTML = '<strong>No resources available here.</strong>';
			return;
		}

		// Resource list display
		const listEl = document.createElement('div');
		listEl.innerHTML = `<small style="opacity:0.5;text-transform:uppercase;letter-spacing:0.05em">Available in ${area.icon} ${area.name}</small>`;
		container.appendChild(listEl);

		for (const res of resources) {
			const tierLabel = res.tier === 1 ? 'Common' : res.tier === 2 ? 'Uncommon' : 'Rare';
			const tierColor = res.tier === 1 ? 'inherit' : res.tier === 2 ? '#4da6ff' : '#c084fc';
			const el = document.createElement('div');
			el.innerHTML = `${res.icon} <strong>${res.name}</strong> <small style="color:${tierColor}">${tierLabel}</small>`;
			container.appendChild(el);
		}

		// Gather button with cooldown
		const lastGather = this.cooldowns.get(areaIndex) ?? 0;
		const elapsed = (Date.now() - lastGather) / 1000;
		const remaining = Math.ceil(GATHER_COOLDOWN - elapsed);
		const onCooldown = remaining > 0;

		const btn = document.createElement('button');
		btn.id = 'gather-btn';
		btn.disabled = onCooldown;
		btn.textContent = onCooldown ? `⏳ ${remaining}s` : '⛏️ Gather';
		btn.addEventListener('click', () => this.gather());
		container.appendChild(btn);

		this._startTimer();
	}

	gather() {
		const areaIndex = this.player.areaIndex;
		const lastGather = this.cooldowns.get(areaIndex) ?? 0;
		const elapsed = (Date.now() - lastGather) / 1000;

		if (elapsed < GATHER_COOLDOWN) {
			updateGameNotice(`Gathering on cooldown (${Math.ceil(GATHER_COOLDOWN - elapsed)}s).`);
			return;
		}

		this.cooldowns.set(areaIndex, Date.now());

		const resources = gameConfig.gatheringItems.filter(i => i.areaIndex === areaIndex);
		if (!resources.length) return;

		// Weighted random pick (1–3 items)
		const totalWeight = resources.reduce((s, r) => s + r.weight, 0);
		const picks = 1 + Math.floor(Math.random() * 3);
		const gained = [];

		for (let i = 0; i < picks; i++) {
			let roll = Math.random() * totalWeight;
			for (const res of resources) {
				roll -= res.weight;
				if (roll <= 0) {
					this.player.inventory.push({ ...res, level: res.tier, improvementLevel: 0 });
					gained.push(res.name);
					break;
				}
			}
		}

		// Group notice
		const summary = gained.reduce((acc, name) => {
			acc[name] = (acc[name] ?? 0) + 1;
			return acc;
		}, {});
		const parts = Object.entries(summary).map(([n, q]) => q > 1 ? `${q}× ${n}` : n);
		updateGameNotice(`Gathered: ${parts.join(', ')}.`);

		if (this.questModule) this.questModule.trackEvent('gatherResource', gained.length);

		this.updatePlayerStats();
		this.render();
	}

	_startTimer() {
		if (this._timerInterval) clearInterval(this._timerInterval);

		this._timerInterval = setInterval(() => {
			const btn = document.getElementById('gather-btn');
			if (!btn) { clearInterval(this._timerInterval); return; }

			const areaIndex = this.player.areaIndex;
			const lastGather = this.cooldowns.get(areaIndex) ?? 0;
			const remaining = Math.ceil(GATHER_COOLDOWN - (Date.now() - lastGather) / 1000);

			if (remaining <= 0) {
				btn.disabled = false;
				btn.textContent = '⛏️ Gather';
				clearInterval(this._timerInterval);
			} else {
				btn.textContent = `⏳ ${remaining}s`;
			}
		}, 500);
	}
}

export default GatherScreen;
