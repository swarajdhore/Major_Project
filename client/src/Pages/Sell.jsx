import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import SellForm from "./SellForm";
import ChatBot from "../Components/ChatBot/ChatBot";

function Sell() {
  return (
    <div>
      <Navbar />

      <div className="sell-component">
        <SellForm />
      </div>
      <div className="z-9999 fixed bottom-2 right-2">
        <ChatBot />
      </div>

      <Footer />
    </div>
  );
}

export default Sell;
