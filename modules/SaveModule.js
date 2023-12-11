export const savePlayerData = (player) => {
    localStorage.setItem("playerData", JSON.stringify(player));
    alert("Player data saved!");
}

export const loadPlayerData = (player) => {
    const savedData = localStorage.getItem("playerData");
    if (savedData) {
        Object.assign(player, JSON.parse(savedData));
        alert("Player data loaded!");
    } else {
        alert("No saved data found!");
    }
}

export const resetPlayerData = () => {
    localStorage.removeItem("playerData");
    location.reload();
}