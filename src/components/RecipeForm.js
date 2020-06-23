import React, { useContext } from "react";
import RecipeContext from "../contexts/RecipeContext";

function RecipeForm() {
  const { handleAddRecipeSubmit, handleEditRecipeSubmit, deleteRecipe } = useContext(RecipeContext);
  return <h1>Recipe Form"</h1>;
}

export default RecipeForm;
