import React from "react";
import "./CarDetails.css";

function CarDetails(props) {
  const car = props.car;
  const image = process.env.PUBLIC_URL + "/images/Cars/";

  console.log("Name", props.name);

  return (
    <div className="card-container ">
      {/* <Card imgUrl={image + car + ".jpg"} alt={car} name={car}> */}
      {/* <div className="card-container"> */}
      <img
        className="image-container"
        src={image + car.index + ".jpg"}
        alt={props.alt}
      />
      <p className="text-white">{car.index}</p>
      {/* <div className="comments-container">{props.name}</div> */}
      {/* {props.alt} */}
      <p>Engine: {car.engine}</p>
      <p>Fuel: {car.fuel}</p>
      <p>Id: {car.id}</p>
      <p>Kilometers Driven: {car.km_driven}</p>
      <p>Max Power: {car.max_power}</p>
      <p>Mileage: {car.mileage}</p>
      <p>Owner: {car.owner}</p>
      <p>Seats: {car.seats}</p>
      <p>Selling Price: {car.selling_price}</p>
      <p>Transmission: {car.transmission}</p>
      <p>Year: {car.year}</p>
      {/* </Card> */}
      {/* </div> */}
    </div>
  );
}

export default CarDetails;
