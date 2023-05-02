import React, { useEffect, useState, useRef } from "react";

import Reviews from "./Reviews";
import "./Information.css";

function Information() {
  return (
    <div className="container flex justify-center z-1 py-8 rounded-sm">
      <div className="information-box">
        <div className="information-box-1 flex px-4">
          <span className={`my-element`}>
            "Looking to upgrade your ride? Don't settle for less! At our car
            trading Website, we make it easy to trade in your old car and get
            behind the wheel of the car of your dreams. Whether you're looking
            for a sleek and stylish sports car or a practical and reliable
            family vehicle, we have the inventory and expertise to make your car
            buying experience a breeze. So why wait? Stop by today and discover
            the thrill of driving your perfect car!"
          </span>
          <img
            className={`my-element `}
            src="/images/vector-img/images.png"
            alt="vector-img"
          />
        </div>
        {/* <div className="review-box">
          <div className={`my-element`}>
            <Reviews comments="Using this car trading website was a game-changer for me. It was simple, quick, and hassle-free." />
          </div>
          <div className={`my-element`}>
            <Reviews comments="I was blown away by how easy and efficient the process was. The website was user-friendly, and I received a competitive offer within minutes of entering my car's details." />
          </div>
          <div className={`my-element`}>
            <Reviews comments="The process was straightforward, and I received a fair market value for my car. The customer service was excellent." />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Information;
