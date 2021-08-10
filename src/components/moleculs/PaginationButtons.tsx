import React, { FC } from "react";

// Tombol pagination
type Props = {
  dataCount: number; // Jumlah semua data terkait dalam database
  dataCountPerPage: number; // Jumlah data dalam satu halaman
  onClick: (indexButton: number) => void;
};
export const PaginationButtons: FC<Props> = ({
  dataCount,
  dataCountPerPage,
  onClick,
}) => {
  const buttonCount = Math.floor(dataCount / dataCountPerPage);
  console.log(buttonCount, dataCount, dataCountPerPage);

  return (
    <div className="flex justify-center mt-16">
      {[...Array(buttonCount).keys()].map((item) => {
        return (
          <button
            key={item}
            onClick={() => onClick(item)}
            className="rounded-xl px-5 py-4 mx-2 bg-yellow-400"
          >
            {item + 1}
          </button>
        );
      })}
    </div>
  );
};
