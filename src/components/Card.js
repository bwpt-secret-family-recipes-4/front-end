import React, { useContext } from "react";
import RecipeContext from "../contexts/RecipeContext";

const Card = (props) => {
  const { deleteRecipe } = useContext(RecipeContext);
  return (
    <div className="card">
      <h3 className="title">{props.title}</h3>
      <span className="creator">{props.creator}</span>
      {/* <ul>
        {props.ingredients.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul> */}
      <p className="directions">{props.directions}</p>
      <p className="category">Category: {props.category}</p>
      <button className="delete" onClick={() => deleteRecipe(props.id)}>
        delete
      </button>
    </div>
  );
};

export default Card;
