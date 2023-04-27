import React from "react";

function ProfilePageCard(props) {
  const car = props.vehicleData;
  console.log(car);
  return (
    <div className="card-container-1 justify-center">
      Car Card
      {/* <img
        className="image-container"
        src={image + car + ".jpg"}
        alt="img"
      /> */}
      {/* <div className="comments-container">{props.name}</div> */}
      {/* <div className="comments-container">{props.year}</div> */}
      {/* <div className="comments-container">{props.numberPlate}</div> */}
      {/* <div className="comments-container card-price">ETH {props.price}</div> */}
      {/* <div className="comments-container">{props.userName}</div> */}
    </div>
  );
}

export default ProfilePageCard;
