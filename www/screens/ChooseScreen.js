import { updateGameNotice } from '../modules/MessageModule.js';

class ChooseScreen {
	constructor(handleScreenButtonClick) {
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
		this.addClickListener("btnSpells")
		this.addClickListener("btnStats")
		this.addClickListener("btnEquipped")
		this.addClickListener("btnAchievements")
		this.addClickListener("btnGather")
		this.addClickListener("btnCraft")
		this.addClickListener("btnImprove")
		this.addClickListener("btnInventory")
		this.addClickListener("btnShop")
		this.addClickListener("btnGamble")
		this.addClickListener("btnHeal")
		this.addClickListener("btnSave")
		this.addClickListener("btnLoad")
		this.addClickListener("btnReset")
		this.addClickListener("btnRelics")
		this.addClickListener("btnContracts")
		this.addClickListener("btnAscend")
	}

	render() {
		// updateGameNotice(`Waiting for next action...`);
	}
}

export default ChooseScreen;