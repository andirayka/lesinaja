import React from "react";
import { Button } from "@components";

const CardFormMaster = ({
  containerClass,
  data,
  formStatus,
  onDelete,
  onCancelEditing,
}) => {
  return (
    <div className={`rounded-md bg-white ${containerClass}`}>
      <div className="rounded-md p-2.5 bg-blue-300 flex flex-row">
        <p className="font-semibold text-xl w-3/4">Nama</p>
        <p className="font-semibold text-xl text-center w-1/4">Aksi</p>
      </div>

      {formStatus == "adding" && (
        <RowMaster type="editing" onClickRight={onCancelEditing} />
      )}

      {data.map((item, key) => {
        return (
          <div key={key} className="flex flex-row py-4">
            <div className="w-3/4 ml-2.5 text-lg">{item.name}</div>
            <div className="w-1/4 flex flex-row">
              <div className="flex flex-1 justify-center">
                <button onClick={() => {}}></button>
              </div>
              <div className="flex flex-1 justify-center">
                <button
                  onClick={() => {
                    onDelete(item);
                  }}
                ></button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardFormMaster;
