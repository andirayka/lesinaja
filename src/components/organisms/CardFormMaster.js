import React from "react";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";

const CardFormMaster = ({ containerClass, data, onDelete }) => {
  return (
    <div className={`rounded-md bg-white ${containerClass}`}>
      <div className="rounded-md p-2.5 bg-blue-300 flex flex-row">
        <p className="font-semibold text-xl w-3/4">Nama</p>
        <p className="font-semibold text-xl text-center w-1/4">Aksi</p>
      </div>

      {data.map((item, key) => {
        return (
          <div key={key} className="flex flex-row py-4">
            <div className="w-3/4 ml-2.5 text-lg">{item.name}</div>
            <div className="w-1/4 flex flex-row">
              <button className="flex-1 flex justify-center" onClick={() => {}}>
                <PencilAltIcon className="h-8 w-8 text-gray-900" />
              </button>
              <button
                className="flex-1 flex justify-center"
                onClick={() => {
                  onDelete(item);
                }}
              >
                <TrashIcon className="h-8 w-8 text-gray-900" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardFormMaster;
