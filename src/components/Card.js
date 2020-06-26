import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import axiosWithAuth from "../utils/axiosWithAuth";
import RecipeContext from "../contexts/RecipeContext";

const Card = (props) => {
  const history = useHistory();
  const { allRecipes, setAllRecipes, setIsEditing } = useContext(RecipeContext);

  const deleteRecipe = (id) => {
    axiosWithAuth()
      .delete(`/api/recipes/${id}`)
      .then((res) => {
        // console.log("delete response", res.data);
        const afterDelete = allRecipes.filter((item) => item.id !== id);
        setAllRecipes([...afterDelete]);
      })
      .catch((err) => console.log("delete error", err));
  };

  return (
    <div className="card">
      <h3 className="title">{props.title}</h3>
      <span className="creator">{props.creator}</span>
      <p className="directions">{props.ingredients}</p>
      <p className="directions">{props.directions}</p>
      <p className="category">Category: {props.category}</p>
      <button
        className="edit"
        onClick={() => {
          setIsEditing(true);
          console.log("Now Editing!!");
          history.push("/edit", { ...props });
        }}>
        edit
      </button>{" "}
      <button className="delete" onClick={() => deleteRecipe(props.id)}>
        delete
      </button>
    </div>
  );
};

export default Card;
