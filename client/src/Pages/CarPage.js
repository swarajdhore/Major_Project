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

  // const data = false;

  return (
    <>
      <span className="z-9999">
        <Navbar />
      </span>
      <div className="wrapper-class ">
        <img
          className="car-info"
          src={image + location.state.car.index + ".jpg"}
          alt={props.alt}
        />
        {/* </div> */}
        <div className="info-and-img-container">
          <div className="img-bg">
            <img
              className="class-img "
              src={image + location.state.car.index + ".jpg"}
              alt={props.alt}
            />
          </div>
          <div className="info-class ">
            <p className="name-of-car">{location.state.car.index}</p>
            <p className="price-of-car">
              &#8377; {location.state.car.selling_price}
            </p>
            <p>Fuel: {location.state.car.fuel}</p>
            <p>Kilometers Driven: {location.state.car.km_driven}</p>
            <p>Max Power: {location.state.car.max_power}</p>
            <p>Mileage: {location.state.car.mileage}</p>
            <p>Seats: {location.state.car.seats}</p>
            <p>Engine: {location.state.car.engine}</p>
            <p>Transmission: {location.state.car.transmission}</p>
            <p>Year: {location.state.car.year}</p>
            <div className="flex justify-evenly">
              <button className="btn text-white px-2 mx-2">
                <a href="/buycar" className="remove hover:text-white">
                  Check availablity
                </a>
              </button>
              {/* <button className="btn text-white px-2 mx-2">Buy Car</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarPage;
