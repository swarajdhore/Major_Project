import React from "react";

import "./Card.css";

function Card({ alt, name }) {
  return (
    <div className="card-container">
      <img className="image-container" src="hello" alt={alt} />
      <div className="comments-container">{name}</div>
      {alt}
    </div>
  );
}

export default Card;
