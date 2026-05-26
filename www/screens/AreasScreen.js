// AreasScreen.js

import { updateGameNotice } from '../modules/MessageModule.js';
import gameConfig from './../config/gameConfig.js';

class AreasScreen {
	constructor(player, updatePlayerStats) {
		this.player = player;
		this.updatePlayerStats = updatePlayerStats;
	}

	render() {
		const { icon, name } = gameConfig.areas[this.player.areaIndex];

		updateGameNotice(`You are currently in ${name} ${icon}.`);

		const areaList = document.getElementById("area-list");
		areaList.innerHTML = "";

		gameConfig.areas.forEach((area, index) => {
			const { icon, name } = area;
			const minLevelRequired = index * 10;

			const areaElement = document.createElement('div');

			const areaName = document.createElement('div');
			areaName.innerHTML = `${icon}<br/><strong>${name}</strong>`;
			areaElement.appendChild(areaName);

			const minLevelDisplay = minLevelRequired === 0 ? 1 : minLevelRequired;
			const travelInfo = document.createElement('div');
			travelInfo.innerHTML = `<small><em>Min Level: </em><strong>${minLevelDisplay}</strong></small>`;
			areaElement.appendChild(travelInfo);

			if (area.modifiers && area.modifiers.length > 0) {
				const modEl = document.createElement('div');
				modEl.innerHTML = `<small class="area-modifier">⚠️ Enemies: ${area.modifiers.map(m => m.label).join(', ')}</small>`;
				areaElement.appendChild(modEl);
			}

			if (this.player.areaIndex === index) {
				const travelInfo = document.createElement('div');
			    travelInfo.innerHTML = `<small><em><strong>You are here</strong></em></small>`;
			    areaElement.appendChild(travelInfo);
			} else if (this.player.level >= minLevelRequired) {
				const areaButton = document.createElement('button');
				areaButton.textContent = `Travel`;
				areaButton.addEventListener('click', () => this.travelToArea(area, index));
				areaElement.appendChild(areaButton);
			} else {
				const lockedText = document.createElement('small');
				lockedText.innerHTML = `🔒 Requires level <strong>${minLevelDisplay}</strong>`;
				areaElement.appendChild(lockedText);
			}

			areaList.appendChild(areaElement);
		});
	}

	travelToArea(area, index) {
		const { icon, name, description, modifiers } = area;
		this.player.areaIndex = index;
		updateGameNotice(`Traveled to ${name} ${icon}.`);
		if (modifiers && modifiers.length > 0) {
			updateGameNotice(`⚠️ Area hazard — enemies here have: ${modifiers.map(m => m.label).join(', ')}`);
		}
		this.updatePlayerStats();
		this.render();
	}
}

export default AreasScreen;