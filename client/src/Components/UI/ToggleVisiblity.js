import React, { useState } from "react";

export default function ToggleVisibility({ children }) {
  // React state to manage visibility
  const [show, setShow] = useState(false);

  // function to toggle the boolean value
  function toggleShow() {
    setShow(!show);
  }
  var buttonText = show ? "Close" : "Filters";

  return (
    <>
      {show && children}
      <button
        onClick={toggleShow}
        className="bg-gray-200 px-2 py-2 mx-2 my-2 rounded-lg font-medium"
      >
        {buttonText}
      </button>
    </>
  );
}
