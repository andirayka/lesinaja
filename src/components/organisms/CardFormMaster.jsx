import React, { useState } from "react";
import { RowMaster, EmptyIcon, Skeleton } from "@components";

const CardFormMaster = ({
  containerClass,
  data,
  formStatus,
  isAdding,
  setIsAdding,
}) => {
  // Diisi integer urutan row yang sedang edit
  const [editingRow, setEditingRow] = useState(undefined);
  const [inputValue, setInputValue] = useState({
    nama: "",
    jumlah_pertemuan: "",
    biaya_daftar: "",
    provinsi: "",
  });

  const renderList = () => {
    if (formStatus == "loading") {
      return (
        <Skeleton
          mainCount={[1, 2, 3, 4, 5, 6]}
          containerClassName="space-y-3 px-4 py-2"
        />
      );
    }

    if (!data) {
      return <EmptyIcon />;
    }

    return Object.entries(data).map(([key, value], index) => {
      return (
        <RowMaster
          key={index}
          inputValue={inputValue}
          onClickEdit={(value) => {
            setInputValue(value);
            setEditingRow(index);
          }}
          onClickSave={() => {
            setEditingRow(undefined);
          }}
          onClickCancel={() => {
            setEditingRow(undefined);
          }}
          setInputValue={setInputValue}
          isEditing={index === editingRow}
          item={{ ...value, id: key }}
        />
      );
    });
  };

  return (
    <div className={`rounded-md bg-white ${containerClass}`}>
      {/* Header */}
      <div className="rounded-md p-2.5 bg-yellow-400 flex flex-row">
        <p className="font-semibold text-xl w-3/4">Nama</p>
        <p className="font-semibold text-xl text-center w-1/4">Aksi</p>
      </div>

      {/* Table Row when user is adding new data */}
      {isAdding && (
        <RowMaster
          inputValue={inputValue}
          onClickSave={() => {
            setIsAdding(false);
          }}
          onClickCancel={() => {
            setIsAdding(false);
          }}
          setInputValue={setInputValue}
          isEditing
        />
      )}

      {renderList()}
    </div>
  );
};

export default CardFormMaster;
