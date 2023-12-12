import { mapToArray, arrayToMap } from "../utils/utils.js";

export const savePlayerData = (player) => {
    const savedPlayer = {
        ...player,
        killedEnemies: mapToArray(player.killedEnemies),
        claimedRewards: mapToArray(player.claimedRewards),
    };

    localStorage.setItem("playerData", JSON.stringify(savedPlayer));
    alert("Player data saved!");
}

export const loadPlayerData = (player) => {
    const savedData = localStorage.getItem("playerData");
    if (savedData) {
        const parsedData = JSON.parse(savedData)

        Object.assign(player, {
            ...parsedData,
            killedEnemies: arrayToMap(parsedData.killedEnemies),
            claimedRewards: arrayToMap(parsedData.claimedRewards)
        });

        alert("Player data loaded!");
    } else {
        alert("No saved data found!");
    }
}

export const resetPlayerData = () => {
    localStorage.removeItem("playerData");
    location.reload();
}