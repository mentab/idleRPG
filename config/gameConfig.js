// GameConfig.js


// @later do multiple files, one for each game
const gameHash = window.location.hash.slice(1);
const game = gameHash;

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
			},
			{
			  name: "Whispering Forest",
			  description: "Whispering Forest is an enchanted realm dominated by towering ancient trees. The dense canopy casts a mesmerizing pattern of light and shadow on the forest floor. Soft whispers seem to emanate from the trees, creating an otherworldly ambiance. The air is cool and crisp, and the ground is covered in a carpet of moss and fallen leaves. It is a place of mystery and magic, where secrets are whispered among the ancient trees.",
			},
			{
			  name: "Crystal Caverns",
			  description: "Crystal Caverns is a subterranean wonderland adorned with shimmering crystals of various hues. The cavern walls glisten with an ethereal glow, creating a breathtaking sight. Stalactites and stalagmites form intricate formations, giving the cave an otherworldly appearance. The air is cool and tinged with a hint of mineral scent. It is a place where the beauty of the underground world unfolds, waiting to be discovered.",
			},
			{
			  name: "Crimson Citadel",
			  description: "Crimson Citadel stands tall amidst a rugged landscape, its imposing architecture evoking a sense of power and mystery. The citadel is adorned with intricate carvings and towering spires that reach for the sky. Fiery torches illuminate the halls, casting dancing shadows. The air is thick with an aura of danger and forbidden knowledge. It is a place of dark allure, where only the boldest dare to venture.",
			},
			{
			  name: "Stormy Peaks",
			  description: "Stormy Peaks is a realm of towering mountains and relentless storms. Jagged cliffs and rocky terrain create a treacherous landscape. Thunder rumbles through the peaks, accompanied by flashes of lightning that light up the dark sky. Winds howl fiercely, carrying a sense of raw power. It is a place where nature's fury reigns supreme, testing the resilience and bravery of those who dare to conquer it.",
			},
			{
			  name: "Lost Catacombs",
			  description: "Lost Catacombs lie hidden beneath the surface, a labyrinthine maze of ancient tunnels and forgotten chambers. Crumbling pillars and eerie statues line the passageways, exuding an aura of decay and mystery. Flickering torches cast long shadows, adding to the sense of foreboding. The air is thick with the scent of dampness and ancient secrets. It is a place where the past lingers, waiting to be unearthed.",
			},
			{
			  name: "Celestial Observatory",
			  description: "Celestial Observatory is a celestial haven perched atop a high peak. The observatory offers a panoramic view of the star-studded night sky, where constellations twinkle in their eternal dance. Telescopes and instruments stand ready to unravel the mysteries of the cosmos. The air is crisp and tinged with the scent of fresh air and anticipation. It is a place where the wonders of the universe unfold, inviting stargazers and dreamers.",
			},
			{
			  name: "Frozen Tundra",
			  description: "Frozen Tundra stretches as far as the eye can see, a frozen wasteland cloaked in eternal winter. Snow-covered plains and icy peaks dominate the landscape, glistening in the pale sunlight. Frosty winds whip through the tundra, biting at exposed skin. The air is filled with a sense of icy solitude and quietude. It is a place of harsh beauty, where survival is a constant battle against the elements.",
			},
			{
			  name: "Volcanic Depths",
			  description: "Volcanic Depths is a fiery abyss filled with molten rock and intense heat. Rivers of lava flow through the depths, casting an ominous glow on the jagged rock formations. Sulfurous fumes fill the air, creating an acrid and suffocating atmosphere. Tremors shake the ground, a constant reminder of the volatile nature of the place. It is a realm of searing danger and untamed power, where only the most fearless dare to tread.",
			},
			{
			  name: "Cursed Catacombs",
			  description: "Cursed Catacombs hold the remnants of a forgotten civilization, entwined with dark magic and cursed energies. Crumbling tombs and crypts line the underground passages, bearing eerie inscriptions and macabre symbols. Flickering candles barely illuminate the desolate corridors, shrouded in an eternal twilight. The air is heavy with a sense of ancient curses and restless spirits. It is a place where the line between life and death blurs, testing the resolve of intrepid explorers.",
			},
		],
		enemies: [
			// Shimmering Meadows
			{ name: "Warthog", level: 1, icon: "🐗" },
			{ name: "Shadowfox", level: 2, icon: "🦊" },
			{ name: "Direwolf", level: 3, icon: "🐺" },
			{ name: "Thorn Ent", level: 4, icon: "🌿" },
			{ name: "Griffin", level: 5, icon: "🦅" },
			{ name: "Dark Knight", level: 6, icon: "👹" },
			{ name: "Pixie Sorcerer", level: 7, icon: "🧚‍♂️" },
			{ name: "Enchanted Dryad", level: 8, icon: "🌺" },
			{ name: "Illusionist Wizard", level: 9, icon: "🧙‍♀️" },
			{ name: "Legendary Guardian", level: 10, icon: "🌟" },
			// Whispering Forest
			{ name: "Goblin Warrior", level: 11, icon: "🧟‍♂️" },
			{ name: "Wicked Witch", level: 12, icon: "🧙‍♀️" },
			{ name: "Treant", level: 13,icon: "🌳" },
			{ name: "Banshee", level: 14, icon: "👻" },
			{ name: "Chimera", level: 15, icon: "🐲" },
			{ name: "Enraged Bear", level: 16, icon: "🐻" },
			{ name: "Nightshade Assassin", level: 17, icon: "🗡️" },
			{ name: "Druid Shaman", level: 18, icon: "🌿🔮" },
			{ name: "Siren Temptress", level: 19, icon: "🧜‍♀️" },
		    { name: "Forest Guardian", level: 20, icon: "🌳🦉" },
			// Crystal Caverns
			{ name: "Cave Spider", level: 21, icon: "🕷️" },
			{ name: "Frost Elemental", level: 22, icon: "❄️🌀" },
			{ name: "Crystal Golem", level: 23, icon: "💎🗿" },
			{ name: "Shadow Stalker", level: 24, icon: "👤🌑" },
			{ name: "Crystal Mage", level: 25, icon: "💎🧙‍♂️" },
			{ name: "Ancient Wyrm", level: 26, icon: "🐉🌳" },
			{ name: "Spectral Knight", level: 27, icon: "👻⚔️" },
			{ name: "Ice Queen", level: 28, icon: "👸❄️" },
			{ name: "Frozen Colossus", level: 29, icon: "❄️🗿" },
			{ name: "Crystal Behemoth", level: 30, icon: "💎🐲" },
			// Crimson Citadel
			{ name: "Hellfire Imp", level: 31, icon: "🔥👿" },
			{ name: "Infernal Knight", level: 32, icon: "🔥⚔️" },
			{ name: "Lava Elemental", level: 33, icon: "🌋🔥" },
			{ name: "Death's Shadow", level: 34, icon: "☠️🌑" },
			{ name: "Crimson Succubus", level: 35, icon: "🔥👿🧚‍♀️" },
			{ name: "Molten Golem", level: 36, icon: "🔥💥🗿" },
			{ name: "Cursed Necromancer", level: 37, icon: "🔥🧟‍♂️" },
			{ name: "Ashen Witch", level: 38, icon: "🔥🧙‍♀️" },
			{ name: "Raging Inferno", level: 39, icon: "🔥🌋" },
			{ name: "Lord of Flames", level: 40, icon: "🔥👹" },
			// Stormy Peaks
			{ name: "Rock Golem", level: 41, icon: "🗿⛰️" },
			{ name: "Thunderbird", level: 42, icon: "⚡️🐦" },
			{ name: "Storm Shaman", level: 43, icon: "⚡️🧙‍♂️" },
			{ name: "Mistral Drake", level: 44, icon: "🌬️🐉" },
			{ name: "Yeti", level: 45, icon: "🏔️🦧" },
			{ name: "Whirling Dervish", level: 46, icon: "🌪️🧔" },
			{ name: "Frost Giant", level: 47, icon: "🌬️🗿" },
			{ name: "Tornado Elemental", level: 48, icon: "🌪️🌬️" },
			{ name: "Storm Lord", level: 49, icon: "⚡️👑" },
			{ name: "Raging Thunderbird", level: 50, icon: "⚡️🐦" },
			// Lost Catacombs
			{ name: "Skeletal Warrior", level: 51, icon: "💀⚔️" },
			{ name: "Cursed Mummy", level: 52, icon: "🔮🧟‍♂️" },
			{ name: "Ghostly Apparition", level: 53, icon: "👻💀" },
			{ name: "Serpentine Cultist", level: 54, icon: "🔮🐍" },
			{ name: "Crypt Lich", level: 55, icon: "💀🔮" },
			{ name: "Shade Assassin", level: 56, icon: "👤🔪" },
			{ name: "Ghoul Hound", level: 57, icon: "🐕💀" },
			{ name: "Spectral Sorcerer", level: 58, icon: "🔮🌑" },
			{ name: "Ancient Skeleton", level: 59, icon: "☠️💀" },
			{ name: "Necrotic Lich", level: 60, icon: "💀🔮" },
			// Celestial Observatory
			{ name: "Starlight Sprite", level: 61, icon: "✨🧚" },
			{ name: "Astral Guardian", level: 62, icon: "⭐🦉" },
			{ name: "Lunar Priestess", level: 63, icon: "🌙👸" },
			{ name: "Solar Elemental", level: 64, icon: "☀️🔥" },
			{ name: "Nebula Sorcerer", level: 65, icon: "🌌🧙‍♂️" },
			{ name: "Stardust Dragon", level: 66, icon: "✨🐉" },
			{ name: "Cosmic Specter", level: 67, icon: "👤✨" },
			{ name: "Celestial Oracle", level: 68, icon: "⭐🔮" },
			{ name: "Aurora Valkyrie", level: 69, icon: "🌌⚔️" },
			{ name: "Stellar Archangel", level: 70, icon: "⭐👼" },
			// Frozen Tundra
			{ name: "Ice Elemental", level: 71, icon: "🌬️❄️" },
			{ name: "Frost Shaman", level: 72, icon: "❄️🧙‍♂️" },
			{ name: "Glacial Golem", level: 73, icon: "❄️💎🗿" },
			{ name: "Snow Siren", level: 74, icon: "❄️🧜‍♀️" },
			{ name: "Winter Wolf", level: 75, icon: "❄️🐺" },
			{ name: "Avalanche Yeti", level: 76, icon: "❄️🏔️🦧" },
			{ name: "Frozen Banshee", level: 77, icon: "❄️👻" },
			{ name: "Blizzard Mage", level: 78, icon: "❄️🧙‍♂️❄️" },
			{ name: "Arctic Drake", level: 79, icon: "❄️🐉" },
			{ name: "Glacier Guardian", level: 80, icon: "❄️🏔️🦉" },
			// Volcanic Depths
			{ name: "Magma Elemental", level: 81, icon: "🌋🔥" },
			{ name: "Lava Shaman", level: 82, icon: "🌋🧙‍♂️" },
			{ name: "Infernal Golem", level: 83,  icon: "🌋💎🗿" },
			{ name: "Fire Sprite", level: 84, icon: "🔥🧚" },
			{ name: "Volcanic Drake", level: 85, icon: "🌋🐉" },
			{ name: "Obsidian Knight", level: 86, icon: "🌋⚔️" },
			{ name: "Hellhound", level: 87, icon: "🌋🐕" },
			{ name: "Searing Sorcerer", level: 88, icon: "🌋🧙‍♂️" },
			{ name: "Inferno Demon", level: 89, icon: "🌋👹" },
			{ name: "Eruption Guardian", level: 90, icon: "🌋🏔️🦉" },
			// Cursed Catacombs
			{ name: "Ghoul", level: 91, icon: "☠️🧟‍♂️" },
			{ name: "Shadowcaster", level: 92, icon: "🌑🧙‍♂️" },
			{ name: "Spectral Assassin", level: 93, icon: "🌑🗡️" },
			{ name: "Cursed Wraith", level: 94, icon: "🌑👻" },
			{ name: "Necrotic Warlock", level: 95, icon: "🌑🔮🧙‍♂️" },
			{ name: "Bone Dragon", level: 96, icon: "☠️🐉" },
			{ name: "Dark Priest", level: 97, icon: "🌑⚔️🙏" },
			{ name: "Phantom Knight", level: 98, icon: "🌑⚔️👻" },
			{ name: "Deathbringer", level: 99, icon: "🌑👤⚔️" },
			{ name: "Eternal Lich", level: 100, icon: "🌑💀🔮" }
		],
		itemsList: [
			// Armor items
			{ name: "Leather Armor", type: "stat", stat: "defense", icon: "🥼", level: 5 },
			{ name: "Chainmail Armor", type: "stat", stat: "defense", icon: "🔗", level: 10 },
			{ name: "Scale Armor", type: "stat", stat: "defense", icon: "🐉", level: 15 },
			{ name: "Plate Armor", type: "stat", stat: "defense", icon: "💌", level: 20 },
			{ name: "Dragonhide Armor", type: "stat", stat: "defense", icon: "🐉", level: 25 },
			{ name: "Steel Armor", type: "stat", stat: "defense", icon: "⚙️", level: 30 },
			{ name: "Ironclad Armor", type: "stat", stat: "defense", icon: "🛡️", level: 35 },
			{ name: "Mithril Armor", type: "stat", stat: "defense", icon: "⛰️", level: 40 },
			{ name: "Elven Robes", type: "stat", stat: "defense", icon: "🧝", level: 45 },
			{ name: "Ancient Plate Armor", type: "stat", stat: "defense", icon: "🏰", level: 50 },
			{ name: "Celestial Vestments", type: "stat", stat: "defense", icon: "✨", level: 55 },
			{ name: "Shadow Vestments", type: "stat", stat: "defense", icon: "🌑", level: 60 },
			{ name: "Titanium Mail", type: "stat", stat: "defense", icon: "🦾", level: 65 },
			{ name: "Voidbane Plate", type: "stat", stat: "defense", icon: "🌌", level: 70 },
			{ name: "Radiant Armor", type: "stat", stat: "defense", icon: "☀️", level: 75 },
			{ name: "Crystal Guardian", type: "stat", stat: "defense", icon: "💎", level: 80 },
			{ name: "Stormforged Plate", type: "stat", stat: "defense", icon: "⚡", level: 85 },
			{ name: "Ethereal Shroud", type: "stat", stat: "defense", icon: "🌌", level: 90 },
			{ name: "Divine Raiment", type: "stat", stat: "defense", icon: "✨", level: 95 },
			{ name: "Infinity Armor", type: "stat", stat: "defense", icon: "♾️", level: 100 },
			// Weapon items
			{ name: "Knife", type: "stat", stat: "damage", icon: "🔪", level: 5 },
			{ name: "Dagger", type: "stat", stat: "damage", icon: "🗡️", level: 10 },
			{ name: "Rapier", type: "stat", stat: "damage", icon: "🤺", level: 15 },
			{ name: "Shortsword", type: "stat", stat: "damage", icon: "🗡️", level: 20 },
			{ name: "Scimitar", type: "stat", stat: "damage", icon: "🔱", level: 25 },
			{ name: "Katana", type: "stat", stat: "damage", icon: "🗡️", level: 30 },
			{ name: "Mace", type: "stat", stat: "damage", icon: "🔨", level: 35 },
			{ name: "Morningstar", type: "stat", stat: "damage", icon: "🌅", level: 40 },
			{ name: "Hammer", type: "stat", stat: "damage", icon: "🔨", level: 45 },
			{ name: "Battleaxe", type: "stat", stat: "damage", icon: "🪓", level: 50 },
			{ name: "Glaive", type: "stat", stat: "damage", icon: "🍁", level: 55 },
			{ name: "Spear", type: "stat", stat: "damage", icon: "🌿", level: 60 },
			{ name: "Warhammer", type: "stat", stat: "damage", icon: "🔨", level: 65 },
			{ name: "Claymore", type: "stat", stat: "damage", icon: "🗡️", level: 70 },
			{ name: "Flail", type: "stat", stat: "damage", icon: "🔗", level: 75 },
			{ name: "Whip", type: "stat", stat: "damage", icon: "👻", level: 80 },
			{ name: "Halberd", type: "stat", stat: "damage", icon: "🪓", level: 85 },
			{ name: "Runeblade", type: "stat", stat: "damage", icon: "⚔️", level: 90 },
			{ name: "Longsword", type: "stat", stat: "damage", icon: "🗡️", level: 95 },
			{ name: "Excalibur", type: "stat", stat: "damage", icon: "🗡️", level: 100 },
			// Soulstones items
			{ name: "Soulstone of Renewal", type: "stat", stat: "regeneration", icon: "🕰️", level: 25 },
			{ name: "Soulstone of Vitality", type: "stat", stat: "regeneration", icon: "⌛", level: 50 },
			{ name: "Soulstone of Resurgence", type: "stat", stat: "regeneration", icon: "⏳", level: 75 },
			{ name: "Soulstone of Awakening", type: "stat", stat: "regeneration", icon: "🌅", level: 100 },
			// Gloves items
			{ name: "Leather Gloves", type: "stat", stat: "precision", icon: "🧤", level: 10 },
			{ name: "Chainmail Gauntlets", type: "stat", stat: "precision", icon: "🧤", level: 20 },
			{ name: "Plated Gauntlets", type: "stat", stat: "precision", icon: "🧤", level: 30 },
			{ name: "Dragonhide Gloves", type: "stat", stat: "precision", icon: "🧤", level: 40 },
			{ name: "Shadowsteel Gauntlets", type: "stat", stat: "precision", icon: "🧤", level: 50 },
			{ name: "Stormforged Handguards", type: "stat", stat: "precision", icon: "🧤", level: 60 },
			{ name: "Arcane Gloves", type: "stat", stat: "precision", icon: "🧤", level: 70 },
			{ name: "Gloves of the Eternal Sentinel", type: "stat", stat: "precision", icon: "🧤", level: 80 },
			{ name: "Divine Touch Gauntlets", type: "stat", stat: "precision", icon: "🧤", level: 90 },
			{ name: "Legendary Gauntlets", type: "stat", stat: "precision", icon: "🧤", level: 100 },
			// Trinkets items
			{ name: "Simple Trinket", type: "stat", stat: "evasion", icon: "🔮", level: 10 },
			{ name: "Ornate Trinket", type: "stat", stat: "evasion", icon: "🔮", level: 20 },
			{ name: "Enchanted Trinket", type: "stat", stat: "evasion", icon: "🔮", level: 30 },
			{ name: "Mystical Trinket", type: "stat", stat: "evasion", icon: "🔮", level: 40 },
			{ name: "Glowing Trinket", type: "stat", stat: "evasion", icon: "🔮", level: 50 },
			{ name: "Celestial Trinket", type: "stat", stat: "evasion", icon: "🔮", level: 60 },
			{ name: "Whispering Trinket", type: "stat", stat: "evasion", icon: "🔮", level: 70 },
			{ name: "Shadow Trinket", type: "stat", stat: "evasion", icon: "🔮", level: 80 },
			{ name: "Ethereal Trinket", type: "stat", stat: "evasion", icon: "🔮", level: 90 },
			{ name: "Mythical Trinket", type: "stat", stat: "evasion", icon: "🔮", level: 100 },
			// Ring items
			{ name: "Ring of Precision", type: "stat", stat: "critical", icon: "💍", level: 5 },
			{ name: "Ring of Blinding Strikes", type: "stat", stat: "critical", icon: "✨", level: 15 },
			{ name: "Ring of Deadly Precision", type: "stat", stat: "critical", icon: "🔪", level: 25 },
			{ name: "Ring of Devastation", type: "stat", stat: "critical", icon: "💥", level: 35 },
			{ name: "Ring of Execution", type: "stat", stat: "critical", icon: "🗡️", level: 45 },
			{ name: "Ring of Annihilation", type: "stat", stat: "critical", icon: "☠️", level: 55 },
			{ name: "Ring of Ruthless Strikes", type: "stat", stat: "critical", icon: "🔥", level: 65 },
			{ name: "Ring of Piercing Precision", type: "stat", stat: "critical", icon: "🎯", level: 75 },
			{ name: "Ring of Focused Fury", type: "stat", stat: "critical", icon: "⚔️", level: 85 },
			{ name: "Ring of Merciless Strikes", type: "stat", stat: "critical", icon: "🌪️", level: 95 },
			// Cloak items
			{ name: "Tattered Cape", type: "stat", stat: "resistance", icon: "🧣", level: 5 },
			{ name: "Patchwork Vest", type: "stat", stat: "resistance", icon: "🐾", level: 15 },
			{ name: "Old Cloak", type: "stat", stat: "resistance", icon: "🕵️‍♂️", level: 25 },
			{ name: "Worn Tabard", type: "stat", stat: "resistance", icon: "🛡️", level: 35 },
			{ name: "Rogue's Cape", type: "stat", stat: "resistance", icon: "🌑", level: 45 },
			{ name: "Embroidered Vest", type: "stat", stat: "resistance", icon: "🧵", level: 55 },
			{ name: "Mystic Cloak", type: "stat", stat: "resistance", icon: "🌌", level: 65 },
			{ name: "Knight's Tabard", type: "stat", stat: "resistance", icon: "🛡️", level: 75 },
			{ name: "Enchanted Cape", type: "stat", stat: "resistance", icon: "✨", level: 85 },
			{ name: "Royal Velvet Cloak", type: "stat", stat: "resistance", icon: "👑", level: 95 },
			// Necklace items
			{ name: "Necklace of Fortune", type: "stat", stat: "bonusLoot", icon: "🔮", level: 20 },
			{ name: "Necklace of Prosperity", type: "stat", stat: "bonusLoot", icon: "💰", level: 40 },
			{ name: "Necklace of Serendipity", type: "stat", stat: "bonusLoot", icon: "🍀", level: 60 },
			{ name: "Necklace of Abundance", type: "stat", stat: "bonusLoot", icon: "🌟", level: 80 },
			// Charm items
			{ name: "Charm of Wisdom", type: "stat", stat: "bonusExp", icon: "📚", level: 10 },
			{ name: "Charm of Enlightenment", type: "stat", stat: "bonusExp", icon: "🌟", level: 30 },
			{ name: "Charm of Insight", type: "stat", stat: "bonusExp", icon: "🔍", level: 50 },
			{ name: "Charm of Mastery", type: "stat", stat: "bonusExp", icon: "🎓", level: 70 },
			{ name: "Charm of Ascendancy", type: "stat", stat: "bonusExp", icon: "⚡", level: 90 },
			// Belt items // @todo implement
			{ name: "Leather Belt", type: "stat", stat: "bonusHP", icon: "⚕️", level: 7 },
			{ name: "Chain Belt", type: "stat", stat: "bonusHP", icon: "🏋️", level: 17 },
			{ name: "Plated Belt", type: "stat", stat: "bonusHP", icon: "🛡️", level: 27 },
			{ name: "Reinforced Belt", type: "stat", stat: "bonusHP", icon: "💪", level: 37 },
			{ name: "Studded Belt", type: "stat", stat: "bonusHP", icon: "🔋", level: 47 },
			{ name: "Warrior Belt", type: "stat", stat: "bonusHP", icon: "⏱️", level: 57 },
			{ name: "Guardian Belt", type: "stat", stat: "bonusHP", icon: "🔒", level: 67 },
			{ name: "Knight Belt", type: "stat", stat: "bonusHP", icon: "🌅", level: 77 },
			{ name: "Titan Belt", type: "stat", stat: "bonusHP", icon: "🗿", level: 87 },
			{ name: "Epic Belt", type: "stat", stat: "bonusHP", icon: "🌟", level: 97 },
			// Amulet items //@todo implement
			{ name: "Amulet of Fire", type: "stat", stat: "elementalDamage", icon: "🔥", level: 18 },
			{ name: "Amulet of Ice", type: "stat", stat: "elementalDamage", icon: "❄️", level: 38 },
			{ name: "Amulet of Lightning", type: "stat", stat: "elementalDamage", icon: "⚡", level: 58 },
			{ name: "Amulet of Earth", type: "stat", stat: "elementalDamage", icon: "🌿", level: 78 },
			{ name: "Amulet of Elements", type: "stat", stat: "elementalDamage", icon: "🌍", level: 98 },
			// Shield items // @todo implement
			{ name: "Buckler", type: "stat", stat: "block", icon: "🛡️", level: 9 },
			{ name: "Kite Shield", type: "stat", stat: "block", icon: "🔰", level: 19 },
			{ name: "Heater Shield", type: "stat", stat: "block", icon: "🔥", level: 29 },
			{ name: "Round Shield", type: "stat", stat: "block", icon: "🔵", level: 39 },
			{ name: "Tower Shield", type: "stat", stat: "block", icon: "⚔️", level: 49 },
			{ name: "Pavise Shield", type: "stat", stat: "block", icon: "🌿", level: 59 },
			{ name: "Scutum Shield", type: "stat", stat: "block", icon: "⚔️", level: 69 },
			{ name: "Aegis Shield", type: "stat", stat: "block", icon: "🔱", level: 79 },
			{ name: "Bulwark Shield", type: "stat", stat: "block", icon: "🛡️", level: 89 },
			{ name: "Colossus Shield", type: "stat", stat: "block", icon: "🗿", level: 99 },
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
		gatheringItems: [
			{ name: "Iron Ore", type: "gathering", level: 1, icon: "⛏️" },
			{ name: "Copper Ore", type: "gathering", level: 2, icon: "🔨" },
			{ name: "Silver Ore", type: "gathering", level: 3, icon: "⚪" },
			{ name: "Gold Ore", type: "gathering", level: 4, icon: "💰" },
			{ name: "Platinum Ore", type: "gathering", level: 5, icon: "⚜️" },
			{ name: "Mithril Ore", type: "gathering", level: 6, icon: "⚙️" },
			{ name: "Adamantium Ore", type: "gathering", level: 7, icon: "⚛️" },
			{ name: "Dragonstone Ore", type: "gathering", level: 8, icon: "🐉" },
			{ name: "Voidium Ore", type: "gathering", level: 9, icon: "🌑" },
			{ name: "Celestium Ore", type: "gathering", level: 10, icon: "✨" }
		]
	}
};

const configData = config[game];

const areas = configData.areas;
const enemies = configData.enemies;
const itemsList = configData.itemsList;
const gatheringItems = configData.gatheringItems;
const peopleInNeed = configData.peopleInNeed;
const aidRequests = configData.aidRequests;
const enemyDescriptors = configData.enemyDescriptors;
const groupPhrases = configData.groupPhrases;
const actionVerbs = configData.actionVerbs;
const locations = configData.locations;
const challengeVerbs = configData.challengeVerbs;
const randomEnemies = configData.randomEnemies;

function generateId(name, level) {
	const formattedName = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	const cleanName = formattedName.replace(/[^a-zA-Z0-9]/g, '_');
	const enemyId = `${cleanName}_${level}`;
	return enemyId.toLowerCase();
}

const ATTRIBUTES = {
	maxHP: {
	  base: 15,
	  factors: [2, 3, 4, 2, 3, 4, 2, 3, 4, 5],
	  groupFactors: [0, 5, 15, 20, 35, 55, 90, 100, 110, 120],
	},
	damage: {
	  base: 4,
	  factors: [2.5, 3.2, 2.6, 3.3, 2.7, 3.4, 2.8, 3.5, 3.6, 3.7],
	  groupFactors: [0, 5, 0, 10, 0, 15, 0, 20, 25, 30],
	},
	defense: {
	  base: 4,
	  factors: [3.2, 2.5, 3.3, 2.6, 3.4, 2.7, 3.5, 2.8, 3.6, 3.7],
	  groupFactors: [5, 0, 10, 0, 15, 0, 20, 0, 25, 30],
	},
	precision: {
	  base: 25,
	  factors: [0.1, 0.4, 0.2, 0.5, 0.3, 0.6, 0.4, 0.7, 0.8, 0.9],
	  groupFactors: [0, 0, 0, 5, 0, 10, 0, 15, 20, 25],
	},
	evasion: {
	  base: 25,
	  factors: [0.4, 0.1, 0.5, 0.2, 0.6, 0.3, 0.7, 0.4, 0.8, 0.9],
	  groupFactors: [0, 0, 5, 0, 10, 0, 15, 0, 20, 25],
	},
	critical: {
	  base: 0,
	  factors: [0.1, 0.4, 0.2, 0.5, 0.3, 0.6, 0.4, 0.7, 0.1, 0.9],
	  groupFactors: [0, 0, 0, 0, 0, 5, 0, 10, 0, 20],
	},
	resistance: {
	  base: 0,
	  factors: [0.4, 0.1, 0.5, 0.2, 0.6, 0.3, 0.7, 0.4, 0.1, 0.9],
	  groupFactors: [0, 0, 0, 0, 5, 0, 10, 0, 0, 20],
	},
	// block: {
	//   base: 0,
	//   factors: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//   groupFactors: [0, 0, 0, 0, 1, 2, 5, 10, 15, 20],
	// },
	// penetration: {
	//   base: 0,
	//   factors: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//   groupFactors: [0, 0, 0, 0, 0, 1, 2, 5, 10, 15],
	// },
	lootChance: {
	  base: 0,
	  factors: [0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 1],
	  groupFactors: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	},
}

const getAttributeValue = (entity, attribute) => {
	const level = entity.level;
	const group = Math.ceil(level / 10);
	const factorIndex = (level - 1) % 10;
	const groupFactorIndex = group - 1;
	const factor = ATTRIBUTES[attribute].factors[factorIndex];
	const groupFactor = ATTRIBUTES[attribute].groupFactors[groupFactorIndex];
	return Math.floor(ATTRIBUTES[attribute].base + (level - 1) * factor + groupFactor);
};

enemies.forEach(enemy => {
	enemy.id = generateId(enemy.name, enemy.level);
	enemy.areaIndex = Math.floor((enemy.level - 1) / 10);
	enemy.maxHP = getAttributeValue(enemy, 'maxHP');
	enemy.damage = getAttributeValue(enemy, 'damage');
	enemy.defense = getAttributeValue(enemy, 'defense');
	enemy.precision = getAttributeValue(enemy, 'precision');
	enemy.evasion = getAttributeValue(enemy, 'evasion');
	enemy.critical = getAttributeValue(enemy, 'critical');
	enemy.resistance = getAttributeValue(enemy, 'resistance');
	enemy.lootChance = getAttributeValue(enemy, 'lootChance');
	enemy.isBoss = enemy.level % 10 === 0;
});

// @todo freeze ?
const gameConfig = {
	areas: areas,
	enemies: enemies,
	itemsList: itemsList,
	gatheringItems: gatheringItems,
	peopleInNeed: peopleInNeed,
	aidRequests: aidRequests,
	enemyDescriptors: enemyDescriptors,
	groupPhrases: groupPhrases,
	actionVerbs: actionVerbs,
	locations: locations,
	challengeVerbs: challengeVerbs,
	randomEnemies: randomEnemies,
	statNames: statNames,
	levelUpRequirements: levelUpRequirements
}

export default gameConfig;
