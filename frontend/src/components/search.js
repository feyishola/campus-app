import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterBuildings } from "../slices/buildingslice";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    dispatch(filterBuildings(query)); // Dispatch filter action
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search buildings, classes, offices..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="p-2 border border-gray-300 rounded text-black"
      />
    </div>
  );
};

export default SearchComponent;
