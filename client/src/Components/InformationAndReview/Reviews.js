import React from "react";

import "./Reviews.css";

function Reviews(props) {
  return (
    <div className="review-container">
      {/* <div className="image-container">Image</div> */}
      <div className="comments-container">{props.comments}</div>
    </div>
  );
}

export default Reviews;
