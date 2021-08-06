import {
  ContentContainer,
  SectionTitle,
  InputSelect,
  Skeleton,
  Button,
  InputNumber,
  Swal,
} from "@components";
import React, { useContext, useEffect, useState } from "react";
import { ContextMaster } from "@context";

const AddListCourse = () => {
  const {
    state: { multipleDropdownData },
    getMultipleDropdownData,
    setFormName,
    saveFormData,
  } = useContext(ContextMaster);

  const [inputValue, setInputValue] = useState({
    mapel: undefined,
    jenjangkelas: undefined,
    paket: undefined,
    wilayah: undefined,
    biaya: undefined,
    gaji_tutor: undefined,
  });

  const [prompt, setPrompt] = useState({
    mapel: undefined,
    jenjangkelas: undefined,
    paket: undefined,
    wilayah: undefined,
  });

  useEffect(() => {
    getMultipleDropdownData();
    setFormName("master_les");
  }, []);

  const clearForm = () => {
    setPrompt({
      mapel: undefined,
      jenjangkelas: undefined,
      paket: undefined,
      wilayah: undefined,
    });
    setInputValue({
      mapel: undefined,
      jenjangkelas: undefined,
      paket: undefined,
      wilayah: undefined,
      biaya: "",
      gaji_tutor: "",
    });
  };

  // tampilan prompt sesuai child dari object prompt
  const conditionalPromptRender = (type) => {
    if (prompt[type] !== undefined) {
      if (type == "mapel") {
        return <div>{prompt.mapel.nama}</div>;
      } else if (type == "jenjangkelas") {
        return <div>{prompt.jenjangkelas.nama}</div>;
      } else if (type == "paket") {
        return <div>{prompt.paket.nama}</div>;
      } else if (type == "wilayah") {
        return <div>{prompt.wilayah.nama}</div>;
      }
    } else {
      return <div>Pilih Data...</div>;
    }
  };

  // tampilan data dropdown sesuai child dari object prompt
  const ConditionalDropdownRender = (type, heading) => {
    if (multipleDropdownData[type] === undefined) {
      return <Skeleton mainCount={[1, 2]} elementClassName="w-4/5 h-3 mt-4" />;
      // tampilan jika data kosong
    } else if (multipleDropdownData[type] === null) {
      return (
        <>
          <p className="mt-4 text-red-500">{`Data ${heading} Kosong`}</p>
          <p className="text-red-500">
            Silahkan tambahkan melalui menu data master
          </p>
        </>
      );
    } else {
      return (
        multipleDropdownData[type] && (
          <InputSelect
            heading={heading}
            containerClassName="mt-0 w-full"
            prompt={conditionalPromptRender(type)}
            data={multipleDropdownData[type]}
            onChange={(val) => {
              // untuk inputvalue mapel
              if (type == "mapel") {
                setPrompt({
                  ...prompt,
                  mapel: val,
                });
                setInputValue({
                  ...inputValue,
                  mapel: val.nama,
                });
                // untuk inputvalue jenjangkelas
              } else if (type == "jenjangkelas") {
                setPrompt({
                  ...prompt,
                  jenjangkelas: val,
                });
                setInputValue({
                  ...inputValue,
                  jenjangkelas: val.nama,
                });
                // untuk inputvalue paket
              } else if (type == "paket") {
                setPrompt({
                  ...prompt,
                  paket: val,
                });
                setInputValue({
                  ...inputValue,
                  paket: val.nama,
                });
                // untuk inputvalue wilayah
              } else if (type == "wilayah") {
                setPrompt({
                  ...prompt,
                  wilayah: val,
                });
                setInputValue({
                  ...inputValue,
                  wilayah: val.nama,
                });
                // tampilan prompt pertama kali
                // atau saat belum ada data yang di pilih
              } else {
                return <div>Pilih Data...</div>;
              }
            }}
          />
        )
      );
    }
  };

  return (
    <ContentContainer additionalClassName="w-full flex-grow bg-white rounded-lg p-6 md:ml-8">
      <SectionTitle heading="Tambah Les" />

      {ConditionalDropdownRender("mapel", "Mapel")}

      {ConditionalDropdownRender("jenjangkelas", "Jenjang Kelas")}

      {ConditionalDropdownRender("paket", "Paket")}

      {ConditionalDropdownRender("wilayah", "Wilayah")}

      <InputNumber
        label="Harga"
        value={inputValue.biaya}
        placeholder="Masukkan harga pilihan les"
        onChange={(e) => {
          setInputValue({
            ...inputValue,
            biaya: e.target.value,
          });
        }}
      />

      <InputNumber
        label="Fee Tutor"
        value={inputValue.gaji_tutor}
        placeholder="Masukkan besar Fee tutor"
        onChange={(e) => {
          setInputValue({
            ...inputValue,
            gaji_tutor: e.target.value,
          });
        }}
      />

      <Button
        type="submit"
        text="Simpan"
        additionalClassName="mt-8 bg-yellow-400 hover:bg-yellow-600 w-full rounded-full"
        onClick={() => {
          if (inputValue) {
            if (
              inputValue.mapel === undefined ||
              inputValue.jenjangkelas === undefined ||
              inputValue.paket === undefined ||
              inputValue.wilayah === undefined ||
              inputValue.biaya === undefined ||
              inputValue.gaji_tutor === undefined
            ) {
              Swal.fire({
                icon: "error",
                text: "data tidak boleh kosong",
                confirmButtonColor: "#FBBF24",
              });
            } else {
              saveFormData(inputValue);
              Swal.fire({
                icon: "success",
                text: "berhasil menambahkan les",
                confirmButtonColor: "#FBBF24",
              });
              // bersihkan form setelah simpan data
              clearForm();
            }
          }
        }}
      />
    </ContentContainer>
  );
};

export default AddListCourse;
