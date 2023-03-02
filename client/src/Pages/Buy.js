import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import SearchBar from "../Components/UI/SearchBar/SearchBar";

import "./Buy.css";

function Buy() {
  return (
    <div className="buy-container">
      {/* <div className="navbar"> */}
      <Navbar />
      <SearchBar />
    </div>
  );
}

export default Buy;
