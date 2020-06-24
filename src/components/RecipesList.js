import React, { useContext } from "react";

import RecipeContext from "../contexts/RecipeContext";
import Card from "./Card";

const RecipesList = () => {
  const { allRecipes } = useContext(RecipeContext);
  return (
    <>
      {allRecipes.map((item) => {
        return <Card key={item.id} {...item} />;
      })}
    </>
  );
};

export default RecipesList;
