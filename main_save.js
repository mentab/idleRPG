const gameSeed = "fantasyClickerBattles"; // @todo generate a seed and use it for the rest of the game until next reset

// Helpers
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/*
const xorshift128plus = (seed) => {
	let x = murmurhash3_32_gc(gameSeed + seed) || 1;
	x = (x ^ (x >>> 15)) >>> 0;
	x = (x ^ (x << 10)) >>> 0;
	x = (x ^ (x >>> 3)) >>> 0;

	return () => {
		x += 0x6D2B79F5;
		x = (x ^ (x >>> 15)) >>> 0;
		x = (x ^ (x << 10)) >>> 0;
		x = (x ^ (x >>> 3)) >>> 0;
		return (x >>> 0) / 0xFFFFFFFF;
	};
}

const murmurhash3_32_gc = (key) => {
	let h = 0;

	for (let i = 0; i < key.length; i++) {
		let k = key.charCodeAt(i);
		k = k * 0xcc9e2d51;
		k = (k << 15) | (k >>> 17);
		k = k * 0x1b873593;

		h ^= k;
		h = (h << 13) | (h >>> 19);
		h = h * 5 + 0xe6546b64;
	}

	h ^= key.length;
	h ^= h >>> 16;
	h = h * 0x85ebca6b;
	h ^= h >>> 13;
	h = h * 0xc2b2ae35;
	h ^= h >>> 16;

	return h >>> 0;
}
*/

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

const gameConfig = {
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
			{ name: "Warthog", level: 1, icon: "🐗", currentHP: 0 },
			{ name: "Shadowfox", level: 2, icon: "🦊", currentHP: 0 },
			{ name: "Direwolf", level: 3, icon: "🐺", currentHP: 0 },
			{ name: "Thorn Ent", level: 4, icon: "🌿", currentHP: 0 },
			{ name: "Griffin", level: 5, icon: "🦅", currentHP: 0 },
			{ name: "Dark Knight", level: 6, icon: "👹", currentHP: 0 },
			{ name: "Pixie Sorcerer", level: 7, icon: "🧚‍♂️", currentHP: 0 },
			{ name: "Enchanted Dryad", level: 8, icon: "🌺", currentHP: 0 },
			{ name: "Illusionist Wizard", level: 9, icon: "🧙‍♀️", currentHP: 0 },
			// { name: "Legendary Guardian", level: 10, ", icon: "🌟", currentHP: 0 },
			// Whispering Forest
			{ name: "Goblin Warrior", level: 11, icon: "🧟‍♂️", currentHP: 0 },
			{ name: "Wicked Witch", level: 12, icon: "🧙‍♀️", currentHP: 0 },
			{ name: "Treant", level: 13,icon: "🌳", currentHP: 0 },
			{ name: "Banshee", level: 14, icon: "👻", currentHP: 0 },
			{ name: "Chimera", level: 15, icon: "🐲", currentHP: 0 },
			{ name: "Enraged Bear", level: 16, icon: "🐻", currentHP: 0 },
			{ name: "Nightshade Assassin", level: 17, icon: "🗡️", currentHP: 0 },
			{ name: "Druid Shaman", level: 18, icon: "🌿🔮", currentHP: 0 },
			{ name: "Siren Temptress", level: 19, icon: "🧜‍♀️", currentHP: 0 },
			// { name: "Forest Guardian", level: 20,  (Guardian)", icon: "🌳🦉", currentHP: 0 },
			// Crystal Caverns
			{ name: "Cave Spider", level: 21, icon: "🕷️", currentHP: 0 },
			{ name: "Frost Elemental", level: 22, icon: "❄️🌀", currentHP: 0 },
			{ name: "Crystal Golem", level: 23, icon: "💎🗿", currentHP: 0 },
			{ name: "Shadow Stalker", level: 24, icon: "👤🌑", currentHP: 0 },
			{ name: "Crystal Mage", level: 25, icon: "💎🧙‍♂️", currentHP: 0 },
			{ name: "Ancient Wyrm", level: 26, icon: "🐉🌳", currentHP: 0 },
			{ name: "Spectral Knight", level: 27, icon: "👻⚔️", currentHP: 0 },
			{ name: "Ice Queen", level: 28, icon: "👸❄️", currentHP: 0 },
			{ name: "Frozen Colossus", level: 29, icon: "❄️🗿", currentHP: 0 },
			// { name: "Eternal Frost Dragon", level: 30, icon: "❄️🐉", currentHP: 0 },
			// Crimson Citadel
			{ name: "Hellfire Imp", level: 31, icon: "🔥👿", currentHP: 0 },
			{ name: "Infernal Knight", level: 32, icon: "🔥⚔️", currentHP: 0 },
			{ name: "Lava Elemental", level: 33, icon: "🌋🔥", currentHP: 0 },
			{ name: "Death's Shadow", level: 34, icon: "☠️🌑", currentHP: 0 },
			{ name: "Crimson Succubus", level: 35, icon: "🔥👿🧚‍♀️", currentHP: 0 },
			{ name: "Molten Golem", level: 36, icon: "🔥💥🗿", currentHP: 0 },
			{ name: "Cursed Necromancer", level: 37, icon: "🔥🧟‍♂️", currentHP: 0 },
			{ name: "Ashen Witch", level: 38, icon: "🔥🧙‍♀️", currentHP: 0 },
			{ name: "Raging Inferno", level: 39, icon: "🔥🌋", currentHP: 0 },
			// { name: "Lord of Flames", level: 40, icon: "🔥👹", currentHP: 0 },
			// Stormy Peaks
			{ name: "Rock Golem", level: 41, icon: "🗿⛰️", currentHP: 0 },
			{ name: "Thunderbird", level: 42, icon: "⚡️🐦", currentHP: 0 },
			{ name: "Storm Shaman", level: 43, icon: "⚡️🧙‍♂️", currentHP: 0 },
			{ name: "Mistral Drake", level: 44, icon: "🌬️🐉", currentHP: 0 },
			{ name: "Yeti", level: 45, icon: "🏔️🦧", currentHP: 0 },
			{ name: "Whirling Dervish", level: 46, icon: "🌪️🧔", currentHP: 0 },
			{ name: "Frost Giant", level: 47, icon: "🌬️🗿", currentHP: 0 },
			{ name: "Tornado Elemental", level: 48, icon: "🌪️🌬️", currentHP: 0 },
			{ name: "Storm Lord", level: 49, icon: "⚡️👑", currentHP: 0 },
			// { name: "Tempest Dragon", level: 50, icon: "⚡️🐉", currentHP: 0 },
			// Lost Catacombs
			{ name: "Skeletal Warrior", level: 51, icon: "💀⚔️", currentHP: 0 },
			{ name: "Cursed Mummy", level: 52, icon: "🔮🧟‍♂️", currentHP: 0 },
			{ name: "Ghostly Apparition", level: 53, icon: "👻💀", currentHP: 0 },
			{ name: "Serpentine Cultist", level: 54, icon: "🔮🐍", currentHP: 0 },
			{ name: "Crypt Lich", level: 55, icon: "💀🔮", currentHP: 0 },
			{ name: "Shade Assassin", level: 56, icon: "👤🔪", currentHP: 0 },
			{ name: "Ghoul Hound", level: 57, icon: "🐕💀", currentHP: 0 },
			{ name: "Spectral Sorcerer", level: 58, icon: "🔮🌑", currentHP: 0 },
			{ name: "Ancient Skeleton", level: 59, icon: "☠️💀", currentHP: 0 },
			// { name: "Undying Wraith", level: 60, icon: "👤🌑", currentHP: 0 },
			// Celestial Observatory
			{ name: "Starlight Sprite", level: 61, icon: "✨🧚", currentHP: 0 },
			{ name: "Astral Guardian", level: 62, icon: "⭐🦉", currentHP: 0 },
			{ name: "Lunar Priestess", level: 63, icon: "🌙👸", currentHP: 0 },
			{ name: "Solar Elemental", level: 64, icon: "☀️🔥", currentHP: 0 },
			{ name: "Nebula Sorcerer", level: 65, icon: "🌌🧙‍♂️", currentHP: 0 },
			{ name: "Stardust Dragon", level: 66, icon: "✨🐉", currentHP: 0 },
			{ name: "Cosmic Specter", level: 67, icon: "👤✨", currentHP: 0 },
			{ name: "Celestial Oracle", level: 68, icon: "⭐🔮", currentHP: 0 },
			{ name: "Aurora Valkyrie", level: 69, icon: "🌌⚔️", currentHP: 0 },
			// { name: "Ethereal Serpent", level: 70,  (Serpent)", icon: "🌙🐍", currentHP: 0 },
			// Frozen Tundra
			{ name: "Ice Elemental", level: 71, icon: "🌬️❄️", currentHP: 0 },
			{ name: "Frost Shaman", level: 72, icon: "❄️🧙‍♂️", currentHP: 0 },
			{ name: "Glacial Golem", level: 73, icon: "❄️💎🗿", currentHP: 0 },
			{ name: "Snow Siren", level: 74, icon: "❄️🧜‍♀️", currentHP: 0 },
			{ name: "Winter Wolf", level: 75, icon: "❄️🐺", currentHP: 0 },
			{ name: "Avalanche Yeti", level: 76, icon: "❄️🏔️🦧", currentHP: 0 },
			{ name: "Frozen Banshee", level: 77, icon: "❄️👻", currentHP: 0 },
			{ name: "Blizzard Mage", level: 78, icon: "❄️🧙‍♂️❄️", currentHP: 0 },
			{ name: "Arctic Drake", level: 79, icon: "❄️🐉", currentHP: 0 },
			// { name: "Glacier Guardian", level: 80,  (Guardian)", icon: "❄️🏔️🦉", currentHP: 0 },
			// Volcanic Depths
			{ name: "Magma Elemental", level: 81, icon: "🌋🔥", currentHP: 0 },
			{ name: "Lava Shaman", level: 82, icon: "🌋🧙‍♂️", currentHP: 0 },
			{ name: "Infernal Golem", level: 83,  icon: "🌋💎🗿", currentHP: 0 },
			{ name: "Fire Sprite", level: 84, icon: "🔥🧚", currentHP: 0 },
			{ name: "Volcanic Drake", level: 85, icon: "🌋🐉", currentHP: 0 },
			{ name: "Obsidian Knight", level: 86, icon: "🌋⚔️", currentHP: 0 },
			{ name: "Hellhound", level: 87, icon: "🌋🐕", currentHP: 0 },
			{ name: "Searing Sorcerer", level: 88, icon: "🌋🧙‍♂️", currentHP: 0 },
			{ name: "Inferno Demon", level: 89, icon: "🌋👹", currentHP: 0 },
			// { name: "Eruption Guardian", level: 90,  (Guardian)", icon: "🌋🏔️🦉", currentHP: 0 },
			// Cursed Catacombs
			{ name: "Ghoul", level: 91, icon: "☠️🧟‍♂️", currentHP: 0 },
			{ name: "Shadowcaster", level: 92, icon: "🌑🧙‍♂️", currentHP: 0 },
			{ name: "Spectral Assassin", level: 93, icon: "🌑🗡️", currentHP: 0 },
			{ name: "Cursed Wraith", level: 94, icon: "🌑👻", currentHP: 0 },
			{ name: "Necrotic Warlock", level: 95, icon: "🌑🔮🧙‍♂️", currentHP: 0 },
			{ name: "Bone Dragon", level: 96, icon: "☠️🐉", currentHP: 0 },
			{ name: "Dark Priest", level: 97, icon: "🌑⚔️🙏", currentHP: 0 },
			{ name: "Phantom Knight", level: 98, icon: "🌑⚔️👻", currentHP: 0 },
			{ name: "Deathbringer", level: 99, icon: "🌑👤⚔️", currentHP: 0 },
			// { name: "Eternal Lich", level: 100, icon: "🌑💀🔮", currentHP: 0 }
		],
		bosses: [
			// Shimmering Meadows
			{ name: "Young Dragon", level: 10, icon: "🐉", currentHP: 0 },
			// Whispering Forest
			{ name: "Malevolent Sorcerer", level: 20, icon: "👺", currentHP: 0 },
			// Crystal Caverns
			{ name: "Crystal Behemoth", level: 30, icon: "💎🐲", currentHP: 0 },
			// Crimson Citadel
			{ name: "Inferno Demon", level: 40, icon: "🔥👹", currentHP: 0 },
			// Stormy Peaks
			{ name: "Raging Thunderbird", level: 50, icon: "⚡️🐦", currentHP: 0 },
			// Lost Catacombs
			{ name: "Necrotic Lich", level: 60, icon: "💀🔮", currentHP: 0 },
			// Celestial Observatory
			{ name: "Stellar Archangel", level: 70, icon: "⭐👼", currentHP: 0 },
			// Area - Frozen Tundra
			{ name: "Glacial King", level: 80, icon: "❄️👑", currentHP: 0 },
			// Area - Volcanic Depths
			{ name: "Molten Dragon", level: 90, icon: "🔥🐉", currentHP: 0 },
			// Area - Cursed Catacombs
			{ name: "Soul Reaper", level: 100, icon: "🌑👤☠️", currentHP: 0 }
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
		// Unused
		lootItems: [
			// Weapon items
			{ name: "Staff of Tranquility", type: "stat", stat: "damage", icon: "🏮", level: 3 },
			{ name: "Shenlong's Staff", type: "stat", stat: "damage", icon: "🐲", level: 7 },
			{ name: "Sword of Shadows", type: "stat", stat: "damage", icon: "🌑", level: 13 },
			{ name: "Kasumi's Blade", type: "stat", stat: "damage", icon: "🌸", level: 17 },
			{ name: "Maul of Fury", type: "stat", stat: "damage", icon: "🔨", level: 23 },
			{ name: "Kabuto's Hammer", type: "stat", stat: "damage", icon: "⚒️", level: 27 },
			{ name: "Blade of Valor", type: "stat", stat: "damage", icon: "⚔️", level: 33 },
			{ name: "Tidebreaker", type: "stat", stat: "damage", icon: "🌊", level: 37 },
			{ name: "Viper's Fang", type: "stat", stat: "damage", icon: "🐍", level: 43 },
			{ name: "Starshard Bow", type: "stat", stat: "damage", icon: "🌠", level: 47 },
			{ name: "Eclipse Scythe", type: "stat", stat: "damage", icon: "🌑", level: 53 },
			{ name: "Thunderstrike Axe", type: "stat", stat: "damage", icon: "⚡", level: 57 },
			{ name: "Frostbite Dagger", type: "stat", stat: "damage", icon: "❄️", level: 63 },
			{ name: "Soulreaper Scythe", type: "stat", stat: "damage", icon: "☠️", level: 67 },
			{ name: "Phoenixfire Wand", type: "stat", stat: "damage", icon: "🔥", level: 73 },
			{ name: "Voidblade Katana", type: "stat", stat: "damage", icon: "🌌", level: 77 },
			{ name: "Doomhammer", type: "stat", stat: "damage", icon: "💀", level: 83 },
			{ name: "Divine Staff", type: "stat", stat: "damage", icon: "✨", level: 87 },
			{ name: "Excalibur", type: "stat", stat: "damage", icon: "⚔️", level: 93 },
			{ name: "Blade of Eternity", type: "stat", stat: "damage", icon: "♾️", level: 97 },
			{ name: "Scepter of the Ancients", type: "stat", stat: "damage", icon: "👑", level: 100 },
			// Armor items
			{ name: "Elven Robes", type: "stat", stat: "defense", icon: "🧝", level: 3 },
			{ name: "Phoenix Feather Armor", type: "stat", stat: "defense", icon: "🐦", level: 7 },
			{ name: "Dragon Scale Armor", type: "stat", stat: "defense", icon: "🐉", level: 13 },
			{ name: "Celestial Plate Armor", type: "stat", stat: "defense", icon: "✨", level: 17 },
			{ name: "Shadowguard Vestments", type: "stat", stat: "defense", icon: "👥", level: 23 },
			{ name: "Tiger Claw Armor", type: "stat", stat: "defense", icon: "🐯", level: 27 },
			{ name: "Voidweaver Garb", type: "stat", stat: "defense", icon: "🌑", level: 33 },
			{ name: "Stormsteel Armor", type: "stat", stat: "defense", icon: "⚡", level: 37 },
			{ name: "Obsidian Scalemail", type: "stat", stat: "defense", icon: "🌋", level: 43 },
			{ name: "Spiritwalker's Robes", type: "stat", stat: "defense", icon: "👻", level: 47 },
			{ name: "Lionheart Plate", type: "stat", stat: "defense", icon: "🦁", level: 53 },
			{ name: "Shadowbane Vestments", type: "stat", stat: "defense", icon: "🌑", level: 57 },
			{ name: "Phoenixfire Robes", type: "stat", stat: "defense", icon: "🔥", level: 63 },
			{ name: "Voidshroud Armor", type: "stat", stat: "defense", icon: "🌌", level: 67 },
			{ name: "Soulweave Vestments", type: "stat", stat: "defense", icon: "🌑", level: 73 },
			{ name: "Divine Aegis", type: "stat", stat: "defense", icon: "✨", level: 77 },
			{ name: "Crystal Guardian", type: "stat", stat: "defense", icon: "💎", level: 83 },
			{ name: "Titanium Fortress", type: "stat", stat: "defense", icon: "🗼", level: 87 },
			{ name: "Ethereal Shroud", type: "stat", stat: "defense", icon: "🌌", level: 93 },
			{ name: "Infinity Armor", type: "stat", stat: "defense", icon: "♾️", level: 97 },
			{ name: "Celestial Garb", type: "stat", stat: "defense", icon: "🌟", level: 100 }
		],
		gatheringItems: [
			{ name: "Healing Herb", type: "gathering", level: 1, icon: "🌿" },
			{ name: "Green Leaf", type: "gathering", level: 1, icon: "🍀" },
			{ name: "Glowing Fungus", type: "gathering", level: 1, icon: "🍄" },
			{ name: "Shimmering Petals", type: "gathering", level: 1, icon: "🌺" },
			{ name: "Morning Dew", type: "gathering", level: 1, icon: "🌞" },
			{ name: "Dandelion Fluff", type: "gathering", level: 1, icon: "🌼" },
			{ name: "Mystic Mushroom", type: "gathering", level: 2, icon: "🍄" },
			{ name: "Enchanted Moss", type: "gathering", level: 2, icon: "🍂" },
			{ name: "Soothing Berries", type: "gathering", level: 2, icon: "🍇" },
			{ name: "Gleaming Stones", type: "gathering", level: 2, icon: "💎" },
			{ name: "Golden Petals", type: "gathering", level: 2, icon: "🌼" },
			{ name: "Silverleaf", type: "gathering", level: 3, icon: "🍃" },
			{ name: "Moonlight Orchid", type: "gathering", level: 3, icon: "🌕" },
			{ name: "Twilight Berries", type: "gathering", level: 3, icon: "🍇" },
			{ name: "Starlight Mushroom", type: "gathering", level: 3, icon: "✨" },
			{ name: "Dragon's Tongue", type: "gathering", level: 4, icon: "🐉" },
			{ name: "Serpent Scale", type: "gathering", level: 4, icon: "🐍" },
			{ name: "Dragonfire Bloom", type: "gathering", level: 4, icon: "🔥" },
			{ name: "Moonflower", type: "gathering", level: 5, icon: "🌼" },
			{ name: "Ghost Orchid", type: "gathering", level: 5, icon: "👻" },
			{ name: "Nightshade Berry", type: "gathering", level: 5, icon: "🌙" },
			{ name: "Basilisk's Breath", type: "gathering", level: 6, icon: "🐍" },
			{ name: "Basilisk Scale", type: "gathering", level: 6, icon: "🐉" },
			{ name: "Venomous Petal", type: "gathering", level: 6, icon: "☠️" },
			{ name: "Phoenix Feather", type: "gathering", level: 7, icon: "🔥" },
			{ name: "Phoenix Ash", type: "gathering", level: 7, icon: "🌑" },
			{ name: "Witch's Thistle", type: "gathering", level: 7, icon: "🧙‍♀️" },
			{ name: "Enchanted Vines", type: "gathering", level: 8, icon: "🌿" },
			{ name: "Arcane Essence", type: "gathering", level: 8, icon: "✨" },
			{ name: "Eternal Blossom", type: "gathering", level: 9, icon: "🌸" },
			{ name: "Celestial Petal", type: "gathering", level: 9, icon: "🌟" },
			{ name: "Starfire Crystal", type: "gathering", level: 10, icon: "💫" },
			{ name: "Moonlight Essence", type: "gathering", level: 10, icon: "🌕" }
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
		]
	}
};

const gameConfigData = gameConfig[game];

const areas = gameConfigData.areas;
const enemies = gameConfigData.enemies;
const bosses = gameConfigData.bosses;
const itemsList = gameConfigData.itemsList;
const gatheringItems = gameConfigData.gatheringItems;
const peopleInNeed = gameConfigData.peopleInNeed;
const aidRequests = gameConfigData.aidRequests;
const enemyDescriptors = gameConfigData.enemyDescriptors;
const groupPhrases = gameConfigData.groupPhrases;
const actionVerbs = gameConfigData.actionVerbs;
const locations = gameConfigData.locations;
const challengeVerbs = gameConfigData.challengeVerbs;
const randomEnemies = gameConfigData.randomEnemies;

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
/*
function getRandomIngredient(level, statIndex, ingredientIndex) {
	const seed = `${level}${statIndex}${ingredientIndex}`;
	const rng = xorshift128plus(seed);
	const filteredItems = gatheringItems.filter(item => item.level <= level * 2);
	const randomIndex = Math.floor(rng() * filteredItems.length);
	return filteredItems[randomIndex];
}

function generateRecipe(level, statIndex) {
	const ingredients = [];
	const ingredientCount = level * 2;
	for (let ingredientIndex = 0; ingredientIndex < ingredientCount; ingredientIndex++) {
		const item = getRandomIngredient(level, statIndex, ingredientIndex);
		ingredients.push(item);
	}
	return ingredients;
}

function generateRecipes() {
	const recipes = {};

	for (let statIndex = 0; statIndex < statNames.length; statIndex++) {
		const stat = statNames[statIndex];
		recipes[stat] = [];
		for (let level = 1; level <= 5; level++) {
			recipes[stat].push(generateRecipe(level, statIndex));
		}
	}

	return recipes;
}

const recipes = generateRecipes();
*/


const hpDelay = 200;

// Player
const player = {
	name: "Player",
	level: 1,
	maxHP: 25,
	currentHP: 25,
	damage: 6,
	defense: 6,
	regeneration: 1,
	precision: 25,
	evasion: 25,
	critical: 0,
	resistance: 0,
	bonusExp: 0,
	bonusLoot: 0,
	damageItem: null,
	defenseItem: null,
	regenerationItem: null,
	precisionItem: null,
	evasionItem: null,
	criticalItem: null,
	resistanceItem: null,
	bonusExpItem: null,
	bonusLootItem: null,
	inventory: [],
	money: 0,
	experience: 0,
	currentArea: areas[0],
	gatheringXP: 0,
	craftingXP: 0
};
/*
// Function to regenerate player's HP every second
function regenerateHP() {
	if (player.currentHP < player.maxHP) {
		player.currentHP = Math.min(player.maxHP, player.currentHP + player.regeneration + calculateEquippedRegeneration());
		updatePlayerCurrentHP();
	}
}

// Function to update player's HP display
function updatePlayerCurrentHP() {
	const currentHPElement = document.getElementById("playerCurrentHP");
	currentHPElement.textContent = player.currentHP;
}

function hpLoop() {
	regenerateHP();

	// Wait for a specified delay before displaying the next message
	setTimeout(hpLoop, hpDelay);
}
*/
// Function to handle leveling up and increasing player stats
/*
function levelUp() {
	player.maxHP += 5;
	player.currentHP = player.maxHP;
	player.damage += 2;
	player.defense += 2;
	if (player.level % 5 == 0) player.precision += 1;
	if (player.level % 5 == 0) player.evasion += 1;
	if (player.level % 10 == 0) player.regeneration += 1;
	if (player.level % 5 == 0) player.critical += 1;
	if (player.level % 5 == 0) player.resistance += 1;
	updateGameInfo(`Congratulations! You leveled up to level ${player.level}.`);
	updatePlayerStats();
}

function checkLevelUp() {
	const currentLevel = player.level;
	const experiencePoints = player.experience;

	for (let i = 0; i < levelUpRequirements.length; i++) {
		const requirement = levelUpRequirements[i];
		if (currentLevel < requirement.level && experiencePoints >= requirement.experience) {
			player.level = requirement.level;
			player.experience = requirement.experience;
			levelUp();
			updatePlayerStats();
			break;
		}
	}
}
*/

// Function to update player stats on the screen
/*
function updatePlayerStats() {
	document.getElementById("playerCurrentArea").textContent = player.currentArea.name;
	document.getElementById("playerLevel").textContent = player.level;
	document.getElementById("playerCurrentHP").textContent = player.currentHP;
	document.getElementById("playerMaxHP").textContent = player.maxHP;
	document.getElementById("playerRegeneration").textContent = `${player.regeneration} (+${calculateEquippedRegeneration()})`;
	document.getElementById("playerExperience").textContent = `${player.experience} / ${getNextLevelExperience()}`;
	document.getElementById("playerMoney").textContent = player.money;
	updatePlayerCurrentHP();
}*/

/*
function getNextLevelExperience() {
	const nextLevelRequirement = levelUpRequirements.find((requirement) => requirement.level === player.level + 1);
	return nextLevelRequirement ? nextLevelRequirement.experience : "MAX";
}
*/

/*
function calculateEquippedStat(itemType) {
	const item = player[itemType + "Item"];
	if (item) {
		switch (itemType) {
			case "defense":
			case "damage":
				return item.level;
			case "regeneration":
				return item.level / 25;
			case "precision":
			case "evasion":
				return item.level / 3;
			case "critical":
			case "resistance":
				return item.level / 2;
			case "bonusExp":
			case "bonusLoot":
				return item.level;
			default:
				return 0;
		}
	} else {
	 	return 0;
	}
}

const calculateEquippedDefense = () => calculateEquippedStat("defense");
const calculateEquippedDamage = () => calculateEquippedStat("damage");
const calculateEquippedRegeneration = () => calculateEquippedStat("regeneration");
const calculateEquippedPrecision = () => calculateEquippedStat("precision");
const calculateEquippedEvasion = () => calculateEquippedStat("evasion");
const calculateEquippedCritical = () => calculateEquippedStat("critical");
const calculateEquippedResistance = () => calculateEquippedStat("resistance");
const calculateEquippedBonusExp = () => calculateEquippedStat("bonusExp");
const calculateEquippedBonusLoot = () => calculateEquippedStat("bonusLoot");
*/

/*
const getItemValue = (item) => {
	const { type, stat, level } = item;

	if (type === "stat") {
		switch (stat) {
			case "defense":
			case "damage":
				return level * 20;
			case "precision":
			case "evasion":
				return level * 10;
			case "critical":
			case "resistance":
				return level * 5;
			case "bonusExp":
			case "bonusLoot":
				return level * 50;
			case "regeneration":
				return level * 100;
			default:
				return 0;
		}
	} else if (type === "gathering") {
		return level * 2;
	} else {
		return 0;
	}
};
*/
/*
const calculateItemCost = (item) => Math.ceil(getItemValue(item));
const calculateItemSellPrice = (item) => Math.ceil(getItemValue(item) / 2);
*/

// Enemies
/*
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
};

const getAttributeValue = (enemy, attribute) => {
	const level = enemy.level;
	const group = Math.ceil(level / 10);
	const factorIndex = (level - 1) % 10;
	const groupFactorIndex = group - 1;
	const factor = ATTRIBUTES[attribute].factors[factorIndex];
	const groupFactor = ATTRIBUTES[attribute].groupFactors[groupFactorIndex];
	return Math.floor(ATTRIBUTES[attribute].base + (level - 1) * factor + groupFactor);
};

const getEnemyMaxHP = (enemy) => getAttributeValue(enemy, 'maxHP');
const getEnemyDamage = (enemy) => getAttributeValue(enemy, 'damage');
const getEnemyDefense = (enemy) => getAttributeValue(enemy, 'defense');
const getEnemyPrecision = (enemy) => getAttributeValue(enemy, 'precision');
const getEnemyEvasion = (enemy) => getAttributeValue(enemy, 'evasion');
const getEnemyCritical = (enemy) => getAttributeValue(enemy, 'critical');
const getEnemyResistance = (enemy) => getAttributeValue(enemy, 'resistance');
const getEnemyLootChance = (enemy) => getAttributeValue(enemy, 'lootChance');

const generateEnemyInfo = (enemy) => `An enemy ${enemy.icon} ${enemy.name} has appeared!\n` +
	   `It has ${getEnemyMaxHP(enemy)} HP, ${getEnemyDamage(enemy)} DAM, ${getEnemyDefense(enemy)} DEF, ${getEnemyPrecision(enemy)} PRE, ${getEnemyEvasion(enemy)} EVA, ${getEnemyCritical(enemy)} CRI, ${getEnemyResistance(enemy)} RES`;

// Function to generate a random enemy based on player's level
function findEntitiesInAreaAndLevelRange(entities, maxLevel, isBoss = false) {
	const validatedMaxLevel = Math.max(1, maxLevel);
	const playerCurrentAreaIndex = areas.findIndex((area) => area === player.currentArea);

	const eligibleEntities = entities.filter((entity) => {
		const entityAreaIndex = Math.floor((entity.level - 1) / 10);
		return entityAreaIndex === playerCurrentAreaIndex && entity.level <= validatedMaxLevel && (isBoss ? entity.level % 10 === 0 : true);
	});

	if (eligibleEntities.length === 0) {
		const firstEnemyOfArea = entities.find((entity) => {
			const entityAreaIndex = Math.floor((entity.level - 1) / 10);
			return entityAreaIndex === playerCurrentAreaIndex;
		});
		return firstEnemyOfArea ? [firstEnemyOfArea] : [];
	}

	return eligibleEntities;
}

function generateEntity(entities) {
	return entities[Math.floor(Math.random() * entities.length)];
}

function generateEnemy(maxLevel) {
	const eligibleEnemies = findEntitiesInAreaAndLevelRange(enemies, maxLevel);
	return generateEntity(eligibleEnemies);
}

function generateRandomEnemy(playerLevel) {
	const randomIndex = Math.floor(Math.random() * randomEnemies.length);
	const enemy = randomEnemies[randomIndex];
	return { name: enemy.name, level: playerLevel, icon: enemy.icon, currentHP: 0 };
}

function generateBoss(maxLevel) {
	const eligibleBosses = findEntitiesInAreaAndLevelRange(bosses, maxLevel, true);
	return generateEntity(eligibleBosses);
}

// Function to handle the battle between the player and an enemy
function battle(enemy) {
	const maxTurns = 10000;
	let turns = 0;
	const basePlayerDamage = player.damage + calculateEquippedDamage();
	const basePlayerDefense = player.defense + calculateEquippedDefense();
	const basePlayerPrecision = player.precision + calculateEquippedPrecision();
	const basePlayerEvasion = player.evasion + calculateEquippedEvasion();
	const basePlayerCritical = player.critical + calculateEquippedCritical();
	const basePlayerResistance = player.resistance + calculateEquippedResistance();

	const baseEnemyDamage = getEnemyDamage(enemy);
	const baseEnemyDefense = getEnemyDefense(enemy);
	const baseEnemyPrecision = getEnemyPrecision(enemy);
	const baseEnemyEvasion = getEnemyEvasion(enemy);
	const baseEnemyCritical = getEnemyCritical(enemy);
	const baseEnemyResistance = getEnemyResistance(enemy);

	const playerDamageReduction = calculateDamageReduction(basePlayerDefense);
	const enemyDamageReduction = calculateDamageReduction(baseEnemyDefense);

	const playerDamage = Math.ceil(Math.max(basePlayerDamage * (1 - enemyDamageReduction), 1));
	const enemyDamage = Math.ceil(Math.max(baseEnemyDamage * (1 - playerDamageReduction), 1));

	const playerHitChance = calculateHitChance(playerDamage, baseEnemyDefense, basePlayerPrecision, baseEnemyEvasion);
	const enemyHitChance = calculateHitChance(enemyDamage, basePlayerDefense, baseEnemyPrecision, basePlayerEvasion);

	while (player.currentHP > 0 && enemy.currentHP > 0 && turns < maxTurns) {
		// Player's Turn
		if (Math.random() < playerHitChance) {
			let playerDamageDealt = playerDamage;
			if (Math.random() < player.critical / 100) {
				const criticalMultiplier = 1 + (player.critical / 100);
				playerDamageDealt = Math.ceil(playerDamageDealt * criticalMultiplier);
				updateGameInfo(`Critical Hit! You attack the ${enemy.icon} ${enemy.name} dealing ${playerDamageDealt} damage!`);
			} else {
				updateGameInfo(`You attack the ${enemy.icon} ${enemy.name} dealing ${playerDamageDealt} damage!`);
			}

			// Enemy's Damage Absorption
			if (Math.random() < baseEnemyResistance / 100) {
				const absorptionMultiplier = 1 - (baseEnemyResistance / 100);
				const resistanceedDamage = Math.ceil(playerDamageDealt * (1 - absorptionMultiplier));
				playerDamageDealt -= resistanceedDamage;
				updateGameInfo(`The ${enemy.icon} ${enemy.name} resistanceed ${resistanceedDamage} of your damage!`);
			}

			enemy.currentHP -= playerDamageDealt;
		}

		// Enemy's Turn
		if (Math.random() < enemyHitChance) {
			let enemyDamageDealt = enemyDamage;
			if (Math.random() < enemy.critical / 100) {
				const criticalMultiplier = 1 + (enemy.critical / 100);
				enemyDamageDealt = Math.ceil(enemyDamageDealt * criticalMultiplier);
				updateGameInfo(`Critical Hit! The ${enemy.icon} ${enemy.name} attacks you dealing ${enemyDamageDealt} damage!`);
			} else {
				updateGameInfo(`The ${enemy.icon} ${enemy.name} attacks you dealing ${enemyDamageDealt} damage!`);
			}

			// Apply damage absorption
			if (Math.random() < basePlayerResistance / 100) {
				const absorptionMultiplier = 1 - (basePlayerResistance / 100);
				const resistanceedDamage = Math.ceil(enemyDamageDealt * (1 - absorptionMultiplier));
				enemyDamageDealt -= resistanceedDamage;
				updateGameInfo(`You resistanceed ${resistanceedDamage} of enemy damage!`);
			}
			
			player.currentHP -= enemyDamageDealt;
		}

		turns++;
	}

	if (player.currentHP <= 0) {
		updateGameInfo("You were defeated!");
	} else if (enemy.currentHP <= 0) {
		updateGameInfo(`You defeated the ${enemy.icon} ${enemy.name}!`);
		const lootChance = getEnemyLootChance(enemy) * (1 + player.bonusLoot / 100);

		if (Math.random() < lootChance) {
			const loot = generateLoot(enemy.level);
			if (loot) {
				player.inventory.push(loot);
				updateGameInfo(`You found a loot: ${loot.name}!`);
			}
		}

		if (Math.random() < lootChance * 4) {
			const moneyAmount = enemy.level * 4;
			player.money += moneyAmount;
			updateGameInfo(`You found money : ${moneyAmount}!`);
		}
	} else {
		updateGameInfo("The battle ended in a draw.");
	}
}

function calculateDamageReduction(defense){
	return defense / (defense + 50);
}

function calculateHitChance(attackerAttack, defenderDefense, attackerPrecision, defenderEvasion) {
	const baseHitChance = 0.8; // Base hit chance value
	const maxHitChance = 0.95; // Maximum hit chance value
	const minHitChance = 0.05; // Minimum hit chance value

	// Calculate hit chance modifiers based on attacker's precision and defender's evasion
	const precisionModifier = attackerPrecision - defenderEvasion;
	const hitChanceModifier = precisionModifier * 0.01; // Modify hit chance by 1% per point of precision difference

	// Calculate hit chance based on attacker's attack, defender's defense, and hit chance modifiers
	let hitChance = baseHitChance + hitChanceModifier;

	// Adjust hit chance based on attack and defense difference
	const attackDefenseDifference = attackerAttack - defenderDefense;
	if (attackDefenseDifference > 0) {
	  hitChance += attackDefenseDifference * 0.005; // Increase hit chance by 0.5% per point of attack-defense difference
	} else {
	  hitChance -= Math.abs(attackDefenseDifference) * 0.005; // Decrease hit chance by 0.5% per point of defense-attack difference
	}

	// Limit hit chance within the minimum and maximum values
	hitChance = Math.max(minHitChance, Math.min(hitChance, maxHitChance));

	return hitChance;
}

// Function to generate loot
function generateLoot(level) {
	const filteredItems = itemsList.filter((item) => item.level <= level);
	
	if (filteredItems.length === 0) {
		return null;
	}
	
	const randomIndex = Math.floor(Math.random() * filteredItems.length);
	return filteredItems[randomIndex];
}

function performBattle(enemy) {
	updateGameInfo(generateEnemyInfo(enemy));
	enemy.currentHP = getEnemyMaxHP(enemy);
	battle(enemy);
	battleAndCheckResult(enemy);
}

function battleAndCheckResult(enemy) {
	if (player.currentHP > 0) {
		if (enemy.currentHP <= 0) {
			const experiencePoints = calculateExperiencePoints(enemy);
			player.experience += experiencePoints;
			updatePlayerStats();
			updateGameInfo(`You defeated the ${enemy.icon} ${enemy.name} and gained ${experiencePoints} experience points!`);
			checkLevelUp();
		} else {
			updateGameInfo(`The battle with the ${enemy.icon} ${enemy.name} ended prematurely. The enemy escaped!`);
		}
	} else {
	  updateGameInfo("You were defeated!");
	}
}

// Function to calculate experience points gained from defeating an enemy
function calculateExperiencePoints(enemy) {
	const baseExperience = 25;
	const enemyLevel = enemy.level;

	// Calculate the level difference between player and enemy
	const levelDifference = player.level - enemy.level;

	// Determine the adjustment factor based on the level difference
	const adjustmentFactor = levelDifference >= 0 ? 1 / (1 + levelDifference) : 1 - levelDifference / playerLevel;

	// Apply the adjustment factor to the experience points
	const experiencePoints = Math.floor(baseExperience * enemyLevel * adjustmentFactor * (1 + player.bonusExp / 100));

	return experiencePoints;
}

function startExploration() {
	updateGameInfo(`Starting exploration...`);
	const enemy = generateEnemy(player.level);
	performBattle(enemy);
}

function startChallenge() {
	updateGameInfo("Starting the challenge...");
	const boss = generateBoss(player.level);
	performBattle(boss);
}

function startMission() {
	updateGameInfo("Starting the mission...");
	const enemy = generateEnemy(player.level - 2);
	const numEnemies = getRandomNumber(2, 3);
	updateGameInfo(generateRandomIntro(enemy.name, numEnemies));
	let totalReward = 0;
	let isMissionFailed = false;

	for (let i = 0; i < numEnemies; i++) {
		performBattle(enemy);

		if (player.currentHP <= 0) {
			isMissionFailed = true;
			break;
		}

		totalReward += calculateMissionReward(enemy, numEnemies);
	}

	if (!isMissionFailed) {
		updateGameInfo(`Mission completed! Total reward: ${totalReward} coins.`);
		player.money += totalReward;
		updatePlayerStats();
	} else {
		updateGameInfo("Mission failed! You were defeated.");
	}
}

function generateRandomIntro(enemyType, numEnemies) {
	const personInNeed = peopleInNeed[Math.floor(Math.random() * peopleInNeed.length)];
	const aidRequest = aidRequests[Math.floor(Math.random() * aidRequests.length)];
	const enemyDescriptor = enemyDescriptors[Math.floor(Math.random() * enemyDescriptors.length)];
	const groupPhrase = groupPhrases[Math.floor(Math.random() * groupPhrases.length)];
	const actionVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
	const location = locations[Math.floor(Math.random() * locations.length)];

	return `${personInNeed} ${aidRequest}! ${groupPhrase} ${numEnemies} ${enemyDescriptor} ${enemyType} is ${actionVerb} ${location}!`;
}

function calculateMissionReward(enemy, numEnemies) {
	const enemyLevel = enemy.level;
	const playerLevel = player.level;
	
	const baseReward = numEnemies * 10; // Base reward based on the number of enemies
	
	// Calculate the level difference modifier
	const levelDifference = playerLevel - enemyLevel;
	let levelModifier = 1;
	
	if (levelDifference > 0) {
		levelModifier -= levelDifference * 0.1;
	}
	
	// Calculate the final reward
	const finalReward = Math.max(1, Math.round(baseReward * levelModifier));
	
	return finalReward;
}

function startDuel() {
	const enemy = generateRandomEnemy(player.level);
	updateGameInfo(generateDuelChallengeSentence(enemy));
	
	performBattle(enemy);
	
	if (player.currentHP > 0) {
	  const rewardXP = calculateDuelRewardXP(enemy);
	  player.experience += rewardXP;
	  updateGameInfo(`Duel won! You gained ${rewardXP} bonus XP.`);
	} else {
	  updateGameInfo("Duel lost! You were defeated.");
	}
}

function generateDuelChallengeSentence(enemy) {
	const challengeVerbs = ["challenges", "defies", "dares", "provokes", "taunts"];
	const challengeVerb = challengeVerbs[Math.floor(Math.random() * challengeVerbs.length)];
	
	return `${enemy.name} (${enemy.icon}) ${challengeVerb} you to a duel!`;
}

function calculateDuelRewardXP(enemy) {
	return calculateExperiencePoints(enemy) * 2;
}
*/

/* function startEncounter() {
	updateGameInfo("You engage in the encounter...");
	const numEnemies = getRandomNumber(2, 3);
	let defeatedEnemies = 0;
	let isEncounterFailed = false;

	for (let i = 0; i < numEnemies; i++) {
		const enemy = generateEnemy(player.level - 2);
		performBattle(enemy);

		if (player.currentHP <= 0) {
			isEncounterFailed = true;
			break;
		}

		if (enemy.currentHP <= 0) {
			defeatedEnemies++;
		} else {
			break;
		}
	}

	updateGameInfo(`Encounter completed!`);

	if (isEncounterFailed) {
		updateGameInfo("Encounter failed! You were defeated.");
	} else {
		updateGameInfo("Encounter completed!");
	
		if (player.currentHP > 0) {
			for (let i = 0; i < defeatedEnemies; i++) {
				if (Math.random() < 0.5) {
					const loot = generateLoot(player.level);
					if (loot){
						player.inventory.push(loot);
						updateGameInfo(`You received ${loot.name} as loot.`);
					}
				}
			}
		}
	}
} */

/*
function showAreasScreen() {
	updateGameInfo(`You are currently in ${player.currentArea.name}.`);

	const areaList = document.getElementById("area-list");
	areaList.innerHTML = "";

	areas.map(area => {
		const areaButton = document.createElement("button");
		areaButton.textContent = area.name;
		areaButton.addEventListener("click", () => {
			player.currentArea = area;
			updateGameInfo(`You have entered the ${area.name}.`);
			updateGameInfo(`${area.description}.`);
			updatePlayerStats();
		});
		areaList.appendChild(areaButton);
	});

	showScreen("areas-screen");
}
*/

/*
function showGatherScreen() {
	const gatherItems = document.getElementById("gather-item-list");
	gatherItems.innerHTML = "";

	updateGameInfo("You are now gathering resources.");

	const maxGatherLevel = getMaxGatherLevel(player);

	const itemList = document.createElement("ul");
	for (const item of gatheringItems) {
		const listItem = document.createElement("li");
		listItem.innerHTML = `${item.name} ${item.icon} (Level ${item.level})<br><small>${item.level <= maxGatherLevel ? "You can gather this item." : "You can't gather this item yet."}</small>`;
		itemList.appendChild(listItem);
	}

	gatherItems.appendChild(itemList);
	
	showScreen("gather-screen");
}

function getMaxGatherLevel(player) {
	return Math.max(Math.floor(player.gatheringXP / 1000), 1);
}

function gatherResource() {
	const maxGatherLevel = getMaxGatherLevel(player);
	const availableItems = gatheringItems.filter(item => item.level <= maxGatherLevel);
	const randomIndex = Math.floor(Math.random() * availableItems.length);
	const gatheredItem = availableItems[randomIndex];
	
	const levelDifference = maxGatherLevel - gatheredItem.level;
	const extraGatherChance = Math.min(0.5, levelDifference * 0.05);
	let totalGathers = 1 + Math.floor(Math.random() * (levelDifference + 1));
	totalGathers = Math.min(totalGathers, 10);
	
	const xpGained = Math.max(1, 5 - levelDifference);

	updateGameInfo(`You gathered ${totalGathers} ${gatheredItem.name}.`);
	
	player.gatheringXP += xpGained * totalGathers;
	const gatheringXPDisplay = document.getElementById("gathering-xp");
	gatheringXPDisplay.textContent = `Gathering XP: ${player.gatheringXP}`;
	
	for (let i = 0; i < totalGathers; i++) {
		player.inventory.push(gatheredItem);
	}
}
*/

/*
function showCraftingScreen() {
	const craftingRecipes = document.getElementById("crafting-recipes-list");
	craftingRecipes.innerHTML = "";
	
	const craftingRecipesDiv = document.createElement("div");
	
	for (const stat of statNames) {
		const statDetails = document.createElement("details");
		const statSummary = document.createElement("summary");
		statSummary.textContent = `${stat} Recipes`;
		statDetails.appendChild(statSummary);
	
		for (const level in recipes[stat]) {
			const levelRecipe = recipes[stat][level];
			const recipeBtn = document.createElement("button");

			// Create a div to hold the ingredient icons inside the button
			const ingredientsDiv = document.createElement("div");

			for (const ingredient of levelRecipe) {
				const ingredientIcon = document.createElement("span");
				ingredientIcon.textContent = ingredient.icon;
				ingredientsDiv.appendChild(ingredientIcon);
			}

			// Append the ingredients div to the button's innerHTML
			recipeBtn.innerHTML = `Craft of ${stat} ${level}<br>${ingredientsDiv.innerHTML}`;

			recipeBtn.addEventListener("click", () => craftRecipe(levelRecipe));

			statDetails.appendChild(recipeBtn);
		}
	
		craftingRecipesDiv.appendChild(statDetails);
	}
	
	craftingRecipes.appendChild(craftingRecipesDiv);
	
	showScreen("crafting-screen");
}

// Function to handle crafting a recipe
function craftRecipe(recipe) {
	// Check if the player has enough ingredients for the recipe
	if (checkIngredients(recipe)) {
		// Deduct the ingredients from the player's inventory
		deductIngredients(recipe);
		// Increase the player's craftingXP when a recipe is crafted
		player.craftingXP += 5;
		// Implement the crafting logic here (apply effects, add crafted item to the inventory, etc.)
		// @todo
		// Show a success message to the player
		updatePlayerCraftingXP();
	} else {
		// Show a message to the player indicating they don't have enough ingredients
	  	updateGameInfo("You don't have enough ingredients to craft this item.");
	}
}

// Function to check if the player has enough ingredients to craft a recipe
function checkIngredients(ingredients) {
	// Count the occurrences of each ingredient in the recipe
	const recipeCounts = {};
	ingredients.forEach((ingredient) => {
		recipeCounts[ingredient.name] = (recipeCounts[ingredient.name] || 0) + 1;
	});
	
	// Count the occurrences of each ingredient in the player's inventory
	const inventoryCounts = {};
	player.inventory.forEach((item) => {
		inventoryCounts[item.name] = (inventoryCounts[item.name] || 0) + 1;
	});
	
	// Check if the player has enough of each ingredient in the inventory
	return Object.keys(recipeCounts).every((ingredientName) => {
		const requiredQuantity = recipeCounts[ingredientName];
		const countInInventory = inventoryCounts[ingredientName] || 0;
		return countInInventory >= requiredQuantity;
	});
}
	
// Function to deduct the ingredients from the player's inventory when crafting
function deductIngredients(ingredients) {
	ingredients.forEach((ingredient) => {
		// Find the first item with the same name in the player's inventory and remove it
		const index = player.inventory.findIndex((item) => item.name === ingredient.name);
		if (index !== -1) {
			player.inventory.splice(index, 1);
		}
	});
}

// Function to update the display of player's craftingXP
function updatePlayerCraftingXP() {
  const craftingXPDisplay = document.getElementById("crafting-xp");
  craftingXPDisplay.textContent = `Crafting XP: ${player.craftingXP}`;
}
*/

// Function to handle the inventory screen
/*
function showInventoryScreen() {
	const inventory = document.getElementById("item-list");
	inventory.innerHTML = "";
	
	const equippedItems = {};
	for (const statName of statNames) {
	  equippedItems[statName] = player[`${statName}Item`];
	}

	for (const item of player.inventory) {
		const { icon, name, stat } = item;
		const itemElement = document.createElement("div");
		itemElement.textContent = `${icon} ${name}`;
	
		if (equippedItems[stat] === item) {
			itemElement.classList.add("equipped");
		}
	
		itemElement.addEventListener("click", () => {
			equipItem(item);
		});
		inventory.appendChild(itemElement);
	}
	
	showScreen("inventory-screen");
}

// Function to equip an item from the inventory
function equipItem(item) {
	const { icon, name, stat } = item;
	const playerProperty = `${stat}Item`;

	if (player.hasOwnProperty(playerProperty)) {
		player[playerProperty] = item;
		updateGameInfo(`Equipped ${playerProperty}: ${icon} ${name}`);
	} else {
		console.log(`Unsupported item type: "stat", stat: ${stat}`);
	}

	updatePlayerStats();
	showInventoryScreen();
}
*/

/*
// Function to handle the buy screen
function showBuyScreen() {
	const shopItems = document.getElementById("shop-item-list");
	shopItems.innerHTML = "";
	
	filteredItems = itemsList.filter((shopItem) => shopItem.level >= player.level - 15 && shopItem.level <= player.level);

	// Display items available for purchase
	for (let i = 0; i < filteredItems.length; i++) {
		const item = filteredItems[i];
		const itemElement = document.createElement("button");
		itemElement.textContent = `${item.icon} ${item.name} - Cost: ${calculateItemCost(item)}`;
		itemElement.classList.add("item");
	
		itemElement.addEventListener("click", () => {
			buyItem(item);
		});

		shopItems.appendChild(itemElement);
	}
	
	showScreen("buy-screen");
}

// Function to buy an item from the shop
function buyItem(item) {
	const itemCost = calculateItemCost(item);
	if (player.money >= itemCost) {
		player.money -= itemCost;
		player.inventory.push(item);
		updateGameInfo(`You bought ${item.name}.`);
		updatePlayerStats();
	} else {
		updateGameInfo("Not enough money to buy this item.");
	}
	showBuyScreen();
}
*/

// Function to handle the sell screen
/*
function showSellScreen() {
	const sellItems = document.getElementById("sell-item-list");
	sellItems.innerHTML = "";

	// Display items available for selling
	for (let i = 0; i < player.inventory.length; i++) {
		const item = player.inventory[i];
		const itemElement = document.createElement("button");
		itemElement.textContent = `${item.icon} ${item.name} - Value: ${calculateItemSellPrice(item)}`;
		itemElement.classList.add("item");

		itemElement.addEventListener("click", () => {
			sellItem(item);
		});

		sellItems.appendChild(itemElement);
	}

	showScreen("sell-screen");
}

// Function to sell an item
function sellItem(item) {
	const itemIndex = player.inventory.indexOf(item);
	if (itemIndex !== -1) {
		const itemValue = calculateItemSellPrice(item);
		player.money += itemValue;
		player.inventory.splice(itemIndex, 1);
		updateGameInfo(`You sold ${item.name} for ${itemValue} money.`);
		updatePlayerStats();
	}
	showSellScreen();
}
*/

/*
// Function to show the stats screen
function showStatsScreen() {
	const statList = document.getElementById("playerStatsList");
	statList.innerHTML = "";

	const stats = [
		{ label: "Level", value: `🎚 ${player.level}` },
		{ label: "HP", value: `💖 ${player.currentHP} / ${player.maxHP}` },
		{ label: "Regeneration", value: `💚 ${player.regeneration} (+${calculateEquippedRegeneration()})` },
		{ label: "Damage", value: `⚔️ ${player.damage} (+${calculateEquippedDamage()})` },
		{ label: "Defense", value: `🛡️ ${player.defense} (+${calculateEquippedDefense()})` },
		{ label: "Precision", value: `🎯 ${player.precision} (+${calculateEquippedPrecision()})` },
		{ label: "Evasion", value: `🌪️ ${player.evasion} (+${calculateEquippedEvasion()})` },
		{ label: "Critical", value: `💥 ${player.critical} (+${calculateEquippedCritical()})` },
		{ label: "Resistance", value: `🔒 ${player.resistance} (+${calculateEquippedResistance()})` },
		{ label: "Experience", value: `🌟 ${player.experience} / ${getNextLevelExperience()}` },
		{ label: "Bonus Exp", value: `💫 ${player.bonusExp} (+${calculateEquippedBonusExp()})` },
		{ label: "Bonus Loot", value: `🏆 ${player.bonusLoot} (+${calculateEquippedBonusLoot()})` }
	];

	// Create and append list items for each stat
	stats.forEach(stat => {
		const statItem = document.createElement("li");
		statItem.textContent = `${stat.label}: ${stat.value}`;
		statList.appendChild(statItem);
	});

	showScreen("stats-screen");
}
*/

/*
// Function to show the equipped items
function showEquippedScreen() {
	const equippedItemsList = document.getElementById("equippedItemsList");
	equippedItemsList.innerHTML = ""; // Clear the previous list items

	const equippedItems = [
		{ slot: "Damage", item: player.damageItem },
		{ slot: "Defense", item: player.defenseItem },
		{ slot: "Regeneration", item: player.regenerationItem },
		{ slot: "Precision", item: player.precisionItem },
		{ slot: "Evasion", item: player.evasionItem },
		{ slot: "Critical", item: player.criticalItem },
		{ slot: "Resistance", item: player.resistanceItem },
		{ slot: "Bonus Exp", item: player.bonusExpItem },
		{ slot: "Bonus Loot", item: player.bonusLootItem }
	];

	// Generate the HTML content for each equipped item and append it to the list
	equippedItems.forEach(({ slot, item }) => {
		const itemIconContent = item ? item.icon : "❌"; // Display a cross if the slot is empty
		const itemNameContent = item ? item.name : "Empty";
		const listItem = document.createElement("li");
		listItem.classList.add("equipped-item");
		listItem.innerHTML = `${itemIconContent} ${itemNameContent} [${slot}]`;
		equippedItemsList.appendChild(listItem);
	});

	showScreen("equipped-screen");
}
*/

// Function to handle the gambling logic
/*
function gambleMoney() {
	const gamblingCost = 10;
	if (gamblingCost <= player.money) {
		const symbols = ["🗡️", "🛡️", "🔮", "👑"]; // Array of symbols representing medieval fantasy elements
		const spinResult = []; // Array to store the spin result
		
		// Spin the slot machine
		for (let i = 0; i < 3; i++) {
			const randomIndex = Math.floor(Math.random() * symbols.length);
			spinResult.push(symbols[randomIndex]);
		}
		
		updateGameInfo("Spinning the slot machine...");
		updateGameInfo("Result: " + spinResult.join(" "));
		
		if (spinResult[0] === spinResult[1] && spinResult[1] === spinResult[2]) {
			// Player wins
			const winnings = gamblingCost * 3;
			player.money += winnings;
			updateGameInfo("Congratulations! You won " + winnings + " money!");
		} else {
			// Player loses
			player.money -= gamblingCost;
			updateGameInfo("Oh no! You lost " + gamblingCost + " money.");
		}

		updateGameInfo("Your current balance is: " + player.money + " money.");
		updatePlayerStats();
	} else {
		updateGameInfo("Not enough money to gamble.");
	}
}
*/
/*
function healForMoney() {
	// Check if the player's HP is already full
	if (player.currentHP === player.maxHP) {
		updateGameInfo("Your HP is already full!");
		return; // Exit the function early to avoid any further actions
	}

	// Deducting money and increasing health accordingly
	const healingCost = 10;
	if (player.money >= healingCost) {
		player.money -= healingCost;
		player.currentHP += 10; // Assuming each healing costs 10 money and heals 10 HP
		if (player.currentHP > player.maxHP) {
			player.currentHP = player.maxHP; // Ensure the HP doesn't exceed the maxHP
		}
		updateGameInfo("You've been healed!");
		updatePlayerStats();
	} else {
		updateGameInfo("You don't have enough money to heal!");
	}
}
*/

// Function to update the game information
/*
function updateGameInfo(message) {
	const gameInfoElement = document.getElementById("game-info");
	const messageElement = document.createElement("div");
	messageElement.innerHTML = message;
	messageElement.classList.add("game-message"); // Apply a CSS class for styling
	gameInfoElement.insertBefore(messageElement, gameInfoElement.firstChild);
}
*/

// Function to show the specified screen and hide other screens
/*
function showScreen(screenId) {
	const screens = document.querySelectorAll("#main-screens > div");
	for (let i = 0; i < screens.length; i++) {
		const screen = screens[i];
		if (screen.id === screenId) {
			screen.classList.remove("hidden");
		} else {
			screen.classList.add("hidden");
		}
	}
}

// Function to show the main screen
function showMainScreen() {
	showScreen("main-screen");
}
*/

// Function to save player data to localStorage
/*
function savePlayerData() {
	localStorage.setItem("playerData", JSON.stringify(player));
	alert("Player data saved!");
}

// Function to load player data from localStorage
function loadPlayerData() {
	const savedData = localStorage.getItem("playerData");
	if (savedData) {
		Object.assign(player, JSON.parse(savedData));
		updatePlayerStats();
		alert("Player data loaded!");
	} else {
		alert("No saved data found!");
	}
}

// Function to reset player data
function resetPlayerData() {
	localStorage.removeItem("playerData");
	location.reload(); // Refresh the page to reset the player object to its initial state
}
*/

// Initialize the game
function init() {
	/*
	updatePlayerStats();
	updateGameInfo("Fantasy Clicker Battles");

	// Add event listeners to buttons
	document.getElementById("btnExploration").addEventListener("click", startExploration);
	document.getElementById("btnChallenge").addEventListener("click", startChallenge);
	document.getElementById("btnMission").addEventListener("click", startMission);
	document.getElementById("btnDuel").addEventListener("click", startDuel);
	// document.getElementById("btnEncounter").addEventListener("click", startEncounter);
	document.getElementById("btnAreas").addEventListener("click", showAreasScreen);
	document.getElementById("btnStats").addEventListener("click", showStatsScreen);
	document.getElementById("btnEquipped").addEventListener("click", showEquippedScreen);
	document.getElementById("btnGather").addEventListener("click", showGatherScreen);
	document.getElementById("btnGatherr").addEventListener("click", gatherResource);
	document.getElementById("btnCraft").addEventListener("click", showCraftingScreen);
	document.getElementById("btnInventory").addEventListener("click", showInventoryScreen);
	document.getElementById("btnBuy").addEventListener("click", showBuyScreen);
	document.getElementById("btnSell").addEventListener("click", showSellScreen);
	document.getElementById("btnGamble").addEventListener("click", gambleMoney);
	document.getElementById("btnHeal").addEventListener("click", healForMoney);

	document.getElementById("btnExperience").addEventListener("click", () => {
		player.experience += 5000;
		updateGameInfo("Adding 5000 experience...");
		checkLevelUp();
	});

	document.getElementById("btnMoney").addEventListener("click", () => {
		player.money += 5000;
		updateGameInfo("Adding 5000 money...");
		updatePlayerStats();
	});

	document.getElementById("btnSave").addEventListener("click", savePlayerData);
	document.getElementById("btnLoad").addEventListener("click", loadPlayerData);
	document.getElementById("btnReset").addEventListener("click", resetPlayerData);
*/
	const backToMainButtons = document.querySelectorAll(".btnBackToMain");

	backToMainButtons.forEach((button) => {
		button.addEventListener("click", showMainScreen);
	});

	// Initialize the game
	updatePlayerStats();
	showMainScreen();

	// Start the HP regeneration loop
	hpLoop();
}

init();