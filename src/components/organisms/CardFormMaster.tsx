import React, { FC, useState } from "react";
import { RowMaster, EmptyIcon, SkeletonLoading, InputText } from "@components";

type Props = {
  containerClass: string;
  data: object;
  formStatus: string;
  isAdding: boolean;
  setIsAdding: any;
};

export const CardFormMaster: FC<Props> = ({
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
    id_provinsi: [],
  };

  // Diisi integer urutan row yang sedang edit
  const [editingRow, setEditingRow] = useState<number | undefined>(undefined);

  const [inputValue, setInputValue] = useState<object>({ ...intialValue });

  // untuk input text filter
  const [query, setQuery] = useState("");

  const renderList = () => {
    if (formStatus == "loading") {
      return (
        <SkeletonLoading
          fullWidthLineCount={6}
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
      .map(([key, value], index: number) => {
        return (
          <RowMaster
            key={index}
            inputValue={inputValue}
            onClickEdit={(value: any) => {
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

      {/* form search data */}
      {formStatus == "viewing" && (
        <InputText
          value={query}
          placeholder="Cari data berdasarkan nama..."
          containerClassName="mx-2 mt-4"
          onChange={(e) => setQuery(e.target.value)}
        />
      )}

      {/* row saat dalam status editing */}
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
