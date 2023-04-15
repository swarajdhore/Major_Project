import React from "react";

import "./Card.css";

function Card(props) {
  const image = process.env.PUBLIC_URL + "/images/Cars/";
  return (
    <div className="card-container">
      <img
        className="image-container"
        src={image + props.name + ".jpg"}
        alt="img"
      />
      <div className="comments-container">{props.name}</div>
      <div className="comments-container">{props.year}</div>
      <div className="comments-container">{props.numberPlate}</div>
      <div className="comments-container">{props.price}</div>
      <div className="comments-container">{props.userName}</div>
    </div>
  );
}

export default Card;
