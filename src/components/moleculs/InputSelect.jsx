import React, { useState } from "react";
import { DropdownArrow } from "@assets";

const InputSelect = ({ data, prompt, onChange }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="cursor-pointer">
      {/* aksi ketika klik dropdown */}
      <div
        className="relative w-4/5 mt-4 border-2 rounded-lg p-1"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        {/* tampilan data awal pada dropdown 
        dan tampilan data yang dipilih */}
        <div>{prompt}</div>
        {!open && (
          <div className="absolute inset-y-0 right-0 flex items-center px-2">
            {/* ikon panah dropdown */}
            <DropdownArrow />
          </div>
        )}
      </div>
      <div className="max-h-40 w-4/5 bg-gray-300 overflow-y-auto px-2">
        {/* text input untuk filter */}
        {open && (
          <input
            type="text"
            className="w-full bg-gray-300 outline-none"
            placeholder="cari data"
            autoFocus
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        )}

        {/* data dropdown yang akan difilter */}
        {open &&
          data &&
          Object.values(data)
            .filter((item) => {
              // i artinya tidak case sensitive
              // filter data berdasarkan query dari onChange select
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
