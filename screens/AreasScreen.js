// AreasScreen.js

class AreasScreen {
	constructor(areas, player, updateGameInfo, updatePlayerStats) {
		this.areas = areas;
		this.player = player;
		this.updateGameInfo = updateGameInfo;
		this.updatePlayerStats = updatePlayerStats;
	}

	render() {
		this.updateGameInfo(`You are currently in ${this.player.currentArea.name}.`);

		const areaList = document.getElementById("area-list");
		areaList.innerHTML = "";

		this.areas.forEach((area) => {
			const areaButton = document.createElement('button');
			areaButton.textContent = area.name;
			areaButton.addEventListener('click', () => {
				this.player.currentArea = area;
				this.updateGameInfo(`You have entered the ${area.name}.`);
				this.updateGameInfo(`${area.description}.`);
				this.updatePlayerStats();
			});
			areaList.appendChild(areaButton);
		});
	}
}

export default AreasScreen;