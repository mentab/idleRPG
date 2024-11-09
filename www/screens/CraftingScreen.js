import { updateGameNotice } from '../modules/MessageModule.js';

/*
// Utilities for creating recipes
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

// Example of items
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

// Recipe generation
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

class CraftingScreen {
	constructor(player, recipes, updatePlayerStats) {
		this.player = player;
		this.recipes = recipes;
		this.updatePlayerStats = updatePlayerStats;
	}

	render() {
		const craftingRecipes = document.getElementById("crafting-recipes-list");
		craftingRecipes.innerHTML = "";

		const craftingRecipesDiv = document.createElement('div');

		for (const stat of Object.keys(this.recipes)) {
			const statDetails = document.createElement('details');
			const statSummary = document.createElement('summary');
			statSummary.textContent = `${stat} Recipes`;
			statDetails.appendChild(statSummary);

			for (const level in this.recipes[stat]) {
				const levelRecipe = this.recipes[stat][level];
				const recipeBtn = document.createElement('button');

				// Create a div to hold the ingredient icons inside the button
				const ingredientsDiv = document.createElement('div');

				for (const ingredient of levelRecipe) {
					const ingredientIcon = document.createElement('span');
					ingredientIcon.textContent = ingredient.icon;
					ingredientsDiv.appendChild(ingredientIcon);
				}

				// Append the ingredients div to the button's innerHTML
				recipeBtn.innerHTML = `Craft of ${stat} ${level}<br>${ingredientsDiv.innerHTML}`;

				recipeBtn.addEventListener('click', () => this.craftRecipe(levelRecipe));

				statDetails.appendChild(recipeBtn);
			}

			craftingRecipesDiv.appendChild(statDetails);
		}

		craftingRecipes.appendChild(craftingRecipesDiv);
	}

	craftRecipe(recipe) {
		// Check if the player has enough ingredients for the recipe
		if (this.checkIngredients(recipe)) {
			// Deduct the ingredients from the player's inventory
			this.deductIngredients(recipe);
			// Increase the player's craftingXP when a recipe is crafted
			this.player.craftingXP += 5;
			// Implement the crafting logic here (apply effects, add crafted item to the inventory, etc.)
			// @todo
			// Show a success message to the player
			this.updatePlayerCraftingXP();
		} else {
			// Show a message to the player indicating they don't have enough ingredients
			updateGameNotice("You don't have enough ingredients to craft this item.");
		}
	}

	checkIngredients(ingredients) {
		// Count the occurrences of each ingredient in the recipe
		const recipeCounts = {};
		ingredients.forEach((ingredient) => {
			recipeCounts[ingredient.name] = (recipeCounts[ingredient.name] || 0) + 1;
		});

		// Count the occurrences of each ingredient in the player's inventory
		const inventoryCounts = {};
		this.player.inventory.forEach((item) => {
			inventoryCounts[item.name] = (inventoryCounts[item.name] || 0) + 1;
		});

		// Check if the player has enough of each ingredient in the inventory
		return Object.keys(recipeCounts).every((ingredientName) => {
			const requiredQuantity = recipeCounts[ingredientName];
			const countInInventory = inventoryCounts[ingredientName] || 0;
			return countInInventory >= requiredQuantity;
		});
	}

	deductIngredients(ingredients) {
		ingredients.forEach((ingredient) => {
			// Find the first item with the same name in the player's inventory and remove it
			const index = this.player.inventory.findIndex((item) => item.name === ingredient.name);
			if (index !== -1) {
				this.player.inventory.splice(index, 1);
			}
		});
	}

	updatePlayerCraftingXP() {
		const craftingXPDisplay = document.getElementById('crafting-xp');
		craftingXPDisplay.textContent = `Crafting XP: ${this.player.craftingXP}`;
	}
}

export default CraftingScreen;