import { recipes } from "/data/recipes.js";

function displayDataRecipeAll(recipes) {
  const sectionRecipes = document.getElementById("recipes-cards");
  // Clear any existing HTML in the section
  sectionRecipes.innerHTML = "";

  // Iterate through the data array
  recipes.forEach((recipe) => {
    // Create a card element for each recipe
    let article = document.createElement("article");
    article.setAttribute("class", "recipe");

    let divImage = document.createElement("div");
    divImage.setAttribute("class", "blank-image");

    let divIngedientTime = document.createElement("div");
    divIngedientTime.setAttribute("class", "ingredient-time");

    let divContent = document.createElement("div");
    divContent.setAttribute("class", "content-recipe");

    //add title
    let divTitle = document.createElement("div");
    divTitle.setAttribute("class", "title-recipe");
    let recipeName = document.createElement("h2");
    recipeName.textContent = recipe.name;

    //add timer and time
    let divTime = document.createElement("div");
    divTime.setAttribute("class", "time-recipe");
    let timerIcon = document.createElement("i");
    timerIcon.setAttribute("class", "fa-regular fa-clock");
    let spanTextTime = document.createElement("span");

    spanTextTime.textContent = recipe.time + " min ";

    //add ingredients && add element in DOM
    let divIngerdientDescription = document.createElement("div");
    divIngerdientDescription.setAttribute(
      "class",
      "globale-ingredient-description"
    );
    divIngedientTime.setAttribute("class", "ingredient-time");
    let divIngredients = document.createElement("div");
    divIngredients.setAttribute("class", "ingredients-recipe");
    recipe.ingredients.forEach((ingredientRecipe) => {
      let descriptionIngredients = document.createElement("p");
      descriptionIngredients.setAttribute("class", "description-ingredients");
      let nameIngredient = document.createElement("span");
      nameIngredient.setAttribute("class", "name-ingredient");

      let quantityIngredient = document.createElement("span");
      nameIngredient.textContent = ingredientRecipe.ingredient + ":" + " ";
      quantityIngredient.textContent = ingredientRecipe.unit
        ? `${ingredientRecipe.quantity} ${ingredientRecipe.unit}`
        : ingredientRecipe.quantity;
      divIngredients.appendChild(descriptionIngredients);
      divIngredients.appendChild(nameIngredient);
      divIngredients.appendChild(quantityIngredient);
    });

    //add description
    let divDescription = document.createElement("div");
    divDescription.setAttribute("class", "description-recipe");
    let descriptionRecipes = document.createElement("p");
    descriptionRecipes.setAttribute("class", "descrption-commentary");
    descriptionRecipes.textContent = recipe.description;

    // Add element in DOM
    sectionRecipes.appendChild(article);
    article.appendChild(divImage);
    article.appendChild(divContent);
    divContent.appendChild(divIngedientTime);
    divIngedientTime.appendChild(divTitle);
    divIngedientTime.appendChild(divTime);
    divContent.appendChild(divIngerdientDescription);
    divIngerdientDescription.appendChild(divIngredients);
    divIngerdientDescription.appendChild(descriptionRecipes);
    divIngerdientDescription.appendChild(divDescription);
    divTitle.appendChild(recipeName);
    divTime.appendChild(timerIcon);
    divTime.appendChild(spanTextTime);
  });
}

displayDataRecipeAll(recipes);
