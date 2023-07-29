// AreasScreen.js

import gameConfig from './../config/gameConfig.js';

class AreasScreen {
	constructor(player, updateGameInfo, updatePlayerStats) {
		this.player = player;
		this.updateGameInfo = updateGameInfo;
		this.updatePlayerStats = updatePlayerStats;
	}

	render() {
		const { icon, name } = gameConfig.areas[this.player.areaIndex];

		this.updateGameInfo(`You are currently in ${name} ${icon}.`);

		const areaList = document.getElementById("area-list");
		areaList.innerHTML = "";

		gameConfig.areas.forEach((area, index) => {
			const { icon, name, description } = area;
			const areaButton = document.createElement('button');
			areaButton.textContent = `${name} ${icon}`;
			areaButton.addEventListener('click', () => {
				this.player.areaIndex = index;
				this.updateGameInfo(`You have entered the ${name} ${icon}.`);
				this.updateGameInfo(`${description}.`);
				this.updatePlayerStats();
			});
			areaList.appendChild(areaButton);
		});
	}
}

export default AreasScreen;