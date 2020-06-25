import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axiosWithAuth from "../utils/axiosWithAuth";
import RecipeContext from "../contexts/RecipeContext";
import Card from "./Card";

const RecipesList = () => {
  const history = useHistory();
  const { allRecipes, setAllRecipes } = useContext(RecipeContext);

  const addRecipeRoute = () => {
    history.push("/add");
  };

  useEffect(
    () => {
      axiosWithAuth()
        .get("/api/recipes")
        .then((res) => {
          // console.log("recipe list response", res.data);
          setAllRecipes(res.data);
          // history.push("/"); //! might not need to do this line, only needed if page refresh is required
        })
        .catch((err) => console.log("recipe list error", err));
    },
    // eslint-disable-next-line
    []
  );

  return (
    <>
      <button className="newrecipe" onClick={addRecipeRoute}>
        Add New Recipe
      </button>
      <div className="allcards">
        {allRecipes.map((item) => {
          return <Card key={item.id} {...item} />;
        })}
      </div>
    </>
  );
};

export default RecipesList;
