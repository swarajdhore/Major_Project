import React from "react";

import Reviews from "./Reviews";
import "./Information.css";

function Information() {
  return (
    <div className="container">
      <div className="information-box">
        <div className="information-box-1">" "</div>
        <div className="review-box">
          <div className="review-box-1">
            <Reviews />
          </div>
          <div className="review-box-1">
            <Reviews />
          </div>
          <div className="review-box-1">
            <Reviews />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;
