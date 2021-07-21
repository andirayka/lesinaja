import React, { useState } from "react";
import DataRandom from "./data_random.json";

const InputSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <div className="flex rounded-lg outline-none px-1 h-10 w-full bg-white bg-opacity-50 mt-8">
        <div className="flex-none w-16 h-16">
          {/* <SearchIcon className="w-10 ml-2 opacity-50" /> */}
        </div>
        <div className="flex-grow h-16">
          <input
            type="search"
            placeholder="Cari Tutor"
            className="w-full rounded-lg outline-none bg-transparent py-2 placeholder-gray-600"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        <div className="flex-none w-16 h-16">
          {/* <AdjustmentsIcon className="w-10 ml-2 opacity-50" /> */}
        </div>
      </div>
      <div>
        {DataRandom.filter((val) => {
          if (searchTerm == "") {
            return val;
          } else if (
            val.first_name
              .toLowerCase()
              .includes(searchTerm.toLocaleLowerCase())
          ) {
            return val;
          }
        }).map((val, key) => {
          return (
            <div key={key}>
              <a>{val.first_name} </a>
              <a>{val.email}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InputSearch;
