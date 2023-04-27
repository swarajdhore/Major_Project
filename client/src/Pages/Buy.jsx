import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import SearchBar from "../Components/UI/SearchBar/SearchBar";
import BuyForm from "./BuyForm";

import "./Buy.css";

function Buy() {
  return (
    <div className="buy-container">
      <Navbar />
      {/* <div className="search-bar">
        <SearchBar />
      </div> */}
      <div>
        <BuyForm />
      </div>
      <span className="footer">
        <Footer />
      </span>
    </div>
  );
}

export default Buy;
