import React from "react";
import { RowMaster, Skeleton } from "@components";

const CardFormMaster = ({ containerClass, data, formStatus, children }) => {
  return (
    <div className={`rounded-md bg-white ${containerClass}`}>
      <div className="rounded-md p-2.5 bg-yellow-400 flex flex-row">
        <p className="font-semibold text-xl w-3/4">Nama</p>
        <p className="font-semibold text-xl text-center w-1/4">Aksi</p>
      </div>

      {/* Table Row when user is adding new data */}
      {formStatus == "adding" && <RowMaster type="editing" />}
      {/* {formStatus == "loading" && <RowMaster type="editing" />} */}

      {data &&
        Object.entries(data).map(([key, value], index) => {
          return (
            <RowMaster key={index} type="list" item={{ ...value, id: key }} />
          );
        })}

      {formStatus == "empty" && (
        <p className="text-center text-3xl my-4">Tidak ada data</p>
      )}
      {children}
    </div>
  );
};

export default CardFormMaster;
