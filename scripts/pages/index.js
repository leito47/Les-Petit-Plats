import { recipes } from "/data/recipes.js";
let getRecipesByName = [];

let tagFilterForAppliance = [];
let tagFilterForUstensils = [];
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
      quantityIngredient.setAttribute("class", "ingredient-quantity");
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
    descriptionRecipes.setAttribute("class", "description-commentary");
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

//error message
const displayErrorMessage = (message) => {
  const errorMessageContainer = document.querySelector("#error-message");
  errorMessageContainer.innerHTML = "";
  errorMessageContainer.classList.add("show-error-message");
  message = document.createElement("p");
  message.innerHTML =
    "Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.";

  errorMessageContainer.appendChild(message);
};
const hideErrorMessage = () => {
  const errorMessageContainer = document.querySelector("#error-message");
  errorMessageContainer.innerHTML = "";
  errorMessageContainer.classList.remove("show-error-message");
};

const barResearch = () => {
  const inputBarResearch = document.querySelector(".researcher");

  const normalizeString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  inputBarResearch.addEventListener("focus", () => {
    closeFilterIngredient();
    closeFilterAppliance();
    closeFilterUstensils();
  });

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

      if (getRecipesByName.length > 0) {
        displayDataRecipeAll(getRecipesByName);
      } else {
        displayErrorMessage();
      }
    } else {
      displayDataRecipeAll(recipes);

      hideErrorMessage();
    }
  });
};
barResearch();

//add dom element filterIngredient
const inputIngredient = document.createElement("input");
inputIngredient.setAttribute("class", "ingredients");
inputIngredient.setAttribute("placeholder", "Rechercher un ingrédient");

const filteringredients = document.querySelector(".ingredients");
const inputFilterIngredients = document.createElement("div");
const sectionContainerIngredient = document.querySelector(
  ".container-ingredient"
);
inputFilterIngredients.setAttribute("class", "ingredient-hidden");
inputFilterIngredients.style.display = "none";
const arrowUpFilterIngredient = document.createElement("i");
arrowUpFilterIngredient.setAttribute("class", "fa-solid fa-chevron-up arrow");

let listIngredientRecipe = document.createElement("div");
listIngredientRecipe.setAttribute("class", "liste-ingredients");

sectionContainerIngredient.appendChild(inputFilterIngredients);
inputFilterIngredients.appendChild(inputIngredient);
inputFilterIngredients.appendChild(listIngredientRecipe);
inputIngredient.insertAdjacentElement("afterend", arrowUpFilterIngredient);

// function filterIngredient
const filterIngredients = () => {
  filteringredients.addEventListener("click", () => {
    closeFilterAppliance();
    closeFilterUstensils();
    filteringredients.style.display = "none";
    inputFilterIngredients.style.display = "block";
    listIngredientRecipe.innerHTML = "";

    let ingredientBarResearchRecipes = [];
    Array.from(document.querySelectorAll(".name-ingredient")).forEach(
      (element) => {
        let ingredientName = element.textContent.replace(/:/g, "").trim();

        if (!ingredientBarResearchRecipes.includes(ingredientName)) {
          ingredientBarResearchRecipes.push(ingredientName);

          let liIngredient = document.createElement("li");

          liIngredient.textContent = ingredientName;

          listIngredientRecipe.appendChild(liIngredient);
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
    const normalizeString = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
    let value = normalizeString(inputIngredient.value).toLowerCase().trim();

    Array.from(listIngredientRecipe.children).forEach((liIngredient) => {
      let ingredientText = normalizeString(
        liIngredient.textContent
      ).toLowerCase();

      if (ingredientText.includes(value)) {
        liIngredient.style.display = "block";
      } else {
        liIngredient.style.display = "none";
      }
    });
  });
};
filterIngredients();

//function close filterIngredient
const closeFilterIngredient = () => {
  filteringredients.style.display = "block";
  inputFilterIngredients.style.display = "none";
};
arrowUpFilterIngredient.addEventListener("click", closeFilterIngredient);
let counterTag = 0;
const tagResearchIngredients = () => {
  let tagFilterForIngredient = [];
  Array.from(document.querySelectorAll(".liste-ingredients ")).forEach(
    (element) => {
      element.addEventListener("click", function (e) {
        const tagSection = document.querySelector(".tag");
        let tagIngredientLi = document.createElement("li");
        tagIngredientLi.setAttribute("class", "tag-ingredient");
        counterTag++;

        let spanIngredient = document.createElement("span");
        let btnFermetureTag = document.createElement("i");
        btnFermetureTag.setAttribute("class", "fa-regular fa-circle-xmark");
        tagIngredientLi.textContent = e.target.textContent.toLowerCase();
        let tagDisplayIngredient = tagIngredientLi.textContent.toLowerCase();
        const tags = Array.from(document.querySelectorAll(".tag-ingredient"));

        tagSection.appendChild(tagIngredientLi);
        tagIngredientLi.appendChild(spanIngredient);
        tagIngredientLi.appendChild(btnFermetureTag);
        closeFilterIngredient();

        btnFermetureTag.addEventListener("click", () => {
          tagIngredientLi.remove();
          counterTag--;
          updateDisplayTagIngredient();
        });

        //display ingredient with tag

        tagFilterForIngredient = recipes.filter((recipe) =>
          recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(tagDisplayIngredient)
          )
        );
        displayDataRecipeAll(tagFilterForIngredient);
      });

      let updateDisplayTagIngredient = () => {
        const tagsIngredients = Array.from(
          document.querySelectorAll(".tag-ingredient")
        );
        if (counterTag === 0) {
          displayDataRecipeAll(recipes);
        } else {
          tagFilterForIngredient = recipes.filter((recipe) =>
            tagsIngredients.some((tag) =>
              recipe.ingredients.some((ingredient) =>
                ingredient.ingredient
                  .toLowerCase()
                  .includes(tag.textContent.toLowerCase())
              )
            )
          );
          displayDataRecipeAll(tagFilterForIngredient);
        }
      };
    }
  );
};
tagResearchIngredients();

//add element DOM appliance

const inputAppliance = document.createElement("input");
inputAppliance.setAttribute("class", "input-appliance");
inputAppliance.setAttribute("placeholder", "Rechercher un appareil");

const filterAppliance = document.getElementById("appliance");
const inputFilterAppliance = document.createElement("div");
const sectionContainerAppliance = document.querySelector(
  ".container-appliance"
);
inputFilterAppliance.setAttribute("class", "appliance-hidden");
inputFilterAppliance.style.display = "none";
const arrowUpFilterAppliance = document.createElement("i");
arrowUpFilterAppliance.setAttribute("class", "fa-solid fa-chevron-up arrow");

const listApplianceRecipe = document.createElement("div");
listApplianceRecipe.setAttribute("class", "liste-appliance");

sectionContainerAppliance.appendChild(inputFilterAppliance);
inputFilterAppliance.appendChild(inputAppliance);
inputFilterAppliance.appendChild(listApplianceRecipe);
inputAppliance.insertAdjacentElement("afterend", arrowUpFilterAppliance);

// function filterAppliance
const filterAppliances = () => {
  filterAppliance.addEventListener("click", () => {
    closeFilterIngredient();
    closeFilterUstensils();
    filterAppliance.style.display = "none";
    inputFilterAppliance.style.display = "block";
    listApplianceRecipe.innerHTML = "";

    let applianceBarResearchRecipes = [];
    Array.from(document.querySelectorAll(".title-recipe")).forEach(
      (element) => {
        let nameRecipeForAppliance = element.textContent
          .toLocaleLowerCase()
          .trim();

        let filterForAppliance = recipes.filter(
          (recipe) => recipe.name.toLowerCase() === nameRecipeForAppliance
        );

        let applianceName = filterForAppliance.map(
          (recipe) => recipe.appliance
        );

        if (applianceBarResearchRecipes.indexOf(applianceName[0]) === -1) {
          applianceBarResearchRecipes.push(applianceName[0]);
        }
      }
    );

    applianceBarResearchRecipes.forEach((el) => {
      let liAppliance = document.createElement("li");
      liAppliance.textContent = el;
      listApplianceRecipe.appendChild(liAppliance);
    });

    let sortedListAppliance = Array.from(listApplianceRecipe.children).sort(
      (a, b) => a.textContent.localeCompare(b.textContent)
    );

    sortedListAppliance.forEach((liAppliance) => {
      listApplianceRecipe.appendChild(liAppliance);
    });
  });

  inputAppliance.addEventListener("input", () => {
    const normalizeString = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
    let value = normalizeString(inputAppliance.value).toLowerCase().trim();

    Array.from(listApplianceRecipe.children).forEach((liAppliance) => {
      let applianceText = normalizeString(
        liAppliance.textContent
      ).toLowerCase();

      if (applianceText.includes(value)) {
        liAppliance.style.display = "block";
      } else {
        liAppliance.style.display = "none";
      }
    });
  });
};

filterAppliances();

//function close filterAppliance
const closeFilterAppliance = () => {
  filterAppliance.style.display = "block";
  inputFilterAppliance.style.display = "none";
};
arrowUpFilterAppliance.addEventListener("click", closeFilterAppliance);
const tagResearchAppliance = () => {
  Array.from(document.querySelectorAll(".liste-appliance ")).forEach(
    (element) => {
      element.addEventListener("click", function (e) {
        const tagSection = document.querySelector(".tag");
        let tagApplianceLi = document.createElement("li");
        tagApplianceLi.setAttribute("class", "tag-appliance");
        counterTag++;
        let spanAppliance = document.createElement("span");
        let btnFermetureTag = document.createElement("i");
        btnFermetureTag.setAttribute("class", "fa-regular fa-circle-xmark");
        tagApplianceLi.textContent = e.target.textContent;
        let tagDisplayAppliance = tagApplianceLi.textContent.toLowerCase();
        tagApplianceLi.textContent.toLocaleLowerCase();
        tagSection.appendChild(tagApplianceLi);
        tagApplianceLi.appendChild(spanAppliance);
        tagApplianceLi.appendChild(btnFermetureTag);
        closeFilterAppliance();
        btnFermetureTag.addEventListener("click", () => {
          tagApplianceLi.remove();
          counterTag--;
          updateDisplayTagAppliance();
        });

        //display appliance with tag
        tagFilterForAppliance = recipes.filter((recipe) =>
          recipe.appliance.toLowerCase().includes(tagDisplayAppliance)
        );
        displayDataRecipeAll(tagFilterForAppliance);
      });
      let updateDisplayTagAppliance = () => {
        const tagsAppliance = Array.from(
          document.querySelectorAll(".tag-appliance")
        );
        if (counterTag === 0) {
          displayDataRecipeAll(recipes);
        } else {
          tagFilterForAppliance = recipes.filter((recipe) =>
            tagsAppliance.some((tag) =>
              recipe.appliance
                .toLowerCase()
                .includes(tag.textContent.toLowerCase())
            )
          );

          displayDataRecipeAll(tagFilterForAppliance);
        }
      };
    }
  );
};
tagResearchAppliance();

//add element DOM ustensil

const inputUstensils = document.createElement("input");
inputUstensils.setAttribute("class", "input-ustensils");
inputUstensils.setAttribute("placeholder", "Rechercher un ustensile");

const filterUstensils = document.getElementById("ustensils");
const inputFilterUstensils = document.createElement("div");
const sectionContainerUstensils = document.querySelector(
  ".container-ustensils"
);
inputFilterUstensils.setAttribute("class", "ustensils-hidden");
inputFilterUstensils.style.display = "none";
const arrowUpFilterUstensils = document.createElement("i");
arrowUpFilterUstensils.setAttribute("class", "fa-solid fa-chevron-up arrow");

let listUstensilsRecipe = document.createElement("div");
listUstensilsRecipe.setAttribute("class", "liste-ustensils");

sectionContainerUstensils.appendChild(inputFilterUstensils);
inputFilterUstensils.appendChild(inputUstensils);
inputFilterUstensils.appendChild(listUstensilsRecipe);
inputUstensils.insertAdjacentElement("afterend", arrowUpFilterUstensils);

// function filterUstensils
const filterUstensiles = () => {
  filterUstensils.addEventListener("click", () => {
    closeFilterIngredient();
    closeFilterAppliance();
    filterUstensils.style.display = "none";
    inputFilterUstensils.style.display = "block";
    listUstensilsRecipe.innerHTML = "";

    let ustensilsBarResearchRecipes = new Set();

    Array.from(document.querySelectorAll(".title-recipe")).forEach(
      (element) => {
        let nameRecipeForUstensils = element.textContent
          .toLocaleLowerCase()
          .trim();

        let filterUstensils = recipes.filter(
          (recipe) => recipe.name.toLowerCase() === nameRecipeForUstensils
        );

        filterUstensils.map((recipe) =>
          recipe.ustensils.forEach((ustensilsName) => {
            ustensilsBarResearchRecipes.add(
              ustensilsName.charAt(0).toUpperCase() +
                ustensilsName.slice(1).toLowerCase()
            );
          })
        );
      }
    );
    listUstensilsRecipe.innerHTML = "";

    ustensilsBarResearchRecipes.forEach((ustensil) => {
      let liUstensils = document.createElement("li");
      liUstensils.textContent = ustensil;
      listUstensilsRecipe.appendChild(liUstensils);
    });

    let sortedListUstensils = Array.from(listUstensilsRecipe.children).sort(
      (a, b) => a.textContent.localeCompare(b.textContent)
    );

    sortedListUstensils.forEach((liUstensils) => {
      listUstensilsRecipe.appendChild(liUstensils);
    });
  });
  inputUstensils.addEventListener("input", () => {
    const normalizeString = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
    let value = normalizeString(inputUstensils.value).toLowerCase().trim();

    Array.from(listUstensilsRecipe.children).forEach((liUstensils) => {
      let ustensilsText = normalizeString(
        liUstensils.textContent
      ).toLowerCase();

      if (ustensilsText.includes(value)) {
        liUstensils.style.display = "block";
      } else {
        liUstensils.style.display = "none";
      }
    });
  });
};
filterUstensiles();

//function close filterUstensils
const closeFilterUstensils = () => {
  filterUstensils.style.display = "block";
  inputFilterUstensils.style.display = "none";
};
arrowUpFilterUstensils.addEventListener("click", closeFilterUstensils);

const tagResearchUstensils = () => {
  Array.from(document.querySelectorAll(".liste-ustensils ")).forEach(
    (element) => {
      element.addEventListener("click", function (e) {
        const tagSection = document.querySelector(".tag");
        let tagUstensilsLi = document.createElement("li");
        tagUstensilsLi.setAttribute("class", "tag-ustensils");
        counterTag++;
        let spanUstensils = document.createElement("span");
        let btnFermetureTag = document.createElement("i");
        btnFermetureTag.setAttribute("class", "fa-regular fa-circle-xmark");
        tagUstensilsLi.textContent = e.target.textContent;
        let tagDisplayUstensils = tagUstensilsLi.textContent.toLowerCase();
        tagUstensilsLi.textContent.toLocaleLowerCase();
        tagSection.appendChild(tagUstensilsLi);
        tagUstensilsLi.appendChild(spanUstensils);
        tagUstensilsLi.appendChild(btnFermetureTag);

        closeFilterUstensils();
        btnFermetureTag.addEventListener("click", () => {
          tagUstensilsLi.remove();
          counterTag--;
          updateDisplayTagUstensils();
        });

        //display ustensils with tag

        tagFilterForUstensils = recipes.filter((recipe) =>
          recipe.ustensils.includes(tagDisplayUstensils)
        );

        displayDataRecipeAll(tagFilterForUstensils);
      });

      let updateDisplayTagUstensils = () => {
        const tagsUstensils = Array.from(
          document.querySelectorAll(".tag-ustensils")
        );
        if (counterTag === 0) {
          displayDataRecipeAll(recipes);
        } else {
          tagFilterForUstensils = recipes.filter((recipe) =>
            tagsUstensils.some((tag) =>
              recipe.ustensils.some((ustensil) =>
                ustensil.toLowerCase().includes(tag.textContent.toLowerCase())
              )
            )
          );
          displayDataRecipeAll(tagFilterForUstensils);
        }
      };
    }
  );
};
tagResearchUstensils();
