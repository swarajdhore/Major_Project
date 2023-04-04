import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import SellForm from "./SellForm";

function Sell() {
  return (
    <div>
      <Navbar />

      <div className="sell-component">
        <SellForm />
      </div>

      <Footer />
    </div>
  );
}

export default Sell;
