import React from "react";

const FieldMaster = ({ type, onClickLeft, onClickRight }) => {
  if (type == "editing") {
    return (
      <div className="flex flex-row py-4">
        <div className="w-3/4 ml-2.5 text-lg">
          <input
            autoFocus
            type="text"
            className="border-b-2 outline-none border-gray-300 w-4/5 focus:border-gray-600"
          />
        </div>
        <div className="w-1/4 flex flex-row justify-center">
          <div className="flex flex-1 justify-center">
            <button
              onClick={onClickLeft}
              className="self-center bg-green-500 rounded-lg w-20 py-1.5"
            >
              Simpan
            </button>
          </div>
          <div className="flex flex-1 justify-center">
            <button
              onClick={onClickRight}
              className="self-center bg-red-500 rounded-lg w-20 py-1.5"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default FieldMaster;
