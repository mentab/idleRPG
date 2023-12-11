class MainScreen {
	constructor(updateGameInfo, handleScreenButtonClick) {
		this.updateGameInfo = updateGameInfo;
		this.handleScreenButtonClick = handleScreenButtonClick;
	}

	init() {
		document.getElementById("btnExploration").addEventListener("click", () => this.handleScreenButtonClick("btnExploration"));
		document.getElementById("btnChallenge").addEventListener("click", () => this.handleScreenButtonClick("btnChallenge"));
		document.getElementById("btnMission").addEventListener("click", () => this.handleScreenButtonClick("btnMission"));
		document.getElementById("btnDuel").addEventListener("click", () => this.handleScreenButtonClick("btnDuel"));
		document.getElementById("btnAreas").addEventListener("click",() => this.handleScreenButtonClick("btnAreas"));
		document.getElementById("btnStats").addEventListener("click",() => this.handleScreenButtonClick("btnStats"));
		document.getElementById("btnEquipped").addEventListener("click",() => this.handleScreenButtonClick("btnEquipped"));
		document.getElementById("btnAchievements").addEventListener("click",() => this.handleScreenButtonClick("btnAchievements"));
		document.getElementById("btnImprove").addEventListener("click",() => this.handleScreenButtonClick("btnImprove"));
		document.getElementById("btnInventory").addEventListener("click",() => this.handleScreenButtonClick("btnInventory"));
		document.getElementById("btnBuy").addEventListener("click",() => this.handleScreenButtonClick("btnBuy"));
		document.getElementById("btnSell").addEventListener("click",() => this.handleScreenButtonClick("btnSell"));
		document.getElementById("btnGamble").addEventListener("click",() => this.handleScreenButtonClick("btnGamble"));
		document.getElementById("btnHeal").addEventListener("click",() => this.handleScreenButtonClick("btnHeal"));
		document.getElementById("btnExperience").addEventListener("click",() => this.handleScreenButtonClick("btnExperience"));
		document.getElementById("btnMoney").addEventListener("click",() => this.handleScreenButtonClick("btnMoney"));
		document.getElementById("btnSave").addEventListener("click",() => this.handleScreenButtonClick("btnSave"));
		document.getElementById("btnLoad").addEventListener("click",() => this.handleScreenButtonClick("btnLoad"));
		document.getElementById("btnReset").addEventListener("click",() => this.handleScreenButtonClick("btnReset"));
	}

	render() {
		this.updateGameInfo(`Waiting for next action...`);
	}
}

export default MainScreen;