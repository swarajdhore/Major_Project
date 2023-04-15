import React, { useContext } from "react";
import Navbar from "../Components/Navbar/Navbar";

import "./CarPage.css";
import { useLocation } from "react-router-dom";

function CarPage(props) {
  const car = props.car;
  const location = useLocation();
  console.log("car-info", location.state.car);
  const image = process.env.PUBLIC_URL + "/images/Cars/";
  const bgImg = image + location.state.car.index + ".jpg";
  console.log(bgImg);
  const bgImageStyle = {
    // backgroundImage: `url(${image + location.state.car.index + ".jpg"})`,
    backgroundImage: `url(${bgImg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100%",
  };

  return (
    <>
      {/* <AppContext.Consumer> */}
      <Navbar />
      {/* style={bgImageStyle} */}
      <div>
        <img
          className="car-info"
          src={image + location.state.car.index + ".jpg"}
          alt={props.alt}
        />
      </div>
      <div className="info-and-img-container">
        <div className="bg-img">
          <img
            className="img-container"
            src={image + location.state.car.index + ".jpg"}
            alt={props.alt}
          />
        </div>
        <div className="info-container ">
          <p className="name">
            {/* {car.index} */}
            {/* Mercedes-Benz AMG GT */}
            {/* {car.index} */}
            {location.state.car.index}
          </p>
          <div className="group-of-four">
            {/* <div className="comments-container"> */}
            {/* {car.index} */}
            {/* {car.alt} */}
            <p className="price">
              &#8377; {location.state.car.selling_price}
              {/* Selling Price: */}
              {/* {car.sellPrice} */}
            </p>

            <p>
              Fuel: {location.state.car.fuel}
              {/* {car.fuel} */}
            </p>
            <p>
              Id: {location.state.car.id}
              {/* {car.id} */}
            </p>
          </div>
          <div className="group-of-four">
            <p>
              Kilometers Driven: {location.state.car.km_driven}
              {/* {car.kmDriven} */}
            </p>
            <p>
              Max Power: {location.state.car.max_power}
              {/* {car.maxPower} */}
            </p>
            <p>
              Mileage: {location.state.car.mileage}
              {/* {car.mileage} */}
            </p>
            {/* <p>
              Owner: {location.state.car.owner}
              {/* {car.owner} 
            </p> */}
          </div>
          <div className="group-of-four">
            <p>
              Seats: {location.state.car.seats}
              {/* {car.seats} */}
            </p>
            <p>
              Engine: {location.state.car.engine}
              {/* {car.engine} */}
            </p>
            <p>
              Transmission: {location.state.car.transmission}
              {/* {car.transmission} */}
            </p>
            <p>
              Year: {location.state.car.year}
              {/* {car.year} */}
            </p>
          </div>
          {/* </div> */}
        </div>
        <div className="buy-button">
          <button className="bg-black text-white">Buy</button>
        </div>
      </div>
      {/* </AppContext.Consumer> */}
    </>
  );
}

export default CarPage;
