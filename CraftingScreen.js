class CraftingScreen {
	constructor(gameContainer, player, recipes, updateGameInfo, updatePlayerStats) {
		this.gameContainer = gameContainer;
		this.player = player;
		this.recipes = recipes;
		this.updateGameInfo = updateGameInfo;
		this.updatePlayerStats = updatePlayerStats;
	}

	render() {
		// Clear the game container
		this.gameContainer.innerHTML = '';

		// Create and append crafting recipe list elements
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

		this.gameContainer.appendChild(craftingRecipesDiv);
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
			this.updateGameInfo("You don't have enough ingredients to craft this item.");
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