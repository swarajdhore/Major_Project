import React from "react";

import "./SearchBar.css";

function SearchBar() {
  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" className="input-box" placeholder="Search........" />
      </div>
    </div>
  );
}

export default SearchBar;
