import { recipes } from "/data/recipes.js";
let getRecipesByName = [];

const displayDataRecipeAll = (recipes) => {
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
};
displayDataRecipeAll(recipes);

const barResearch = () => {
  const inputBarResearch = document.querySelector(".researcher");
  const normalizeString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  inputBarResearch.addEventListener("keyup", (e) => {
    let inputTargetResearch = normalizeString(e.target.value)
      .toLowerCase()
      .trim();

    if (inputTargetResearch.length > 2) {
      getRecipesByName = recipes.filter(
        (recipe) =>
          normalizeString(recipe.name)
            .toLowerCase()
            .includes(inputTargetResearch.toLowerCase()) ||
          recipe.ingredients.some((ingredient) =>
            normalizeString(ingredient.ingredient)
              .toLowerCase()
              .includes(inputTargetResearch.toLowerCase())
          ) ||
          normalizeString(recipe.appliance)
            .toLowerCase()
            .includes(inputTargetResearch.toLowerCase()) ||
          recipe.ustensils.some((ustensil) =>
            normalizeString(ustensil)
              .toLowerCase()
              .includes(inputTargetResearch.toLowerCase())
          )
      );
      displayDataRecipeAll(getRecipesByName);

      /* Show or Hide filter Element */
      filterIngredients(getRecipesByName);
    } else {
      displayDataRecipeAll(recipes);
    }
  });
};
barResearch();

const inputIngredient = document.createElement("input");
inputIngredient.setAttribute("class", "ingredients");
inputIngredient.setAttribute("placeholder", "Rechercher un ingrédient");

const filteringredients = document.querySelector(".ingredient");
const inputFilterIngredients = document.createElement("div");
const sectionContainerIngredient = document.querySelector(
  ".container-ingredient"
);
inputFilterIngredients.setAttribute("class", "ingredient-hidden");

const arrowUp = document.createElement("i");
arrowUp.setAttribute("class", "fa-solid fa-chevron-up arrow");
inputFilterIngredients.style.display = "none";
let listIngredientRecipe = document.createElement("div");
listIngredientRecipe.setAttribute("class", "liste-ingredients");

sectionContainerIngredient.appendChild(inputFilterIngredients);
inputFilterIngredients.appendChild(inputIngredient);
inputFilterIngredients.appendChild(listIngredientRecipe);
inputIngredient.insertAdjacentElement("afterend", arrowUp);

const filterIngredients = () => {
  filteringredients.addEventListener("click", () => {
    filteringredients.style.display = "none";
    inputFilterIngredients.style.display = "block";
    listIngredientRecipe.innerHTML = "";

    let ingredientBarResearchRecipes = new Set();
    Array.from(document.querySelectorAll(".name-ingredient")).forEach(
      (element) => {
        let ingredientName = element.textContent.replace(/:/g, "").trim();

        if (!ingredientBarResearchRecipes.has(ingredientName)) {
          ingredientBarResearchRecipes.add(ingredientName);

          let liIngredient = document.createElement("li");
          liIngredient.textContent = ingredientName;

          listIngredientRecipe.appendChild(liIngredient);

          console.log("ingredientBarResearch", ingredientBarResearchRecipes);
        }
      }
    );

    let sortedList = Array.from(listIngredientRecipe.children).sort((a, b) =>
      a.textContent.localeCompare(b.textContent)
    );

    sortedList.forEach((liIngredient) => {
      listIngredientRecipe.appendChild(liIngredient);
    });
  });

  inputIngredient.addEventListener("input", () => {
    let value = inputIngredient.value.toLowerCase().trim();

    Array.from(listIngredientRecipe.children).forEach((liIngredient) => {
      let ingredientText = liIngredient.textContent.toLowerCase();

      if (ingredientText.includes(value)) {
        liIngredient.style.display = "block";
      } else {
        liIngredient.style.display = "none";
      }
    });
  });

  arrowUp.addEventListener("click", () => {
    filteringredients.style.display = "block";
    inputFilterIngredients.style.display = "none";
  });
};
filterIngredients(recipes);

const tagResearch = () => {};
Array.from(document.querySelectorAll(".liste-ingredients")).forEach(
  (element) => {
    element.addEventListener("click", function (e) {
      console.log(e.target.textContent);
    });
  }
);
tagResearch();
