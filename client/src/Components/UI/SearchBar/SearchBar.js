import React from "react";

import "./SearchBar.css";

function SearchBar() {
  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" className="input-box" placeholder="Search........" />
      </div>
      <div className="searchInputs">
        <button className="active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-1 bg-indigo-600 focus:ring-indigo-400 focus:ring-offset-1 dark:hover:bg-indigo-700 dark:hover:text-gray-100 disabled:opacity-50 dark:focus:ring-indigo-400 disabled:pointer-events-none dark:focus:ring-offset-gray-900 dark:bg-indigo-600 text-white hover:bg-indigo-700 h-11 py-2 px-4">
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
