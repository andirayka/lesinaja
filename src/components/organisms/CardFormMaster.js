import React from "react";
import { Button } from "@components";
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
              <div className="flex flex-1 justify-center">
                <button onClick={() => {}}>
                  <PencilAltIcon className="h-8 w-8 text-gray-900" />
                </button>
              </div>
              <div className="flex flex-1 justify-center">
                <button
                  onClick={() => {
                    onDelete(item);
                  }}
                >
                  <TrashIcon className="h-8 w-8 text-gray-900" />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex flex-row py-4">
        <div className="w-3/4 ml-2.5 text-lg">
          <input
            type="text"
            className="border-b-2 outline-none border-gray-300 w-4/5 focus:border-gray-600"
          />
        </div>
        <div className="w-1/4 flex flex-row justify-center bg-yellow-300">
          <button
            // onClick={onClick}
            className="self-center bg-green-500 rounded-lg"
          >
            Simpan
          </button>
          <button
            // onClick={onClick}
            className="self-center bg-red-500 rounded-lg"
          >
            Batal
          </button>
          {/* <button className="flex-1 flex justify-center" onClick={() => {}}>
            <PencilAltIcon className="h-8 w-8 text-gray-900" />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CardFormMaster;
