// @ts-nocheck
import {
  ContentContainer,
  Title,
  InputSelect,
  SkeletonLoading,
  Button,
  InputNumber,
  Swal,
} from "@components";
import React, { useContext, useEffect, useState } from "react";
import { MasterContext } from "@context";
import { useLocation } from "react-router-dom";
import { getFirebaseDataOnce } from "@utils";

export const AddListCourse = () => {
  const {
    state: { multipleDropdownData },
    getMultipleDropdownData,
    setFormName,
    saveFormData,
  } = useContext(MasterContext);

  const [inputValue, setInputValue] = useState({
    mapel: undefined,
    jenjangkelas: undefined,
    paket: undefined,
    wilayah: undefined,
    biaya: "",
    gaji_tutor: "",
  });

  const [prompt, setPrompt] = useState({
    mapel: undefined,
    jenjangkelas: undefined,
    paket: undefined,
    wilayah: undefined,
  });

  const { state: prevData } = useLocation();

  const getMasterData = async () => {
    if (prevData.prevValue) {
      const queryData = {
        mapel: await getFirebaseDataOnce(
          `master_mapel/${prevData.prevValue.mapel}/nama`
        ),
        jenjangkelas: await getFirebaseDataOnce(
          `master_jenjangkelas/${prevData.prevValue.jenjangkelas}/nama`
        ),
        paket: await getFirebaseDataOnce(
          `master_paket/${prevData.prevValue.paket}/nama`
        ),
        wilayah: await getFirebaseDataOnce(
          `master_wilayah/${prevData.prevValue.wilayah}/nama`
        ),
      };

      setPrompt(queryData);
    }
  };

  useEffect(() => {
    getMultipleDropdownData();
    setFormName("master_les");

    if (prevData.prevValue) {
      setInputValue(prevData.prevValue);
      getMasterData();
    }
  }, [prevData]);

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
    if (prompt[type]) {
      if (type == "mapel") {
        return <p>{prompt.mapel}</p>;
      } else if (type == "jenjangkelas") {
        return <p>{prompt.jenjangkelas}</p>;
      } else if (type == "paket") {
        return <p>{prompt.paket}</p>;
      } else if (type == "wilayah") {
        return <p>{prompt.wilayah}</p>;
      }
    } else {
      return <p>Pilih Data...</p>;
    }
  };

  // tampilan data dropdown sesuai child dari object prompt
  const conditionalDropdownRender = (type, heading) => {
    if (multipleDropdownData[type] === undefined) {
      return (
        <SkeletonLoading
          fullWidthLineCount={2}
          elementClassName="w-4/5 h-3 mt-4"
        />
      );
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
            containerClassName="cursor-pointer mt-6"
            itemClassName="w-full"
            prompt={conditionalPromptRender(type)}
            data={multipleDropdownData[type]}
            onChange={({ key, value }) => {
              // untuk inputvalue mapel
              if (type == "mapel") {
                setPrompt({
                  ...prompt,
                  mapel: value.nama,
                });
                setInputValue({
                  ...inputValue,
                  mapel: key,
                });
                // untuk inputvalue jenjangkelas
              } else if (type == "jenjangkelas") {
                setPrompt({
                  ...prompt,
                  jenjangkelas: value.nama,
                });
                setInputValue({
                  ...inputValue,
                  jenjangkelas: key,
                });
                // untuk inputvalue paket
              } else if (type == "paket") {
                setPrompt({
                  ...prompt,
                  paket: value.nama,
                });
                setInputValue({
                  ...inputValue,
                  paket: key,
                });
                // untuk inputvalue wilayah
              } else if (type == "wilayah") {
                setPrompt({
                  ...prompt,
                  wilayah: value.nama,
                });
                setInputValue({
                  ...inputValue,
                  wilayah: key,
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
    <ContentContainer additionalClassName="flex-grow bg-white rounded-lg p-6">
      <Title
        type="pageTitle"
        title={prevData.isUpdating ? "Edit Les" : "Tambah Les"}
      />

      {conditionalDropdownRender("mapel", "Mapel")}

      {conditionalDropdownRender("jenjangkelas", "Jenjang Kelas")}

      {conditionalDropdownRender("paket", "Paket")}

      {conditionalDropdownRender("wilayah", "Wilayah")}

      {multipleDropdownData.wilayah ? (
        <>
          <InputNumber
            label="Harga"
            value={inputValue.biaya}
            placeholder="Masukkan harga pilihan les"
            onChange={(e) => {
              setInputValue({
                ...inputValue,
                biaya: parseInt(e.target.value),
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
                gaji_tutor: parseInt(e.target.value),
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
                  if (prevData.prevKey) {
                    saveFormData({ ...inputValue, id: prevData.prevKey });
                    Swal.fire({
                      icon: "success",
                      text: "berhasil update les",
                      confirmButtonColor: "#FBBF24",
                    });
                  } else {
                    console.log(inputValue);
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
              }
            }}
          />
        </>
      ) : (
        <SkeletonLoading
          fullWidthLineCount={2}
          elementClassName="w-4/5 h-3 mt-4"
        />
      )}
    </ContentContainer>
  );
};
