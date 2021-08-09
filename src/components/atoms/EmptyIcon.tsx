import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

// Icon dan tulisan yang ditampilkan jika data kosong
export const EmptyIcon = () => {
  return (
    <div className="flex flex-col mt-4">
      <FontAwesomeIcon
        icon={faDatabase}
        className="flex-grow text-6xl self-center text-gray-300 opacity-50"
      />
      <p className="text-center text-gray-300">Tidak ada data</p>
    </div>
  );
};
