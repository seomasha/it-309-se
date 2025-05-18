import React from "react";
import { FormControl } from "react-bootstrap";
import { RiSearchFill } from "react-icons/ri";

const SearchBar = ({ placeholder = "Search", value, onChange, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value.trim());
    }
  };

  return (
    <div className="search-bar bg-white d-flex border py-1 rounded-4">
      <RiSearchFill size={22} className="my-auto icon mx-2" />
      <FormControl
        placeholder={placeholder}
        aria-label="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        className="border-0 outline-0"
      />
    </div>
  );
};

export default SearchBar;
