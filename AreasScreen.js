// AreasScreen.js

class AreasScreen {
	constructor(gameContainer, areas, player, updateGameInfo, updatePlayerStats) {
		this.gameContainer = gameContainer;
		this.areas = areas;
		this.player = player;
		this.updateGameInfo = updateGameInfo;
		this.updatePlayerStats = updatePlayerStats;
	}

	render() {
		// Clear the game container
		this.gameContainer.innerHTML = '';

		// Update game information with the current area
		this.updateGameInfo(`You are currently in ${player.currentArea.name}.`);

		// Create and append area list elements
		const areaList = document.createElement('div');
		areaList.id = 'area-list';

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

		this.gameContainer.appendChild(areaList);
	}
}

export default AreasScreen;