import React from "react";
import "./search.css";

const SearchBar = ({ onSearch }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search">
      <div className="search-container">
        <div className="search-icon">
          <i className="fas fa-search"></i>
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;