export function getItemValue(item) {
    const { type, stat, level, improvementLevel  } = item;

    if (type === "stat") {
        switch (stat) {
            case "defense":
            case "damage":
                return (level + improvementLevel) * 10;
            case "precision":
            case "evasion":
                return (level + improvementLevel) * 20;
            case "critical":
            case "resistance":
                return (level + improvementLevel) * 35;
            case "block":
            case "penetration":
                return (level + improvementLevel) * 55;
            case "bonusExp":
            case "bonusLoot":
                return (level + improvementLevel) * 85;
            case "regeneration":
                return (level + improvementLevel) * 120;
            default:
                return 0;
        }
    } else {
        return 0;
    }
}