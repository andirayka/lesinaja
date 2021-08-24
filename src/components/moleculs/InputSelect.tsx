import React, { useState, FC } from "react";
import { DropdownArrow } from "@assets";

type Props = {
  data: any;
  prompt: any;
  onChange?: any;
  heading?: string;
  containerClassName?: string;
  itemClassName?: string;
};

export const InputSelect: FC<Props> = ({
  data,
  prompt,
  onChange,
  heading,
  containerClassName = "mt-4 cursor-pointer",
  itemClassName = "w-4/5",
}) => {
  const [open, setOpen] = useState(false);

  // state untuk input text filter
  const [query, setQuery] = useState("");

  return (
    <>
      <div className={containerClassName}>
        {heading && <p>{heading}</p>}
        {/* aksi ketika klik dropdown */}
        <div
          className={`relative border-2 rounded-md p-1 ${itemClassName}`}
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
        <div className="max-h-40 full bg-gray-300 overflow-y-auto px-2 rounded-md">
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
                    className="hover:bg-white hover:rounded-md hover:p-1 hover:mb-1"
                    key={index}
                    onClick={() => {
                      onChange({ key, value });
                      setOpen(false);
                    }}
                  >
                    {value.nama}
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};
