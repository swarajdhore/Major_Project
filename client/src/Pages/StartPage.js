import React from "react";

import Navbar from "../Components/Navbar/Navbar";
import BackgroundImageSlider from "../Components/ImageSlider/BackgroundImageSlider";
import Information from "../Components/InformationAndReview/Information";
import Footer from "../Components/Footer/Footer";
import ChatBot from "../Components/ChatBot/ChatBot";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";
// import Reviews from "../Components/InformationAndReview/Reviews";

import "./StartPage.css";

function StartPage() {
  const animates = document.querySelectorAll(".scroll-animation");

  const observer = new IntersectionObserver((entries) => {
    console.log(entries);
    entries.forEach(
      (entry) => {
        entry.target.classList.toggle("show", entry.isIntersecting);
      },
      {
        threshold: 0.5,
      }
    );
  });

  animates.forEach((animate) => {
    observer.observe(animate);
  });

  return (
    <div className="wrapper text-center text-3xl font-bold">
      {/* <div className="navbar"> */}
      <Navbar />
      {/* </div> */}
      <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
        <div className="container-style scroll-animation">
          <BackgroundImageSlider />
        </div>
        <div className="scroll-animation">
          {/* <h1 className="heading">Hello World</h1> */}
          <Information />
        </div>
      </ScrollAnimation>
      <div className="z-10 absolute bottom-2 right-2">
        <ChatBot />
      </div>
      {/* <div>
        <Reviews />
      </div> */}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default StartPage;
