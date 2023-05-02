import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./BackgroundImageSlider.css";
import imageSlide from "./data";

function BackgroundImageSlider() {
  const [currentState, setCurrentState] = useState(0);

  const goToNext = (currentState) => {
    setCurrentState(currentState);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentState === 3) {
        setCurrentState(0);
      } else {
        setCurrentState(currentState + 1);
      }
    }, 8000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentState]);

  const bgImageStyle = {
    backgroundImage: `url(${imageSlide[currentState].url})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100%",
  };
  return (
    <div className="">
      <div className=" z-1 bg-image rounded" style={bgImageStyle}>
        <div className="gradient"></div>
      </div>
      <div className="z-9 transparent-background"></div>
      <div className="description">
        <div>
          {/* <Animate appear="fadeInDown" durationAppear={1000} component="h1"> */}
          <h1 className="animated animatedFadeInUp fadeInUp">
            {imageSlide[currentState].title}
          </h1>
          {/* </Animate> */}
          <p className="animated animatedFadeInUp fadeInUp">
            {imageSlide[currentState].body}
          </p>
        </div>
        <div className="carousal-boult">
          {imageSlide.map((imageSlide, currentState) => (
            <span
              key={currentState}
              onClick={() => goToNext(currentState)}
            ></span>
          ))}
        </div>
        <div className="z-999 px-2">
          <button className="button route-btn px-4 mx-2 text-black">
            <a href="/buy" className="hover:text-black text-black">
              Buy
            </a>
          </button>

          <button className="button route-btn px-4 mx-2 text-black">
            <a href="/sell" className="hover:text-black text-black">
              Sell
            </a>
          </button>

          <button className="button route-btn px-4 mx-2 text-black">
            Customize
          </button>
        </div>
      </div>
    </div>
  );
}

export default BackgroundImageSlider;
