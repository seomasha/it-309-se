import React from "react";
import { FormControl } from "react-bootstrap";
import { RiSearchFill } from "react-icons/ri";

const SearchBar = ({ placeholder = "Search", onChange }) => {
  return (
    <div className="search-bar d-flex border mx-4 py-1 px-3 rounded-3">
      <RiSearchFill size={22} className="my-auto icon" />
      <FormControl
        placeholder={placeholder}
        aria-label="Search"
        onChange={onChange}
        className="border-0 outline-0"
      />
    </div>
  );
};

export default SearchBar;
