import React, { useState } from "react";
import { RowMaster, EmptyIcon, Skeleton, InputText } from "@components";

const CardFormMaster = ({
  containerClass,
  data,
  formStatus,
  isAdding,
  setIsAdding,
}) => {
  const intialValue = {
    nama: "",
    jumlah_pertemuan: "",
    biaya_daftar: "",
    provinsi: "",
  };

  // Diisi integer urutan row yang sedang edit
  const [editingRow, setEditingRow] = useState(undefined);

  const [inputValue, setInputValue] = useState({
    ...intialValue,
  });

  // state untuk input text filter
  const [query, setQuery] = useState("");

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

    // menampilkan data sekaligus filter
    return Object.entries(data)
      .filter(([key, value]) => {
        // i artinya tidak case sensitive
        const matchKeyword = RegExp(query, "i");

        // return data yang sesuai dengan pencarian
        return matchKeyword.test(value.nama);
      })
      .map(([key, value], index) => {
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
              setInputValue({ ...intialValue });
            }}
            onClickCancel={() => {
              setEditingRow(undefined);
              setInputValue({ ...intialValue });
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
      <InputText
        value={query}
        placeholder="Cari data berdasarkan nama..."
        containerClassName="mx-2 mt-4"
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Table Row when user is adding new data */}
      {isAdding && (
        <RowMaster
          inputValue={inputValue}
          onClickSave={() => {
            setIsAdding(false);
            setInputValue({ ...intialValue });
          }}
          onClickCancel={() => {
            setIsAdding(false);
            setInputValue({ ...intialValue });
          }}
          setInputValue={setInputValue}
          isEditing
        />
      )}

      {/* Table Row when user is update data */}
      {renderList()}
    </div>
  );
};

export default CardFormMaster;
