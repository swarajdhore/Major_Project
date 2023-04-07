import React from "react";

import Navbar from "../Components/Navbar/Navbar";
import BackgroundImageSlider from "../Components/ImageSlider/BackgroundImageSlider";
import Information from "../Components/InformationAndReview/Information";
import Footer from "../Components/Footer/Footer";
import ChatBot from "../Components/ChatBot/ChatBot";
// import Reviews from "../Components/InformationAndReview/Reviews";

import "./StartPage.css";

function StartPage() {
  return (
    <div className="wrapper text-center text-3xl font-bold">
      {/* <div className="navbar"> */}
      <Navbar />
      {/* </div> */}
      <div className="container-style">
        <BackgroundImageSlider />
      </div>
      <div>
        {/* <h1 className="heading">Hello World</h1> */}
        <Information />
      </div>
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
