import React, { useState, FC } from "react";
import { DropdownArrow } from "@assets";

type Props = {
  data: any;
  prompt: any;
  onChange?: any;
  heading?: string;
  containerClassName?: string;
  itemClassName?: string;
  useHookRegister?: any;
};

export const InputSelect: FC<Props> = ({
  data,
  prompt,
  onChange,
  heading,
  useHookRegister,
  containerClassName = "mt-4 cursor-pointer",
  itemClassName = "w-4/5",
}) => {
  const [open, setOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // state untuk input text filter
  const [query, setQuery] = useState("");

  // const handleOpen = () => {
  //   if
  // };

  return (
    <>
      <div className={`relative ${containerClassName}`}>
        {heading && <p>{heading}</p>}
        {/* aksi ketika klik dropdown */}
        <div
          className={`relative border-2 rounded-md p-1 ${itemClassName}`}
          onClick={() => setOpen((prev) => !prev)}
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
        <div className="absolute w-full z-30 pr-4">
          <div className="shadow-xl max-h-40 bg-gray-300 overflow-y-auto px-2 rounded-md">
            {/* text input untuk filter */}
            {open && (
              <input
                type="text"
                className="w-full bg-gray-300 outline-none p-1"
                placeholder="cari data"
                autoFocus
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                {...useHookRegister}
              />
            )}

            {/* data dropdown yang akan difilter */}
            {open &&
              data &&
              Object.entries<any>(data)
                .filter(([key, value]) => {
                  // i artinya tidak case sensitive
                  const matchKeyword = RegExp(query, "i");

                  // return data yang sesuai dengan pencarian
                  return matchKeyword.test(value.nama);
                })
                .map(([key, value], index) => {
                  return (
                    <div
                      className="hover:bg-white hover:rounded-md p-1"
                      key={index}
                      onClick={() => {
                        onChange({ key, value });
                        setOpen(false);
                        setQuery("");
                      }}
                    >
                      {value.nama}
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
};
