import React, { useState } from "react";
import { DropdownArrow } from "@assets";

const InputSelect = ({ data, prompt, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="dropdown-container cursor-pointer">
      <div
        className="relative"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <div>{value ? value : prompt}</div>
        {!open && (
          <div className="absolute inset-y-0 right-0 flex items-center px-2">
            <DropdownArrow />
          </div>
        )}
      </div>
      <div className="max-h-40 w-full bg-gray-200 overflow-y-auto">
        {open && (
          <input
            type="text"
            className="w-full bg-gray-200"
            placeholder="cari data"
            autoFocus
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        )}

        {open &&
          data &&
          Object.values(data)
            .filter((item) => {
              // i artinya tidak case sensitive
              const matchKeyword = RegExp(query, "i");

              // return data yang sesuai dengan pencarian
              return matchKeyword.test(item.nama);
            })
            .map((filteredItem, index) => {
              return (
                <div
                  className="hover:bg-white"
                  key={index}
                  onClick={() => {
                    onChange(filteredItem);
                    setOpen(false);
                  }}
                >
                  {filteredItem.nama}
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default InputSelect;
