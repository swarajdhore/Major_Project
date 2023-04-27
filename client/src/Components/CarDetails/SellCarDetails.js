import React from "react";

import "./SellCarDetails.css";

function SellCarDetails(props) {
  const image = process.env.PUBLIC_URL + "/images/Cars/";
  return (
    <div className="card-container-1 justify-center">
      <img
        className="image-container"
        src={image + props.name + ".jpg"}
        alt="img"
      />
      <div className="comments-container">{props.name}</div>
      <div className="comments-container">{props.year}</div>
      {/* <div className="comments-container">{props.numberPlate}</div> */}
      <div className="comments-container card-price">ETH {props.price}</div>
      {/* <div className="comments-container">{props.userName}</div> */}
    </div>
  );
}

export default SellCarDetails;
