import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
// import SearchBar from "../Components/UI/SearchBar/SearchBar";
import ChatBot from "../Components/ChatBot/ChatBot";
import BuyForm from "./BuyForm";

import "./Buy.css";

function Buy() {
  return (
    <div className="buy-container">
      <Navbar />
      {/* <div className="search-bar">
        <SearchBar />
      </div> */}
      <div className="z-10">
        <BuyForm />
      </div>
      <div className="z-9999 fixed bottom-2 right-2">
        <ChatBot />
      </div>
      <span className="footer">
        <Footer />
      </span>
    </div>
  );
}

export default Buy;
