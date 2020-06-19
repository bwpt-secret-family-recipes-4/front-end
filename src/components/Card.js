import React from "react";

const Card = (props) => {
  return (
    <div className="card">
      <h3>{props.name}</h3>
      <p>{props.creator}</p>
      <ul>
        {props.ingredients.forEach((item) => {
          return (
            <>
              <li>{item}</li>
              <br />
            </>
          );
        })}
      </ul>
      <p>{props.instructions}</p>
    </div>
  );
};

export default Card;
