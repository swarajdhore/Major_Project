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
    <>
      <div className="bg-image" style={bgImageStyle}>
        <div className="gradient"></div>
      </div>
      <div className="transparent-background"></div>
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
        <div>
          <button className="btn">
            <a href="/buy">Buy</a>
          </button>

          <button className="btn">
            <a href="/sell">Sell</a>
          </button>

          <button className="btn">Customize</button>
        </div>
      </div>
    </>
  );
}

export default BackgroundImageSlider;
