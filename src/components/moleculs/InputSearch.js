import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";

const InputSearch = ({ value, onChange }) => {
  return (
    <div>
      <div className="flex rounded-lg outline-none px-1 h-10 w-full bg-white bg-opacity-50 mt-8">
        <div className="flex-none w-16 h-16">
          <FontAwesomeIcon icon={faSearch} size="2x" className="ml-2" />
        </div>
        <div className="flex-grow h-16">
          <input
            value={value}
            type="search"
            placeholder="Cari Tutor"
            className="w-full rounded-lg outline-none bg-transparent py-2 placeholder-gray-600"
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
        </div>
        <div className="flex-none w-16 h-16">
          <FontAwesomeIcon icon={faFilter} size="2x" className="ml-2" />
        </div>
      </div>
    </div>
  );
};

export default InputSearch;
