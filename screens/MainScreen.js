class MainScreen {
	constructor(updateGameInfo, handleScreenButtonClick) {
		this.updateGameInfo = updateGameInfo;
		this.handleScreenButtonClick = handleScreenButtonClick;
	}

	addClickListener(id) {
        document.getElementById(id).addEventListener("click", () => this.handleScreenButtonClick((id)));
    }

	init() {
		this.addClickListener("btnExploration");
		this.addClickListener("btnChallenge");
		this.addClickListener("btnMission");
		this.addClickListener("btnDuel");
		this.addClickListener("btnAreas")
		this.addClickListener("btnStats")
		this.addClickListener("btnEquipped")
		this.addClickListener("btnAchievements")
		this.addClickListener("btnImprove")
		this.addClickListener("btnInventory")
		this.addClickListener("btnBuy")
		this.addClickListener("btnSell")
		this.addClickListener("btnGamble")
		this.addClickListener("btnHeal")
		this.addClickListener("btnExperience")
		this.addClickListener("btnMoney")
		this.addClickListener("btnSave")
		this.addClickListener("btnLoad")
		this.addClickListener("btnReset")
	}

	render() {
		this.updateGameInfo(`Waiting for next action...`);
	}
}

export default MainScreen;