import React, { useState } from "react";

import Close from "./Icons/Close";

export default function ToggleVisibility({ children }, props) {
  // React state to manage visibility
  const [show, setShow] = useState(false);

  // function to toggle the boolean value
  function toggleShow() {
    setShow(!show);
  }

  var buttonText = show ? <Close /> : "";
  const image = process.env.PUBLIC_URL + "/images/logo/botimg-1.png";

  return (
    <>
      {show && children}
      <button
        onClick={toggleShow}
        className="bg-gray-200 px-2 py-2 mx-2 my-2 rounded-full font-medium flex justify-center"
      >
        {props.messageCount > 0 && (
          <span className="bg-red-500 rounded-full px-2">
            {props.messageCount}
          </span>
        )}
        {!show && (
          <img
            src={image}
            className="rounded-full justify-center text-center"
            alt="img"
            height="50px"
            width="50px"
          />
        )}
        {buttonText}
      </button>
    </>
  );
}
