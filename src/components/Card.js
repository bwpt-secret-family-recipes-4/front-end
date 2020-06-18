import React from "react";

const Card = (props) => {
  return (
    <div>
      <h3>{props.name}</h3>
      <p>{props.creator}</p>
    </div>
  );
};

export default Card;
