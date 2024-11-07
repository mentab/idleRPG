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

			const travelInfo = document.createElement('div');
			travelInfo.innerHTML = `<small><em>Min Level: </em><strong>${minLevelRequired}</strong>`;
			areaElement.appendChild(travelInfo);

			if (this.player.areaIndex === index) {
				const travelInfo = document.createElement('div');
			    travelInfo.innerHTML = `<small><em><strong>You are here</strong></em></small>`;
			    areaElement.appendChild(travelInfo);
			} else if (this.player.level >= minLevelRequired) {
				const areaButton = document.createElement('button');
				areaButton.textContent = `Travel`;
				areaButton.addEventListener('click', () => this.travelToArea(area, index));
				areaElement.appendChild(areaButton);
			}

			areaList.appendChild(areaElement);
		});
	}

	travelToArea(area, index) {
		const { icon, name, description } = area
		this.player.areaIndex = index
        updateGameNotice(`${description}.`)
        this.updatePlayerStats()
		this.render()
	}
}

export default AreasScreen;