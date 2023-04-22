import { recipes } from "/data/recipes.js";

const barResearch = () => {
  const inputBarResearch = document.querySelector(".researcher");

  inputBarResearch.addEventListener("keyup", (e) => {
    let inputTargetResearch = e.target.value;
    if (inputTargetResearch.length > 2) {
      const getRecipesByName = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(inputTargetResearch.toLowerCase())
      );
      const recipeNames = getRecipesByName.map((recipe) => recipe.name);

      console.log(recipeNames);
    }
  });
};

barResearch();
