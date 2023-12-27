export function getItemValue(item) {
    const { type, stat, level, improvementLevel  } = item;

    if (type === "stat") {
        switch (stat) {
            case "defense":
            case "damage":
            case "precision":
            case "evasion":
                return (level + improvementLevel) * 20;
            case "critical":
            case "resistance":
                return (level + improvementLevel) * 10;
            case "bonusExp":
            case "bonusLoot":
                return (level + improvementLevel) * 50;
            case "regeneration":
                return (level + improvementLevel) * 100;
            default:
                return 0;
        }
    } else {
        return 0;
    }
}