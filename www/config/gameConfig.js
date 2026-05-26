// GameConfig.js


// @later do multiple files, one for each game

const RELICS = [
    { id: 'iron_will',        icon: '🔩', name: 'Iron Will',         cost: 3, description: '+10% XP from all combat' },
    { id: 'veterans_eye',     icon: '👁️', name: "Veteran's Eye",     cost: 2, description: 'Mini-game buffs last +1 extra turn' },
    { id: 'scavenger',        icon: '🦅', name: 'Scavenger',         cost: 4, description: '+15% item loot drop chance' },
    { id: 'lucky_strike',     icon: '⚡', name: 'Lucky Strike',      cost: 5, description: 'Critical hits deal 3× damage instead of 2×' },
    { id: 'challengers_mark', icon: '👑', name: "Challenger's Mark", cost: 3, description: 'Boss fights award 2× XP' },
    { id: 'gold_rush',        icon: '💰', name: 'Gold Rush',         cost: 4, description: '+20% coins from all battles' },
    { id: 'survivors_grit',   icon: '💪', name: "Survivor's Grit",   cost: 3, description: 'Heal 10% max HP after every victory' },
    { id: 'battle_hardened',  icon: '🛡️', name: 'Battle Hardened',  cost: 5, description: '+5 flat bonus to damage and defense in combat' },
    { id: 'blood_taste',      icon: '🩸', name: 'Blood Taste',       cost: 2, description: 'Win streak bonuses (coins/XP) are doubled' },
    { id: 'unstoppable',      icon: '🔥', name: 'Unstoppable',       cost: 6, description: 'Every 10-win streak grants a free item drop' },
];

const QUEST_POOL = [
    { id: 'q_exploration',   description: 'Win 5 Exploration battles',        type: 'explorationWin',  target: 5,   reward: { type: 'coins',         amount: 100 } },
    { id: 'q_minigame80',    description: 'Score ≥80 on a mini-game',         type: 'miniGameScore80', target: 1,   reward: { type: 'coins',         amount: 80  } },
    { id: 'q_no_flee',       description: 'Win 3 battles without fleeing',    type: 'winNoFlee',       target: 3,   reward: { type: 'xp',            amount: 200 } },
    { id: 'q_boss',          description: 'Defeat a Boss',                    type: 'challengeWin',   target: 1,   reward: { type: 'coins',         amount: 150 } },
    { id: 'q_duels',         description: 'Win 3 Duels',                      type: 'duelWin',         target: 3,   reward: { type: 'xp',            amount: 300 } },
    { id: 'q_streak5',       description: 'Reach a 5-win streak',             type: 'streak5',         target: 1,   reward: { type: 'coins',         amount: 200 } },
    { id: 'q_mission',       description: 'Complete a Mission',               type: 'missionWin',      target: 1,   reward: { type: 'xp',            amount: 250 } },
    { id: 'q_loot',          description: 'Pick up 2 items from combat',      type: 'lootDrop',        target: 2,   reward: { type: 'coins',         amount: 120 } },
    { id: 'q_any10',         description: 'Win 10 battles of any type',       type: 'anyWin',          target: 10,  reward: { type: 'xp',            amount: 400 } },
    { id: 'q_shop',          description: 'Spend 100 coins at the shop',      type: 'shopSpend',       target: 100, reward: { type: 'prestigePoints', amount: 1  } },
    { id: 'q_minigame80_3',  description: 'Score ≥80 on 3 mini-games',        type: 'miniGameScore80', target: 3,   reward: { type: 'xp',            amount: 300 } },
    { id: 'q_exploration10', description: 'Win 10 Exploration battles',       type: 'explorationWin',  target: 10,  reward: { type: 'coins',         amount: 200 } },
];
const CRAFT_RECIPES = [
    // Area 0 — Shimmering Meadows
    { id: 'craft_meadow_def',  areaIndex: 0, name: 'Meadow Guard',     icon: '🌿🛡️', stat: 'defense',     level: 9,
      ingredients: [{ name: 'Healing Herb', qty: 5 }, { name: 'Green Leaf', qty: 4 }, { name: 'Morning Dew', qty: 1 }] },
    { id: 'craft_meadow_dmg',  areaIndex: 0, name: 'Meadow Shiv',      icon: '🌼🔪',  stat: 'damage',      level: 9,
      ingredients: [{ name: 'Green Leaf', qty: 5 }, { name: 'Shimmering Petals', qty: 3 }, { name: 'Dandelion Fluff', qty: 1 }] },
    { id: 'craft_meadow_crit', areaIndex: 0, name: 'Nature Band',      icon: '🍀💍',  stat: 'critical',    level: 8,
      ingredients: [{ name: 'Healing Herb', qty: 4 }, { name: 'Glowing Fungus', qty: 3 }, { name: 'Dandelion Fluff', qty: 2 }] },
    // Area 1 — Whispering Forest
    { id: 'craft_forest_def',  areaIndex: 1, name: 'Thornweave Guard', icon: '🌿🧥',  stat: 'defense',     level: 19,
      ingredients: [{ name: 'Enchanted Moss', qty: 5 }, { name: 'Mystic Mushroom', qty: 4 }, { name: 'Silverleaf', qty: 2 }] },
    { id: 'craft_forest_dmg',  areaIndex: 1, name: 'Moonbark Blade',   icon: '🌕🏏',  stat: 'damage',      level: 19,
      ingredients: [{ name: 'Mystic Mushroom', qty: 5 }, { name: 'Gleaming Stones', qty: 3 }, { name: 'Silverleaf', qty: 2 }] },
    { id: 'craft_forest_eva',  areaIndex: 1, name: 'Starleaf Trinket', icon: '✨🔮',  stat: 'evasion',     level: 18,
      ingredients: [{ name: 'Soothing Berries', qty: 5 }, { name: 'Gleaming Stones', qty: 3 }, { name: 'Golden Petals', qty: 2 }] },
    // Area 2 — Crystal Caverns
    { id: 'craft_crystal_def', areaIndex: 2, name: 'Crystal Mail',     icon: '💎🛡️', stat: 'defense',     level: 29,
      ingredients: [{ name: 'Twilight Berries', qty: 5 }, { name: 'Starlight Mushroom', qty: 4 }, { name: 'Serpent Scale', qty: 2 }] },
    { id: 'craft_crystal_dmg', areaIndex: 2, name: 'Crystal Edge',     icon: '💎🔪',  stat: 'damage',      level: 29,
      ingredients: [{ name: 'Starlight Mushroom', qty: 5 }, { name: "Dragon's Tongue", qty: 4 }, { name: 'Serpent Scale', qty: 2 }] },
    { id: 'craft_crystal_pre', areaIndex: 2, name: 'Crystal Focus',    icon: '💎🧤',  stat: 'precision',   level: 28,
      ingredients: [{ name: 'Twilight Berries', qty: 4 }, { name: 'Moonlight Orchid', qty: 3 }, { name: "Dragon's Tongue", qty: 2 }] },
    // Area 3 — Crimson Citadel
    { id: 'craft_crimson_def', areaIndex: 3, name: 'Hellfire Plate',   icon: '🔥🛡️', stat: 'defense',     level: 39,
      ingredients: [{ name: 'Moonflower', qty: 5 }, { name: 'Ghost Orchid', qty: 4 }, { name: 'Dragonfire Bloom', qty: 2 }] },
    { id: 'craft_crimson_dmg', areaIndex: 3, name: 'Crimson Blade',    icon: '🩸⚔️',  stat: 'damage',      level: 39,
      ingredients: [{ name: 'Ghost Orchid', qty: 5 }, { name: 'Nightshade Berry', qty: 4 }, { name: 'Dragonfire Bloom', qty: 2 }] },
    { id: 'craft_crimson_crit',areaIndex: 3, name: 'Blood Ring',       icon: '🩸💍',  stat: 'critical',    level: 38,
      ingredients: [{ name: 'Moonflower', qty: 4 }, { name: 'Nightshade Berry', qty: 3 }, { name: 'Dragonfire Bloom', qty: 2 }] },
    // Area 4 — Stormy Peaks
    { id: 'craft_stormy_def',  areaIndex: 4, name: 'Stormweave Mail',  icon: '⛈️🧥',  stat: 'defense',     level: 49,
      ingredients: [{ name: "Basilisk's Breath", qty: 5 }, { name: 'Basilisk Scale', qty: 4 }, { name: 'Venomous Petal', qty: 2 }] },
    { id: 'craft_stormy_dmg',  areaIndex: 4, name: 'Thunderfang',      icon: '⚡🔪',  stat: 'damage',      level: 49,
      ingredients: [{ name: 'Basilisk Scale', qty: 5 }, { name: "Basilisk's Breath", qty: 4 }, { name: 'Venomous Petal', qty: 2 }] },
    { id: 'craft_stormy_eva',  areaIndex: 4, name: 'Windveil Trinket', icon: '🌪️🔮',  stat: 'evasion',     level: 48,
      ingredients: [{ name: "Basilisk's Breath", qty: 4 }, { name: 'Basilisk Scale', qty: 3 }, { name: 'Venomous Petal', qty: 2 }] },
    // Area 5 — Lost Catacombs
    { id: 'craft_lost_def',    areaIndex: 5, name: 'Crypt Shroud',     icon: '⚰️🧥',  stat: 'defense',     level: 59,
      ingredients: [{ name: 'Phoenix Feather', qty: 5 }, { name: 'Phoenix Ash', qty: 4 }, { name: "Witch's Thistle", qty: 2 }] },
    { id: 'craft_lost_dmg',    areaIndex: 5, name: 'Shadow Fang',      icon: '👤🔪',  stat: 'damage',      level: 59,
      ingredients: [{ name: 'Phoenix Ash', qty: 5 }, { name: 'Phoenix Feather', qty: 4 }, { name: "Witch's Thistle", qty: 2 }] },
    { id: 'craft_lost_crit',   areaIndex: 5, name: 'Shadow Loop',      icon: '🌑☠️',  stat: 'critical',    level: 58,
      ingredients: [{ name: 'Phoenix Feather', qty: 4 }, { name: 'Phoenix Ash', qty: 3 }, { name: "Witch's Thistle", qty: 2 }] },
    // Area 6 — Celestial Observatory
    { id: 'craft_celest_def',  areaIndex: 6, name: 'Starlight Vestment', icon: '✨🧥',  stat: 'defense',     level: 69,
      ingredients: [{ name: 'Enchanted Vines', qty: 6 }, { name: 'Arcane Essence', qty: 4 }] },
    { id: 'craft_celest_dmg',  areaIndex: 6, name: 'Celestial Blade',   icon: '🌌⚔️',  stat: 'damage',      level: 69,
      ingredients: [{ name: 'Arcane Essence', qty: 6 }, { name: 'Enchanted Vines', qty: 4 }] },
    { id: 'craft_celest_pen',  areaIndex: 6, name: 'Oracle Amulet',     icon: '🌌✨',  stat: 'penetration', level: 68,
      ingredients: [{ name: 'Enchanted Vines', qty: 5 }, { name: 'Arcane Essence', qty: 4 }] },
    // Area 7 — Frozen Tundra
    { id: 'craft_frozen_def',  areaIndex: 7, name: 'Frost Guard',     icon: '❄️🛡️', stat: 'defense',     level: 79,
      ingredients: [{ name: 'Eternal Blossom', qty: 6 }, { name: 'Celestial Petal', qty: 4 }] },
    { id: 'craft_frozen_dmg',  areaIndex: 7, name: 'Blizzard Edge',   icon: '❄️⚔️',  stat: 'damage',      level: 79,
      ingredients: [{ name: 'Celestial Petal', qty: 6 }, { name: 'Eternal Blossom', qty: 4 }] },
    { id: 'craft_frozen_blk',  areaIndex: 7, name: 'Tundra Shield',   icon: '❄️🔰',  stat: 'block',       level: 78,
      ingredients: [{ name: 'Eternal Blossom', qty: 5 }, { name: 'Celestial Petal', qty: 4 }] },
    // Area 8 — Volcanic Depths
    { id: 'craft_volcanic_def',areaIndex: 8, name: 'Magma Plate',     icon: '🌋🛡️', stat: 'defense',     level: 89,
      ingredients: [{ name: 'Starfire Crystal', qty: 6 }, { name: 'Moonlight Essence', qty: 4 }] },
    { id: 'craft_volcanic_dmg',areaIndex: 8, name: 'Ember Sword',     icon: '🔥⚔️',  stat: 'damage',      level: 89,
      ingredients: [{ name: 'Moonlight Essence', qty: 6 }, { name: 'Starfire Crystal', qty: 4 }] },
    { id: 'craft_volcanic_crit',areaIndex:8, name: 'Magma Ring',      icon: '🌋💍',  stat: 'critical',    level: 88,
      ingredients: [{ name: 'Starfire Crystal', qty: 5 }, { name: 'Moonlight Essence', qty: 4 }] },
    // Area 9 — Cursed Catacombs
    { id: 'craft_cursed_def',  areaIndex: 9, name: 'Undying Shroud',  icon: '☠️🧥',  stat: 'defense',     level: 99,
      ingredients: [{ name: 'Starfire Crystal', qty: 8 }, { name: 'Moonlight Essence', qty: 6 }] },
    { id: 'craft_cursed_dmg',  areaIndex: 9, name: 'Cursed Reaper',   icon: '💀⚔️',  stat: 'damage',      level: 99,
      ingredients: [{ name: 'Moonlight Essence', qty: 8 }, { name: 'Starfire Crystal', qty: 6 }] },
    { id: 'craft_cursed_res',  areaIndex: 9, name: 'Soul Seal',       icon: '🌑🧣',  stat: 'resistance',  level: 98,
      ingredients: [{ name: 'Starfire Crystal', qty: 6 }, { name: 'Moonlight Essence', qty: 6 }] },
];

const gameHash = window.location.hash.slice(1);
const game = gameHash || 'fantasyClickerBattles';

const levelUpRequirements = [
	{ level: 2, experience: 100 },
	{ level: 3, experience: 300 },
	{ level: 4, experience: 600 },
	{ level: 5, experience: 1000 },
	{ level: 6, experience: 1500 },
	{ level: 7, experience: 2100 },
	{ level: 8, experience: 2800 },
	{ level: 9, experience: 3600 },
	{ level: 10, experience: 4500 },
	{ level: 11, experience: 5500 },
	{ level: 12, experience: 6600 },
	{ level: 13, experience: 7800 },
	{ level: 14, experience: 9100 },
	{ level: 15, experience: 10500 },
	{ level: 16, experience: 12000 },
	{ level: 17, experience: 13600 },
	{ level: 18, experience: 15300 },
	{ level: 19, experience: 17100 },
	{ level: 20, experience: 19000 },
	{ level: 21, experience: 21000 },
	{ level: 22, experience: 23100 },
	{ level: 23, experience: 25300 },
	{ level: 24, experience: 27600 },
	{ level: 25, experience: 30000 },
	{ level: 26, experience: 32500 },
	{ level: 27, experience: 35100 },
	{ level: 28, experience: 37800 },
	{ level: 29, experience: 40600 },
	{ level: 30, experience: 43500 },
	{ level: 31, experience: 46500 },
	{ level: 32, experience: 49600 },
	{ level: 33, experience: 52800 },
	{ level: 34, experience: 56100 },
	{ level: 35, experience: 59500 },
	{ level: 36, experience: 63000 },
	{ level: 37, experience: 66600 },
	{ level: 38, experience: 70300 },
	{ level: 39, experience: 74100 },
	{ level: 40, experience: 78000 },
	{ level: 41, experience: 82000 },
	{ level: 42, experience: 86100 },
	{ level: 43, experience: 90300 },
	{ level: 44, experience: 94600 },
	{ level: 45, experience: 99000 },
	{ level: 46, experience: 103500 },
	{ level: 47, experience: 108100 },
	{ level: 48, experience: 112800 },
	{ level: 49, experience: 117600 },
	{ level: 50, experience: 122500 },
	{ level: 51, experience: 127500 },
	{ level: 52, experience: 132600 },
	{ level: 53, experience: 137800 },
	{ level: 54, experience: 143100 },
	{ level: 55, experience: 148500 },
	{ level: 56, experience: 154000 },
	{ level: 57, experience: 159600 },
	{ level: 58, experience: 165300 },
	{ level: 59, experience: 171100 },
	{ level: 60, experience: 177000 },
	{ level: 61, experience: 183000 },
	{ level: 62, experience: 189100 },
	{ level: 63, experience: 195300 },
	{ level: 64, experience: 201600 },
	{ level: 65, experience: 208000 },
	{ level: 66, experience: 214500 },
	{ level: 67, experience: 221100 },
	{ level: 68, experience: 227800 },
	{ level: 69, experience: 234600 },
	{ level: 70, experience: 241500 },
	{ level: 71, experience: 248500 },
	{ level: 72, experience: 255600 },
	{ level: 73, experience: 262800 },
	{ level: 74, experience: 270100 },
	{ level: 75, experience: 277500 },
	{ level: 76, experience: 285000 },
	{ level: 77, experience: 292600 },
	{ level: 78, experience: 300300 },
	{ level: 79, experience: 308100 },
	{ level: 80, experience: 316000 },
	{ level: 81, experience: 324000 },
	{ level: 82, experience: 332100 },
	{ level: 83, experience: 340300 },
	{ level: 84, experience: 348600 },
	{ level: 85, experience: 357000 },
	{ level: 86, experience: 365500 },
	{ level: 87, experience: 374100 },
	{ level: 88, experience: 382800 },
	{ level: 89, experience: 391600 },
	{ level: 90, experience: 400500 },
	{ level: 91, experience: 409500 },
	{ level: 92, experience: 418600 },
	{ level: 93, experience: 427800 },
	{ level: 94, experience: 437100 },
	{ level: 95, experience: 446500 },
	{ level: 96, experience: 456000 },
	{ level: 97, experience: 465600 },
	{ level: 98, experience: 475300 },
	{ level: 99, experience: 485100 },
	{ level: 100, experience: 495000 }
];

const statNames = [
	"damage",
	"defense",
	"precision",
	"evasion",
	"critical",
	"resistance",
	"block",
	"penetration"
];

const config = {
	fantasyClickerBattles: {
		areas: [
			{
				name: "Shimmering Meadows",
				description: "Shimmering Meadows is a picturesque landscape filled with vibrant wildflowers and lush greenery. Crystal-clear streams meander through the meadows, reflecting the sunlight and creating a dazzling display. The air is fresh and fragrant, carrying the scent of blooming flowers. It is a serene and tranquil place, inviting adventurers to explore its natural beauty.",
				icon: "🌼🌿",
				modifiers: [],
			},
			{
				name: "Whispering Forest",
				description: "Whispering Forest is an enchanted realm dominated by towering ancient trees. The dense canopy casts a mesmerizing pattern of light and shadow on the forest floor. Soft whispers seem to emanate from the trees, creating an otherworldly ambiance. The air is cool and crisp, and the ground is covered in a carpet of moss and fallen leaves. It is a place of mystery and magic, where secrets are whispered among the ancient trees.",
				icon: "🌳🍂",
				modifiers: [
					{ stat: 'evasion', bonus: 0.15, label: 'EVA +15%' },
				],
			},
			{
				name: "Crystal Caverns",
				description: "Crystal Caverns is a subterranean wonderland adorned with shimmering crystals of various hues. The cavern walls glisten with an ethereal glow, creating a breathtaking sight. Stalactites and stalagmites form intricate formations, giving the cave an otherworldly appearance. The air is cool and tinged with a hint of mineral scent. It is a place where the beauty of the underground world unfolds, waiting to be discovered.",
				icon: "💎🕳️",
				modifiers: [
					{ stat: 'defense', bonus: 0.20, label: 'DEF +20%' },
				],
			},
			{
				name: "Crimson Citadel",
				description: "Crimson Citadel stands tall amidst a rugged landscape, its imposing architecture evoking a sense of power and mystery. The citadel is adorned with intricate carvings and towering spires that reach for the sky. Fiery torches illuminate the halls, casting dancing shadows. The air is thick with an aura of danger and forbidden knowledge. It is a place of dark allure, where only the boldest dare to venture.",
				icon: "🏰🔥",
				modifiers: [
					{ stat: 'damage', bonus: 0.15, label: 'DMG +15%' },
				],
			},
			{
				name: "Stormy Peaks",
				description: "Stormy Peaks is a realm of towering mountains and relentless storms. Jagged cliffs and rocky terrain create a treacherous landscape. Thunder rumbles through the peaks, accompanied by flashes of lightning that light up the dark sky. Winds howl fiercely, carrying a sense of raw power. It is a place where nature's fury reigns supreme, testing the resilience and bravery of those who dare to conquer it.",
				icon: "🏔️⛈️",
				modifiers: [
					{ stat: 'evasion',   bonus: 0.15, label: 'EVA +15%' },
					{ stat: 'precision', bonus: 0.15, label: 'PRE +15%' },
				],
			},
			{
				name: "Lost Catacombs",
				description: "Lost Catacombs lie hidden beneath the surface, a labyrinthine maze of ancient tunnels and forgotten chambers. Crumbling pillars and eerie statues line the passageways, exuding an aura of decay and mystery. Flickering torches cast long shadows, adding to the sense of foreboding. The air is thick with the scent of dampness and ancient secrets. It is a place where the past lingers, waiting to be unearthed.",
				icon: "⚰️🕯️",
				modifiers: [
					{ stat: 'defense',    bonus: 0.20, label: 'DEF +20%' },
					{ stat: 'resistance', bonus: 0.20, label: 'RES +20%' },
				],
			},
			{
				name: "Celestial Observatory",
				description: "Celestial Observatory is a celestial haven perched atop a high peak. The observatory offers a panoramic view of the star-studded night sky, where constellations twinkle in their eternal dance. Telescopes and instruments stand ready to unravel the mysteries of the cosmos. The air is crisp and tinged with the scent of fresh air and anticipation. It is a place where the wonders of the universe unfold, inviting stargazers and dreamers.",
				icon: "🔭🌌",
				modifiers: [
					{ stat: 'damage',    bonus: 0.15, label: 'DMG +15%' },
					{ stat: 'precision', bonus: 0.15, label: 'PRE +15%' },
				],
			},
			{
				name: "Frozen Tundra",
				description: "Frozen Tundra stretches as far as the eye can see, a frozen wasteland cloaked in eternal winter. Snow-covered plains and icy peaks dominate the landscape, glistening in the pale sunlight. Frosty winds whip through the tundra, biting at exposed skin. The air is filled with a sense of icy solitude and quietude. It is a place of harsh beauty, where survival is a constant battle against the elements.",
				icon: "❄️🏔️",
				modifiers: [
					{ stat: 'defense',    bonus: 0.20, label: 'DEF +20%' },
					{ stat: 'evasion',    bonus: 0.20, label: 'EVA +20%' },
					{ stat: 'resistance', bonus: 0.15, label: 'RES +15%' },
				],
			},
			{
				name: "Volcanic Depths",
				description: "Volcanic Depths is a fiery abyss filled with molten rock and intense heat. Rivers of lava flow through the depths, casting an ominous glow on the jagged rock formations. Sulfurous fumes fill the air, creating an acrid and suffocating atmosphere. Tremors shake the ground, a constant reminder of the volatile nature of the place. It is a realm of searing danger and untamed power, where only the most fearless dare to tread.",
				icon: "🌋🔥",
				modifiers: [
					{ stat: 'damage',      bonus: 0.25, label: 'DMG +25%' },
					{ stat: 'critical',    bonus: 0.20, label: 'CRIT +20%' },
					{ stat: 'penetration', bonus: 0.20, label: 'PEN +20%' },
				],
			},
			{
				name: "Cursed Catacombs",
				description: "Cursed Catacombs hold the remnants of a forgotten civilization, entwined with dark magic and cursed energies. Crumbling tombs and crypts line the underground passages, bearing eerie inscriptions and macabre symbols. Flickering candles barely illuminate the desolate corridors, shrouded in an eternal twilight. The air is heavy with a sense of ancient curses and restless spirits. It is a place where the line between life and death blurs, testing the resolve of intrepid explorers.",
				icon: "⚰️🌙",
				modifiers: [
					{ stat: 'damage',      bonus: 0.20, label: 'DMG +20%' },
					{ stat: 'defense',     bonus: 0.20, label: 'DEF +20%' },
					{ stat: 'evasion',     bonus: 0.20, label: 'EVA +20%' },
					{ stat: 'precision',   bonus: 0.15, label: 'PRE +15%' },
					{ stat: 'critical',    bonus: 0.15, label: 'CRIT +15%' },
				],
			},
		],
		spells: [
	        {
			    id: "spell1",
			    name: "Grace of the Meadow",
			    icon: "🌼",
			    effects: [
			        {
			            stat: "precision",
			            target: "self"
			        }
			    ]
			},
			{
			    id: "spell2",
			    name: "Whispers of the Forest",
			    icon: "🌳",
			    effects: [
			        {
			            stat: "evasion",
			            target: "self"
			        }
			    ]
			},
			{
			    id: "spell3",
			    name: "Crystal Barrage",
			    icon: "💎",
			    effects: [
			        {
			            stat: "evasion",
			            target: "enemy"
			        }
			    ]
			},
			{
			    id: "spell4",
			    name: "Infernal Ward",
			    icon: "🔥",
			    effects: [
			        {
			            stat: "defense",
			            target: "self"
			        }
			    ]
			},
			{
			    id: "spell5",
			    name: "Storm's Embrace",
			    icon: "⛈️",
			    effects: [
			        {
			            stat: "resistance",
			            target: "self"
			        }
			    ]
			},
			{
			    id: "spell6",
			    name: "Curse of the Tomb",
			    icon: "⚰️",
			    effects: [
			        {
			            stat: "resistance",
			            target: "enemy"
			        }
			    ]
			},
			{
			    id: "spell7",
			    name: "Celestial Gaze",
			    icon: "🔭",
			    effects: [
			        {
			            stat: "precision",
			            target: "enemy"
			        }
			    ]
			},
			{
			    id: "spell8",
			    name: "Icebound Strike",
			    icon: "❄️",
			    effects: [
			        {
			            stat: "defense",
			            target: "enemy"
			        }
			    ]
			},
			{
			    id: "spell9",
			    name: "Molten Hex",
			    icon: "🌋",
			    effects: [
			        {
			            stat: "damage",
			            target: "enemy"
			        }
			    ]
			},
			{
			    id: "spell10",
			    name: "Damned Focus",
			    icon: "⚰️",
			    effects: [
			        {
			            stat: "damage",
			            target: "self"
			        }
			    ]
			}
		],
		enemies: [
			// Shimmering Meadows
			{ name: "Luminous Firefly", level: 1, icon: "✨" },
			{ name: "Moonshadow Wolf", level: 2, icon: "🌘🐺" },
			{ name: "Ancient Oakwood", level: 3, icon: "🌳🍂" },
			{ name: "Meadow Wanderer", icon: "🌼🚶", level: 3, type: 'DUELIST' },
			{ name: "Twilight Lynx", level: 4, icon: "🌑🐆" },
			{ name: "Silent Silver Fox", level: 5, icon: "🌌🦊" },
			{ name: "Duskbloom Treant", level: 6, icon: "🌸🌳" },
			{ name: "Sunlit Archer", icon: "☀️🏹", level: 6, type: 'DUELIST' },
			{ name: "Starlight Panther", level: 7, icon: "🌠🐾" },
			{ name: "Lunar Howler", level: 8, icon: "🌙🌳" },
			{ name: "Mystic Deer", level: 9, icon: "🌟🦌" },
			{ name: "Meadow Druid", icon: "🌼🌿", level: 9, type: 'DUELIST' },
			{ name: "Celestial Guardian", level: 10, icon: "🌟🗝️", type: 'BOSS' },
			// Whispering Forest
			{ name: "Dark Druid", level: 11, icon: "🌑🔮" },
			{ name: "Wicked Witch", level: 12, icon: "🧙‍♀️" },
			{ name: "Treant", level: 13, icon: "🌳" },
			{ name: "Forest Scout", icon: "🌳👀", level: 13, type: 'DUELIST' },
			{ name: "Forest Nymph", level: 14, icon: "🍃👻" },
			{ name: "Enraged Bear", level: 15, icon: "🐻" },
			{ name: "Shadow Stalker", level: 16, icon: "🕵️‍♂️🗡️" },
			{ name: "Whispering Ranger", icon: "🌲🏹", level: 16, type: 'DUELIST' },
			{ name: "Druid Shaman", level: 17, icon: "🌿🔮" },
			{ name: "Sylvan Spirit", level: 18, icon: "🌿🌺" },
			{ name: "Forest Guardian", level: 19, icon: "🌳🦉" },
			{ name: "Elven Enchanter", icon: "🧝‍♂️🔮", level: 19, type: 'DUELIST' },
			{ name: "Elder Ent", level: 20, icon: "🍂🌳", type: 'BOSS' },
			// Crystal Caverns
			{ name: "Cave Spider", level: 21, icon: "🕷️" },
			{ name: "Frost Elemental", level: 22, icon: "❄️🌀" },
			{ name: "Crystal Golem", level: 23, icon: "💎🗿" },
			{ name: "Cavern Explorer", icon: "💎🔍", level: 23, type: 'DUELIST' },
			{ name: "Crystal Mage", level: 24, icon: "💎🧙‍♂️" },
			{ name: "Ancient Crystal Guardian", level: 25, icon: "🗝️🌌" },
			{ name: "Spectral Knight", level: 26, icon: "👻⚔️" },
			{ name: "Frost Mage", icon: "❄️🧙‍♂️", level: 26, type: 'DUELIST' },
			{ name: "Frozen Colossus", level: 27, icon: "❄️🗿" },
			{ name: "Crystal Behemoth", level: 28, icon: "💎🐲" },
			{ name: "Frozen Fury", level: 29, icon: "❄️🌪️" },
			{ name: "Crystal Guardian", icon: "💎🛡️", level: 29, type: 'DUELIST' },
			{ name: "Crystal Overlord", level: 30, icon: "💎👑", type: 'BOSS' },
			// Crimson Citadel
			{ name: "Hellfire Imp", level: 31, icon: "🔥👿" },
			{ name: "Infernal Knight", level: 32, icon: "🔥⚔️" },
			{ name: "Lava Elemental", level: 33, icon: "🌋🔥" },
			{ name: "Citadel Knight", icon: "🏰⚔️", level: 33, type: 'DUELIST' },
			{ name: "Death's Shadow", level: 34, icon: "☠️🌑" },
			{ name: "Crimson Succubus", level: 35, icon: "🔥👿🧚‍♀️" },
			{ name: "Molten Golem", level: 36, icon: "🔥💥🗿" },
			{ name: "Fiery Sorceress", icon: "🔥🧙‍♀️", level: 36, type: 'DUELIST' },
			{ name: "Cursed Necromancer", level: 37, icon: "🔥🧟‍♂️" },
			{ name: "Ashen Witch", level: 38, icon: "🔥🧙‍♀️" },
			{ name: "Raging Inferno", level: 39, icon: "🔥🌋" },
			{ name: "Crimson Duelist", icon: "🩸🤺", level: 39, type: 'DUELIST' },
			{ name: "Lord of Flames", level: 40, icon: "🔥👹", type: 'BOSS' },
			// Stormy Peaks
			{ name: "Rock Golem", level: 41, icon: "🗿⛰️" },
			{ name: "Thunderbird", level: 42, icon: "⚡️🐦" },
			{ name: "Storm Shaman", level: 43, icon: "⚡️🧙‍♂️" },
			{ name: "Mountain Climber", icon: "🏔️🧗", level: 43, type: 'DUELIST' },
			{ name: "Mistral Drake", level: 44, icon: "🌬️🐉" },
			{ name: "Yeti", level: 45, icon: "🏔️🦧" },
			{ name: "Whirling Dervish", level: 46, icon: "🌪️🧔" },
			{ name: "Stormcaller", icon: "⛈️🧙‍♂️", level: 46, type: 'DUELIST' },
			{ name: "Frost Giant", level: 47, icon: "🌬️🗿" },
			{ name: "Tornado Elemental", level: 48, icon: "🌪️🌬️" },
			{ name: "Storm Lord", level: 49, icon: "⚡️👑" },
			{ name: "Thunderous Warrior", icon: "⚡⚔️", level: 49, type: 'DUELIST' },
			{ name: "Raging Thunderbird", level: 50, icon: "⚡️🐦", type: 'BOSS' },
			// Lost Catacombs
			{ name: "Skeletal Warrior", level: 51, icon: "💀⚔️" },
			{ name: "Cursed Mummy", level: 52, icon: "🔮🧟‍♂️" },
			{ name: "Ghostly Apparition", level: 53, icon: "👻💀" },
			{ name: "Crypt Explorer", icon: "⚰️🔍", level: 53, type: 'DUELIST' },
			{ name: "Serpentine Cultist", level: 54, icon: "🔮🐍" },
			{ name: "Crypt Lich", level: 55, icon: "💀🔮" },
			{ name: "Shade Assassin", level: 56, icon: "👤🔪" },
			{ name: "Shadowed Rogue", icon: "🕵️‍♂️🌑", level: 56, type: 'DUELIST' },
			{ name: "Ghoul Hound", level: 57, icon: "🐕💀" },
			{ name: "Spectral Sorcerer", level: 58, icon: "🔮🌑" },
			{ name: "Ancient Skeleton", level: 59, icon: "☠️💀" },
			{ name: "Lost Adventurer", icon: "👤🌑", level: 59, type: 'DUELIST' },
			{ name: "Necrotic Lich", level: 60, icon: "💀🔮", type: 'BOSS' },
			// Celestial Observatory
			{ name: "Starlight Sprite", level: 61, icon: "✨🧚" },
			{ name: "Astral Guardian", level: 62, icon: "⭐🦉" },
			{ name: "Lunar Priestess", level: 63, icon: "🌙👸" },
			{ name: "Star Seeker", icon: "🌠🔭", level: 63, type: 'DUELIST' },
			{ name: "Solar Elemental", level: 64, icon: "☀️🔥" },
			{ name: "Nebula Sorcerer", level: 65, icon: "🌌🧙‍♂️" },
			{ name: "Stardust Dragon", level: 66, icon: "✨🐉" },
			{ name: "Cosmic Mage", icon: "🌌🧙‍♂️", level: 66, type: 'DUELIST' },
			{ name: "Cosmic Specter", level: 67, icon: "👤✨" },
			{ name: "Celestial Oracle", level: 68, icon: "⭐🔮" },
			{ name: "Aurora Valkyrie", level: 69, icon: "🌌⚔️" },
			{ name: "Heavenly Guardian", icon: "🌠🛡️", level: 69, type: 'DUELIST' },
			{ name: "Stellar Archangel", level: 70, icon: "⭐👼", type: 'BOSS' },
			// Frozen Tundra
			{ name: "Ice Elemental", level: 71, icon: "🌬️❄️" },
			{ name: "Frost Shaman", level: 72, icon: "❄️🧙‍♂️" },
			{ name: "Glacial Golem", level: 73, icon: "❄️💎🗿" },
			{ name: "Tundra Tracker", icon: "🏔️👣", level: 73, type: 'DUELIST' },
			{ name: "Snow Siren", level: 74, icon: "❄️🧜‍♀️" },
			{ name: "Winter Wolf", level: 75, icon: "❄️🐺" },
			{ name: "Avalanche Yeti", level: 76, icon: "❄️🏔️🦧" },
			{ name: "Frozen Archer", icon: "🌨️🏹", level: 76, type: 'DUELIST' },
			{ name: "Frozen Banshee", level: 77, icon: "❄️👻" },
			{ name: "Blizzard Mage", level: 78, icon: "❄️🧙‍♂️❄️" },
			{ name: "Arctic Drake", level: 79, icon: "❄️🐉" },
			{ name: "Icebound Warrior", icon: "❄️⚔️", level: 79, type: 'DUELIST' },
			{ name: "Glacier Guardian", level: 80, icon: "❄️🏔️🦉", type: 'BOSS' },
			// Volcanic Depths
			{ name: "Magma Elemental", level: 81, icon: "🌋🔥" },
			{ name: "Lava Shaman", level: 82, icon: "🌋🧙‍♂️" },
			{ name: "Infernal Golem", level: 83,  icon: "🌋💎🗿" },
			{ name: "Volcanic Explorer", icon: "🌋🚶", level: 83, type: 'DUELIST' },
			{ name: "Fire Sprite", level: 84, icon: "🔥🧚" },
			{ name: "Volcanic Drake", level: 85, icon: "🌋🐉" },
			{ name: "Obsidian Knight", level: 86, icon: "🌋⚔️" },
			{ name: "Magma Mage", icon: "🔥🧙‍♂️", level: 86, type: 'DUELIST' },
			{ name: "Hellhound", level: 87, icon: "🌋🐕" },
			{ name: "Searing Sorcerer", level: 88, icon: "🌋🧙‍♂️" },
			{ name: "Inferno Demon", level: 89, icon: "🌋👹" },
			{ name: "Volcanic Guardian", icon: "🌋🛡️", level: 89, type: 'DUELIST' },
			{ name: "Eruption Guardian", level: 90, icon: "🌋🏔️🦉", type: 'BOSS' },
			// Cursed Catacombs
			{ name: "Ghoul", level: 91, icon: "☠️🧟‍♂️" },
			{ name: "Shadowcaster", level: 92, icon: "🌑🧙‍♂️" },
			{ name: "Spectral Assassin", level: 93, icon: "🌑🗡️" },
			{ name: "Cursed Seeker", icon: "👁️🔍", level: 93, type: 'DUELIST' },
			{ name: "Cursed Wraith", level: 94, icon: "🌑👻" },
			{ name: "Necrotic Warlock", level: 95, icon: "🌑🔮🧙‍♂️" },
			{ name: "Bone Dragon", level: 96, icon: "☠️🐉" },
			{ name: "Haunted Sorcerer", icon: "👻🧙‍♂️", level: 96, type: 'DUELIST' },
			{ name: "Dark Priest", level: 97, icon: "🌑⚔️🙏" },
			{ name: "Phantom Knight", level: 98, icon: "🌑⚔️👻" },
			{ name: "Deathbringer", level: 99, icon: "🌑👤⚔️" },
			{ name: "Catacomb Guardian", icon: "⚰️🛡️", level: 99, type: 'DUELIST' },
			{ name: "Eternal Lich", level: 100, icon: "🌑💀🔮", type: 'BOSS' },
		],
		itemsList: [
			// Armor items
			{ name: "Cotton Vest", type: "stat", stat: "defense", icon: "👕", level: 5 },
			{ name: "Patched Tunic", type: "stat", stat: "defense", icon: "🎽", level: 10 },
			{ name: "Forest Ranger's Jerkin", type: "stat", stat: "defense", icon: "🛡️", level: 15 },
			{ name: "Thornweave Armor", type: "stat", stat: "defense", icon: "🧥", level: 20 },
			{ name: "Crystal Shard Mail", type: "stat", stat: "defense", icon: "🌟🧥", level: 25 },
			{ name: "Granite Plate", type: "stat", stat: "defense", icon: "🔗", level: 30 },
			{ name: "Bloodsteel Cuirass", type: "stat", stat: "defense", icon: "🐉", level: 35 },
			{ name: "Fiery Battleplate", type: "stat", stat: "defense", icon: "⚙️", level: 40 },
			{ name: "Thunderstorm Armor", type: "stat", stat: "defense", icon: "🏹🛡️", level: 45 },
			{ name: "Tempest Defender", type: "stat", stat: "defense", icon: "📜🧥", level: 50 },
			{ name: "Shadow Cloak", type: "stat", stat: "defense", icon: "🏙️🛡️", level: 55 },
			{ name: "Phantom Shroud", type: "stat", stat: "defense", icon: "🛡️🧥", level: 60 },
			{ name: "Starforged Robes", type: "stat", stat: "defense", icon: "🛡️⚙️", level: 65 },
			{ name: "Celestial Vestments", type: "stat", stat: "defense", icon: "🏹🔗🛡️", level: 70 },
			{ name: "Frostbite Mail", type: "stat", stat: "defense", icon: "🛡️📜🧥", level: 75 },
			{ name: "Arctic Guardian Plate", type: "stat", stat: "defense", icon: "🛡️🎽", level: 80 },
			{ name: "Magma Armor", type: "stat", stat: "defense", icon: "🛡️🛡️", level: 85 },
			{ name: "Inferno Brimstone Mail", type: "stat", stat: "defense", icon: "🛡️🌟🧥", level: 90 },
			{ name: "Haunted Specter Armor", type: "stat", stat: "defense", icon: "🛡️⚙️", level: 95 },
			{ name: "Eternal Warden Plate", type: "stat", stat: "defense", icon: "🛡️🌟🛡️", level: 100 },
			// Weapon items
			{ name: "Meadow Shiv", type: "stat", stat: "damage", icon: "🌿🔪", level: 5 },
			{ name: "Gleaming Wand", type: "stat", stat: "damage", icon: "✨🏁", level: 10 },
			{ name: "Forest Branch", type: "stat", stat: "damage", icon: "🌳🏏", level: 15 },
			{ name: "Enchanted Thorn", type: "stat", stat: "damage", icon: "🌿🌹", level: 20 },
			{ name: "Crystal Shard", type: "stat", stat: "damage", icon: "💎🌾", level: 25 },
			{ name: "Cavern Pickaxe", type: "stat", stat: "damage", icon: "⛏️🪓", level: 30 },
			{ name: "Crimson Flail", type: "stat", stat: "damage", icon: "🌅🔨", level: 35 },
			{ name: "Lava Hammer", type: "stat", stat: "damage", icon: "🔥🔨", level: 40 },
			{ name: "Thunderstrike Sword", type: "stat", stat: "damage", icon: "⚡⚔️", level: 45 },
			{ name: "Avalanche Axe", type: "stat", stat: "damage", icon: "🏔️🪓", level: 50 },
			{ name: "Crypt Stalker", type: "stat", stat: "damage", icon: "🏛️⚔️", level: 55 },
			{ name: "Bonecleaver", type: "stat", stat: "damage", icon: "💀🪓", level: 60 },
			{ name: "Starfall Scythe", type: "stat", stat: "damage", icon: "✨🌟", level: 65 },
			{ name: "Galactic Rapier", type: "stat", stat: "damage", icon: "🌌🤺", level: 70 },
			{ name: "Icicle Spear", type: "stat", stat: "damage", icon: "❄️🌿", level: 75 },
			{ name: "Blizzard Blade", type: "stat", stat: "damage", icon: "❄️⚔️", level: 80 },
			{ name: "Magma Maul", type: "stat", stat: "damage", icon: "🔥🌋", level: 85 },
			{ name: "Emberbrand Sword", type: "stat", stat: "damage", icon: "🔥⚔️", level: 90 },
			{ name: "Spectral Scythe", type: "stat", stat: "damage", icon: "👻✨", level: 95 },
			{ name: "Dreadbane Greatsword", type: "stat", stat: "damage", icon: "💀⚔️🏰", level: 100 },
			// Soulstones items
			{ name: "Soulstone of Awakening", type: "stat", stat: "regeneration", icon: "🌅", level: 34 },
			{ name: "Soulstone of Revival", type: "stat", stat: "regeneration", icon: "⏰", level: 64 },
			{ name: "Soulstone of Ascendance", type: "stat", stat: "regeneration", icon: "✨", level: 94 },
			// Gloves items
			{ name: "Meadowgrasp Gloves", type: "stat", stat: "precision", icon: "🌿🧤", level: 6 },
			{ name: "Whisperwind Gloves", type: "stat", stat: "precision", icon: "🍃🧤", level: 16 },
			{ name: "Crystalweave Gloves", type: "stat", stat: "precision", icon: "💎🧤", level: 26 },
			{ name: "Crimsonclasp Gloves", type: "stat", stat: "precision", icon: "🔥🧤", level: 36 },
			{ name: "Stormtalon Gloves", type: "stat", stat: "precision", icon: "⛈️🧤", level: 46 },
			{ name: "Shadowcrawl Gloves", type: "stat", stat: "precision", icon: "🌑🧤", level: 56 },
			{ name: "Stargazer Gloves", type: "stat", stat: "precision", icon: "✨🧤", level: 66 },
			{ name: "Frostbitten Gloves", type: "stat", stat: "precision", icon: "❄️🧤", level: 76 },
			{ name: "Volcanogrip Gloves", type: "stat", stat: "precision", icon: "🌋🧤", level: 86 },
			{ name: "Soulcurse Gloves", type: "stat", stat: "precision", icon: "💀🧤", level: 96 },
			// Trinkets items
			{ name: "Meadowspark Trinket", type: "stat", stat: "evasion", icon: "🌿🔮", level: 6 },
			{ name: "Whisperbloom Trinket", type: "stat", stat: "evasion", icon: "🍃🔮", level: 16 },
			{ name: "Crystalglow Trinket", type: "stat", stat: "evasion", icon: "💎🔮", level: 26 },
			{ name: "Crimsonwhisper Trinket", type: "stat", stat: "evasion", icon: "🔥🔮", level: 36 },
			{ name: "Stormshade Trinket", type: "stat", stat: "evasion", icon: "⛈️🔮", level: 46 },
			{ name: "Shadowweave Trinket", type: "stat", stat: "evasion", icon: "🌑🔮", level: 56 },
			{ name: "Starglaze Trinket", type: "stat", stat: "evasion", icon: "✨🔮", level: 66 },
			{ name: "Frostfall Trinket", type: "stat", stat: "evasion", icon: "❄️🔮", level: 76 },
			{ name: "Volcanodream Trinket", type: "stat", stat: "evasion", icon: "🌋🔮", level: 86 },
			{ name: "Soulflare Trinket", type: "stat", stat: "evasion", icon: "💀🔮", level: 96 },
			// Ring items
			{ name: "Meadowband", type: "stat", stat: "critical", icon: "🌿💍", level: 5 },
			{ name: "Whisperspark Ring", type: "stat", stat: "critical", icon: "🍃✨", level: 15 },
			{ name: "Crystalstrike Band", type: "stat", stat: "critical", icon: "💎🔪", level: 25 },
			{ name: "Crimson Edge Ring", type: "stat", stat: "critical", icon: "🔥💥", level: 35 },
			{ name: "Stormblade Ring", type: "stat", stat: "critical", icon: "⛈️🗡️", level: 45 },
			{ name: "Shadowbane Loop", type: "stat", stat: "critical", icon: "🌑☠️", level: 55 },
			{ name: "Stardance Ring", type: "stat", stat: "critical", icon: "✨🔥", level: 65 },
			{ name: "Frostmark Band", type: "stat", stat: "critical", icon: "❄️🎯", level: 75 },
			{ name: "Volcano Fury Ring", type: "stat", stat: "critical", icon: "🌋⚔️", level: 85 },
			{ name: "Soulstorm Ring", type: "stat", stat: "critical", icon: "💀🌪️", level: 95 },
			// Cloak items
			{ name: "Meadow Breeze Cape", type: "stat", stat: "resistance", icon: "🌿🧣", level: 5 },
			{ name: "Whispering Shadows Cloak", type: "stat", stat: "resistance", icon: "🌑🧥", level: 15 },
			{ name: "Crystal Shard Cloak", type: "stat", stat: "resistance", icon: "💎🧣", level: 25 },
			{ name: "Crimson Ember Cape", type: "stat", stat: "resistance", icon: "🔥🧥", level: 35 },
			{ name: "Stormrider Cloak", type: "stat", stat: "resistance", icon: "⛈️🧣", level: 45 },
			{ name: "Catacomb Dweller Cape", type: "stat", stat: "resistance", icon: "💀🧥", level: 55 },
			{ name: "Celestial Gazer Cloak", type: "stat", stat: "resistance", icon: "🌌🔭", level: 65 },
			{ name: "Frostbound Tabard", type: "stat", stat: "resistance", icon: "❄️🛡️", level: 75 },
			{ name: "Volcanic Eruption Cape", type: "stat", stat: "resistance", icon: "🌋🧣", level: 85 },
			{ name: "Cursed Souls Cloak", type: "stat", stat: "resistance", icon: "👻🧥", level: 95 },
			// Necklace items
			{ name: "Necklace of Fortune", type: "stat", stat: "bonusLoot", icon: "🔮", level: 24 },
			{ name: "Necklace of Prosperity", type: "stat", stat: "bonusLoot", icon: "💰", level: 44 },
			{ name: "Necklace of Serendipity", type: "stat", stat: "bonusLoot", icon: "🍀", level: 64 },
			{ name: "Necklace of Abundance", type: "stat", stat: "bonusLoot", icon: "🌟", level: 84 },
			// Charm items
			{ name: "Charm of Wisdom", type: "stat", stat: "bonusExp", icon: "📚", level: 46 },
			{ name: "Charm of Enlightenment", type: "stat", stat: "bonusExp", icon: "🌟", level: 56 },
			{ name: "Charm of Insight", type: "stat", stat: "bonusExp", icon: "🔍", level: 66 },
			{ name: "Charm of Mastery", type: "stat", stat: "bonusExp", icon: "🎓", level: 76 },
			{ name: "Charm of Ascendancy", type: "stat", stat: "bonusExp", icon: "⚡", level: 86 },
			// Belt items // @todo implement
			// { name: "Peasant's Belt", type: "stat", stat: "bonusHP", icon: "👑", level: 7 },
			// { name: "Forest Dweller Belt", type: "stat", stat: "bonusHP", icon: "🌳", level: 17 },
			// { name: "Cave Explorer Belt", type: "stat", stat: "bonusHP", icon: "💎", level: 27 },
			// { name: "Crimson Guard Belt", type: "stat", stat: "bonusHP", icon: "🏰", level: 37 },
			// { name: "Storm Chaser Belt", type: "stat", stat: "bonusHP", icon: "⛈️", level: 47 },
			// { name: "Catacomb Explorer Belt", type: "stat", stat: "bonusHP", icon: "🌑", level: 57 },
			// { name: "Stargazer Belt", type: "stat", stat: "bonusHP", icon: "🔭", level: 67 },
			// { name: "Tundra Traveler Belt", type: "stat", stat: "bonusHP", icon: "🌨️", level: 77 },
			// { name: "Volcano Explorer Belt", type: "stat", stat: "bonusHP", icon: "🌋", level: 87 },
			// { name: "Cursed Belt", type: "stat", stat: "bonusHP", icon: "💀", level: 97 },
			// Amulet items //@todo implement
			{ name: "Amulet of Glimmer", type: "stat", stat: "penetration", icon: "✨", level: 8 },
			{ name: "Amulet of Whispered Secrets", type: "stat", stat: "penetration", icon: "🌳", level: 18 },
			{ name: "Amulet of Crystalline Power", type: "stat", stat: "penetration", icon: "💎", level: 28 },
			{ name: "Amulet of Fiery Embers", type: "stat", stat: "penetration", icon: "🔥", level: 38 },
			{ name: "Amulet of Thundering Skies", type: "stat", stat: "penetration", icon: "⚡", level: 48 },
			{ name: "Amulet of Eternal Shadows", type: "stat", stat: "penetration", icon: "🌑", level: 58 },
			{ name: "Amulet of Astral Radiance", type: "stat", stat: "penetration", icon: "🌌", level: 68 },
			{ name: "Amulet of Frostborne Chill", type: "stat", stat: "penetration", icon: "❄️", level: 78 },
			{ name: "Amulet of Molten Fury", type: "stat", stat: "penetration", icon: "🔥", level: 88 },
			{ name: "Amulet of Haunting Shadows", type: "stat", stat: "penetration", icon: "☠️", level: 98 },
			// Shield items
			{ name: "Shimmerleaf Buckler", type: "stat", stat: "block", icon: "🍃🛡️", level: 9 },
			{ name: "Whisperwood Kite Shield", type: "stat", stat: "block", icon: "🌳🔰", level: 19 },
			{ name: "Crystaline Heater Shield", type: "stat", stat: "block", icon: "💎🔥", level: 29 },
			{ name: "Crimsonfire Round Shield", type: "stat", stat: "block", icon: "🔥🔵", level: 39 },
			{ name: "Stormforge Tower Shield", type: "stat", stat: "block", icon: "⚡⚔️", level: 49 },
			{ name: "Lost Souls Pavise Shield", type: "stat", stat: "block", icon: "🌑🌿", level: 59 },
			{ name: "Astral Scutum Shield", type: "stat", stat: "block", icon: "🌌⚔️", level: 69 },
			{ name: "Frostbite Aegis Shield", type: "stat", stat: "block", icon: "❄️🔱", level: 79 },
			{ name: "Volcanic Bulwark Shield", type: "stat", stat: "block", icon: "🔥🛡️", level: 89 },
			{ name: "Cursed Colossus Shield", type: "stat", stat: "block", icon: "☠️🗿", level: 99 },
		],
		peopleInNeed: [
			"The distressed villagers",
			"A desperate knight",
			"The royal court",
			"The ancient order of wizards",
			"The sacred priesthood",
			"The renowned guild of adventurers",
			"The mythical creatures of the forest",
			"The noble lords and ladies"
		],
		aidRequests: [
			"implore your assistance",
			"plead for your aid",
			"request your intervention",
			"seek your heroic deeds",
			"crave your valiant help",
			"beg for your brave intervention",
			"yearn for your courageous action",
			"solicit your gallant support"
		],
		enemyDescriptors: [
			"fearsome",
			"malevolent",
			"dreaded",
			"vicious",
			"sinister",
			"ferocious",
			"cursed",
			"diabolical"
		],
		groupPhrases: [
			"A horde of",
			"A pack of",
			"A swarm of",
			"A legion of",
			"A band of",
			"An army of",
			"A brood of",
			"A congregation of"
		],
		actionVerbs: [
			"plaguing",
			"terrorizing",
			"menacing",
			"invading",
			"assaulting",
			"wreaking havoc upon",
			"threatening",
			"laying waste to"
		],
		locations: [
			"the realm",
			"a distant village",
			"the enchanted forest",
			"the ancient ruins",
			"the treacherous mountains",
			"a forgotten crypt",
			"the mystical swamps",
			"the forsaken castle"
		],
		challengeVerbs: [
			"challenges",
			"defies",
			"dares",
			"provokes",
			"taunts"
		],
		/*
		gatheringItems: [
			{ name: "Herb", type: "gathering", level: 1, icon: "🌿" },
			{ name: "Mushroom", type: "gathering", level: 2, icon: "🍄" },
			{ name: "Crystal", type: "gathering", level: 3, icon: "💎" },
			{ name: "Ore", type: "gathering", level: 4, icon: "🔥" },
			{ name: "Stone", type: "gathering", level: 5, icon: "🗻" },
			{ name: "Bone", type: "gathering", level: 6, icon: "☠️" },
			{ name: "Star Shard", type: "gathering", level: 7, icon: "✨" },
			{ name: "Ice", type: "gathering", level: 8, icon: "❄️" },
			{ name: "Ember", type: "gathering", level: 9, icon: "🔥" },
			{ name: "Dark Essence", type: "gathering", level: 10, icon: "🌑" }
		]
		*/
		gatheringItems: [
			// Area 0 — Shimmering Meadows (minGatherLevel 1)
			{ name: "Healing Herb",      areaIndex: 0, tier: 1, weight: 50, icon: "🌿", type: "gathering" },
			{ name: "Green Leaf",        areaIndex: 0, tier: 1, weight: 50, icon: "🍀", type: "gathering" },
			{ name: "Glowing Fungus",    areaIndex: 0, tier: 2, weight: 25, icon: "🍄", type: "gathering" },
			{ name: "Shimmering Petals", areaIndex: 0, tier: 2, weight: 25, icon: "🌺", type: "gathering" },
			{ name: "Morning Dew",       areaIndex: 0, tier: 3, weight: 10, icon: "🌞", type: "gathering" },
			{ name: "Dandelion Fluff",   areaIndex: 0, tier: 3, weight: 10, icon: "🌼", type: "gathering" },
			// Area 1 — Whispering Forest (minGatherLevel 3)
			{ name: "Mystic Mushroom",   areaIndex: 1, tier: 1, weight: 50, icon: "🍄", type: "gathering" },
			{ name: "Enchanted Moss",    areaIndex: 1, tier: 1, weight: 50, icon: "🍂", type: "gathering" },
			{ name: "Gleaming Stones",   areaIndex: 1, tier: 2, weight: 25, icon: "💎", type: "gathering" },
			{ name: "Soothing Berries",  areaIndex: 1, tier: 2, weight: 25, icon: "🍇", type: "gathering" },
			{ name: "Silverleaf",        areaIndex: 1, tier: 3, weight: 10, icon: "🍃", type: "gathering" },
			{ name: "Golden Petals",     areaIndex: 1, tier: 3, weight: 10, icon: "🌼", type: "gathering" },
			// Area 2 — Crystal Caverns (minGatherLevel 5)
			{ name: "Twilight Berries",   areaIndex: 2, tier: 1, weight: 50, icon: "🍇", type: "gathering" },
			{ name: "Starlight Mushroom", areaIndex: 2, tier: 1, weight: 50, icon: "✨", type: "gathering" },
			{ name: "Moonlight Orchid",   areaIndex: 2, tier: 2, weight: 25, icon: "🌕", type: "gathering" },
			{ name: "Dragon's Tongue",    areaIndex: 2, tier: 2, weight: 25, icon: "🐉", type: "gathering" },
			{ name: "Serpent Scale",      areaIndex: 2, tier: 3, weight: 10, icon: "🐍", type: "gathering" },
			// Area 3 — Crimson Citadel (minGatherLevel 7)
			{ name: "Moonflower",       areaIndex: 3, tier: 1, weight: 50, icon: "🌼", type: "gathering" },
			{ name: "Ghost Orchid",     areaIndex: 3, tier: 1, weight: 50, icon: "👻", type: "gathering" },
			{ name: "Nightshade Berry", areaIndex: 3, tier: 2, weight: 25, icon: "🌙", type: "gathering" },
			{ name: "Dragonfire Bloom", areaIndex: 3, tier: 3, weight: 10, icon: "🔥", type: "gathering" },
			// Area 4 — Stormy Peaks (minGatherLevel 9)
			{ name: "Basilisk's Breath", areaIndex: 4, tier: 1, weight: 50, icon: "🐍", type: "gathering" },
			{ name: "Basilisk Scale",    areaIndex: 4, tier: 1, weight: 50, icon: "🐉", type: "gathering" },
			{ name: "Venomous Petal",    areaIndex: 4, tier: 2, weight: 20, icon: "☠️", type: "gathering" },
			// Area 5 — Lost Catacombs (minGatherLevel 11)
			{ name: "Phoenix Feather",  areaIndex: 5, tier: 1, weight: 50, icon: "🔥", type: "gathering" },
			{ name: "Phoenix Ash",      areaIndex: 5, tier: 1, weight: 50, icon: "🌑", type: "gathering" },
			{ name: "Witch's Thistle",  areaIndex: 5, tier: 2, weight: 20, icon: "🧙‍♀️", type: "gathering" },
			// Area 6 — Celestial Observatory (minGatherLevel 13)
			{ name: "Enchanted Vines",  areaIndex: 6, tier: 1, weight: 50, icon: "🌿", type: "gathering" },
			{ name: "Arcane Essence",   areaIndex: 6, tier: 1, weight: 50, icon: "✨", type: "gathering" },
			// Area 7 — Frozen Tundra (minGatherLevel 15)
			{ name: "Eternal Blossom",  areaIndex: 7, tier: 1, weight: 50, icon: "🌸", type: "gathering" },
			{ name: "Celestial Petal",  areaIndex: 7, tier: 1, weight: 50, icon: "🌟", type: "gathering" },
			// Area 8 — Volcanic Depths (minGatherLevel 17)
			{ name: "Starfire Crystal", areaIndex: 8, tier: 1, weight: 50, icon: "💫", type: "gathering" },
			{ name: "Moonlight Essence",areaIndex: 8, tier: 1, weight: 50, icon: "🌕", type: "gathering" },
			// Area 9 — Cursed Catacombs (minGatherLevel 19)
			{ name: "Starfire Crystal", areaIndex: 9, tier: 1, weight: 50, icon: "💫", type: "gathering" },
			{ name: "Moonlight Essence",areaIndex: 9, tier: 1, weight: 50, icon: "🌕", type: "gathering" },
		],
		randomEnemies: [
			{ name: "Swordmaster", icon: "🗡️🛡️" },
			{ name: "Dark Sorcerer", icon: "🧙‍♂️🔮" },
			{ name: "Shadowblade", icon: "🗡️🌑" },
			{ name: "Ice Enchantress", icon: "❄️🧙‍♀️" },
			{ name: "Forest Ranger", icon: "🌲🏹" },
			{ name: "Thunder Warlock", icon: "⚡🧙‍♂️" },
			{ name: "Arcane Witch", icon: "🌌🧙‍♀️" },
			{ name: "Storm Knight", icon: "⚡🛡️" },
			{ name: "Plague Doctor", icon: "🩺😷" },
			{ name: "Doombringer", icon: "☠️🗡️" },
			{ name: "Mystic Monk", icon: "🧘‍♂️🕉️" },
			{ name: "Frost Queen", icon: "🌨️👸" },
			{ name: "Flame Knight", icon: "🔥⚔️" },
			{ name: "Silent Assassin", icon: "🤫🔪" },
			{ name: "Elven Ranger", icon: "🏹🧝" },
			{ name: "Dwarven Guardian", icon: "⛏️🛡️" },
			{ name: "Human Knight", icon: "👨‍🌾⚔️" }
		],
	}
};

const configData = config[game];

const areas = configData.areas;
const enemies = configData.enemies;
const spells = configData.spells;
const itemsList = configData.itemsList;
const peopleInNeed = configData.peopleInNeed;
const aidRequests = configData.aidRequests;
const enemyDescriptors = configData.enemyDescriptors;
const groupPhrases = configData.groupPhrases;
const actionVerbs = configData.actionVerbs;
const locations = configData.locations;
const challengeVerbs = configData.challengeVerbs;
const randomEnemies = configData.randomEnemies ?? [];
const gatheringItems = configData.gatheringItems;

function generateId(name, level) {
	const formattedName = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	const cleanName = formattedName.replace(/[^a-zA-Z0-9]/g, '_');
	const enemyId = `${cleanName}_${level}`;
	return enemyId.toLowerCase();
}

const STAT_CONFIGS = {
	maxHP:       { factor: 0.7,  areaScale: 3.0 },
	damage:      { factor: 0.6,  areaScale: 2.0 },
	defense:     { factor: 0.55, areaScale: 1.5 },
	precision:   { factor: 0.55, areaScale: 2.0 },
	evasion:     { factor: 0.5,  areaScale: 1.5 },
	critical:    { factor: 0.2,  areaScale: 1.0 },
	resistance:  { factor: 0.2,  areaScale: 1.0 },
	penetration: { factor: 0.15, areaScale: 0.8 },
	block:       { factor: 0.15, areaScale: 0.8 },
};

const getAttributeValue = (level, attribute) => {
	const areaIndex = Math.floor((level - 1) / 10);
	const { factor, areaScale } = STAT_CONFIGS[attribute];
	return Math.floor(1 + level * factor + areaIndex * areaScale);
};

enemies.forEach(enemy => {
	const { name, level, type } = enemy
	enemy.id = generateId(name, level)
	enemy.areaIndex = Math.floor((level - 1) / 10)
	enemy.maxHP = getAttributeValue(level, 'maxHP')
	enemy.damage = getAttributeValue(level, 'damage')
	enemy.defense = getAttributeValue(level, 'defense')
	enemy.precision = getAttributeValue(level, 'precision')
	enemy.evasion = getAttributeValue(level, 'evasion')
	enemy.critical = getAttributeValue(level, 'critical')
	enemy.resistance = getAttributeValue(level, 'resistance')
	enemy.block = getAttributeValue(level, 'block')
	enemy.penetration = getAttributeValue(level, 'penetration')
	enemy.currentHP = 0
	if (!enemy.type) {
		enemy.type = 'BASE'
	}

	if (type === 'BOSS') {
	  enemy.lootChance = 0.333
	  enemy.spell = spells[Math.ceil(enemy.level / 10) - 1];
	} else if (type ==='DUELIST') {
	  enemy.lootChance = 0
	  const basePrecision = enemy.precision;
	  enemy.damage += Math.ceil(basePrecision * 0.1);
	  enemy.precision += Math.ceil(basePrecision * 0.1);
	  enemy.critical += Math.ceil(basePrecision * 0.05);
	  enemy.penetration += Math.ceil(basePrecision * 0.05);
	  enemy.spell = null;
	} else {
	  enemy.lootChance = 0.033
	  enemy.spell = spells[Math.ceil(enemy.level / 10) - 1];
	}
});

itemsList.forEach(item => {
	const { name, level } = item;
	item.id = generateId(name, level);
	item.areaIndex = Math.floor((level - 1) / 10);
	item.improvementLevel = 0;
	item.craftRank = 0;
});

const gameConfig = {
	areas: areas,
	enemies: enemies,
	spells: spells,
	itemsList: itemsList,
	peopleInNeed: peopleInNeed,
	aidRequests: aidRequests,
	enemyDescriptors: enemyDescriptors,
	groupPhrases: groupPhrases,
	actionVerbs: actionVerbs,
	locations: locations,
	challengeVerbs: challengeVerbs,
	randomEnemies: randomEnemies,
	statNames: statNames,
	levelUpRequirements: levelUpRequirements,
	effectValue: 0.03,
	spellMaxLevel: 10,
	gatheringItems: gatheringItems,
	relics: RELICS,
	questPool: QUEST_POOL,
	craftRecipes: CRAFT_RECIPES,
	prestigeMinLevel: 30,
}

function deepFreeze(obj) {
	if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) {
		return;
	}

	Object.freeze(obj);

	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			deepFreeze(obj[key]);
		}
	}
}

deepFreeze(gameConfig);

export default gameConfig;
