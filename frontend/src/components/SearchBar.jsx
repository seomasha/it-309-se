import React from "react";
import { FormControl } from "react-bootstrap";
import { RiSearchFill } from "react-icons/ri";

const SearchBar = ({ placeholder = "Search", onChange }) => {
  return (
    <div className="search-bar d-flex border mx-3 py-1 rounded-3">
      <RiSearchFill size={22} className="my-auto icon mx-2" />
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
