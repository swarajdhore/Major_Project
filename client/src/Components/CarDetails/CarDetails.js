import React from "react";
// import CarPage from "../../Pages/CarPage";

import "./CarDetails.css";

// export data;
export function CarDetails(props) {
  const car = props.car;
  const image = process.env.PUBLIC_URL + "/images/Cars/";

  console.log("Name", car.index);

  return (
    <div className="card-container ">
      <img
        className="image-container"
        src={image + car.index + ".jpg"}
        alt={props.alt}
      />
      <p className="text-white">{car.index}</p>
    </div>
  );
}

export function CarPage(props) {
  const car = props.car;
  const image = process.env.PUBLIC_URL + "/images/Cars/";

  return (
    <div>
      <img className="image-container" src={image + car.index + ".jpg"} />
      <p className="text-white">{car.index}</p>
      <div className="comments-container">
        {car.index}
        {car.alt}
        <p>Engine: {car.engine}</p>
        <p>Fuel: {car.fuel}</p>
        <p>Id: {car.id}</p>
        <p>Kilometers Driven: {car.kmDriven}</p>
        <p>Max Power: {car.maxPower}</p>
        <p>Mileage: {car.mileage}</p>
        <p>Owner: {car.owner}</p>
        <p>Seats: {car.seats}</p>
        <p>Selling Price: {car.sellPrice}</p>
        <p>Transmission: {car.transmission}</p>
        <p>Year: {car.year}</p>
      </div>
    </div>
  );
}
