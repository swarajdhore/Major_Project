import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import SearchBar from "../Components/UI/SearchBar/SearchBar";
import Card from "../Components/UI/Card/Card";

import "./Sell.css";

function Sell() {
  return (
    <div className="sell-container">
      <Navbar />
      {/* <div className="search-bar">
        <SearchBar />
      </div> */}

      <div className="body">
        Hi
        <Card />
      </div>

      <span className="footer">
        <Footer />
      </span>
    </div>
  );
}

export default Sell;
