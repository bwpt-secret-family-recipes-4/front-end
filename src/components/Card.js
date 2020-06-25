import React, { useContext } from "react";
import RecipeContext from "../contexts/RecipeContext";

const Card = (props) => {
  const { deleteRecipe } = useContext(RecipeContext);
  return (
    <div className="card">
      <h3 className="title">{props.title}</h3>
      <span className="creator">{props.creator}</span>
      <p className="directions">{props.ingredients}</p>
      <p className="directions">{props.directions}</p>
      <p className="category">Category: {props.category}</p>
      <button className="edit">edit</button>{" "}
      <button className="delete" onClick={() => deleteRecipe(props.id)}>
        delete
      </button>
    </div>
  );
};

export default Card;
