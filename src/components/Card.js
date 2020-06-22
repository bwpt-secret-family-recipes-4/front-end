import React, { useContext } from "react";
import RecipeContext from "../contexts/RecipeContext";

const Card = (props) => {
  const { deleteRecipe } = useContext(RecipeContext);
  return (
    <div className="card">
      <h3 className="title">{props.name}</h3>
      <span className="creator">{props.creator}</span>
      <ul>
        {props.ingredients.map((item) => {
          return <li>{item}</li>;
        })}
      </ul>
      <p className="instructions">{props.instructions}</p>
      <span className="delete" onClick={deleteRecipe(props.id)}>
        delete
      </span>
    </div>
  );
};

export default Card;
