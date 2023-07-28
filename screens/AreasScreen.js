// AreasScreen.js

import gameConfig from './../config/gameConfig.js';

class AreasScreen {
	constructor(player, updateGameInfo, updatePlayerStats) {
		this.player = player;
		this.updateGameInfo = updateGameInfo;
		this.updatePlayerStats = updatePlayerStats;
	}

	render() {
		this.updateGameInfo(`You are currently in ${gameConfig.areas[this.player.areaIndex].name}.`);

		const areaList = document.getElementById("area-list");
		areaList.innerHTML = "";

		gameConfig.areas.forEach((area, index) => {
			const areaButton = document.createElement('button');
			areaButton.textContent = area.name;
			areaButton.addEventListener('click', () => {
				this.player.areaIndex = index;
				this.updateGameInfo(`You have entered the ${area.name}.`);
				this.updateGameInfo(`${area.description}.`);
				this.updatePlayerStats();
			});
			areaList.appendChild(areaButton);
		});
	}
}

export default AreasScreen;