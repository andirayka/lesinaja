// @ts-nocheck
import {
  ContentContainer,
  Title,
  InputSelect,
  SkeletonLoading,
  Button,
  InputNumber,
  Swal,
  FieldError,
  InputSelectSec,
} from "@components";
import React, { useContext, useEffect, useState } from "react";
import { MasterContext } from "@context";
import { useLocation } from "react-router-dom";
import { getFirebaseDataOnce } from "@utils";
import { useForm } from "react-hook-form";

export const AddListCourse = () => {
  const {
    state: { multipleDropdownData },
    getMultipleDropdownData,
    setFormName,
    saveFormData,
  } = useContext(MasterContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [inputValue, setInputValue] = useState({
    gaji_tutor: "",
    biaya: "",
  });

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

  const [prompt, setPrompt] = useState({});

  const [submitError, setSubmitError] = useState(false);

  const { state: prevData } = useLocation();

  useEffect(() => {
    getMultipleDropdownData();
    setFormName("master_les");

    if (prevData.prevValue) {
      setInputValue(prevData.prevValue);
      getMasterData();
    }
  }, [prevData]);

  const clearForm = () => {
    setPrompt({});

    setInputValue({
      biaya: "",
      gaji_tutor: "",
    });
  };

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
          <>
            <InputSelect
              heading={heading}
              containerClassName="cursor-pointer mt-6"
              itemClassName="w-full"
              prompt={conditionalPromptRender(type)}
              data={multipleDropdownData[type]}
              onChange={({ key, value }) => {
                if (type == "mapel") {
                  setPrompt({
                    ...prompt,
                    mapel: value.nama,
                  });
                  setInputValue({
                    ...inputValue,
                    mapel: key,
                  });
                } else if (type == "jenjangkelas") {
                  setPrompt({
                    ...prompt,
                    jenjangkelas: value.nama,
                  });
                  setInputValue({
                    ...inputValue,
                    jenjangkelas: key,
                  });
                } else if (type == "paket") {
                  setPrompt({
                    ...prompt,
                    paket: value.nama,
                  });
                  setInputValue({
                    ...inputValue,
                    paket: key,
                  });
                } else if (type == "wilayah") {
                  setPrompt({
                    ...prompt,
                    wilayah: value.nama,
                  });
                  setInputValue({
                    ...inputValue,
                    wilayah: key,
                  });
                } else {
                  return <div>Pilih Data...</div>;
                }
              }}
            />
          </>
        )
      );
    }
  };

  const errorRender = (type: string) => {
    if (!inputValue[type] && (errors.biaya || errors.gaji_tutor)) {
      if (type == "mapel") {
        console.log("hi");
        return <p>mooo</p>;
      }
    }
  };

  const onSubmit = (data: any) => {
    if (
      inputValue.mapel &&
      inputValue.jenjangkelas &&
      inputValue.paket &&
      inputValue.wilayah
    ) {
      if (prevData.prevKey) {
        setSubmitError(false);
        // saveFormData({ ...inputValue, id: prevData.prevKey });
        Swal.fire({
          icon: "success",
          text: "berhasil update les",
          confirmButtonColor: "#FBBF24",
        });
      } else {
        // saveFormData(inputValue);
        Swal.fire({
          icon: "success",
          text: "berhasil menambahkan les",
          confirmButtonColor: "#FBBF24",
        });
        // bersihkan form setelah simpan data
        clearForm();
      }
    }
  };

  return (
    <ContentContainer additionalClassName="flex-grow bg-white rounded-lg p-6">
      <Title
        type="pageTitle"
        title={prevData.isUpdating ? "Edit Les" : "Tambah Les"}
      />

      {conditionalDropdownRender("mapel", "Mapel")}
      {errorRender("mapel")}

      {conditionalDropdownRender("jenjangkelas", "Jenjang Kelas")}

      {conditionalDropdownRender("paket", "Paket")}

      {conditionalDropdownRender("wilayah", "Wilayah")}

      {multipleDropdownData.wilayah ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputNumber
            label="Biaya"
            placeholder="Masukkan biaya pilihan les"
            useHookRegister={register("biaya", {
              required: "biaya les harus diisi",
            })}
          />
          {errors.biaya && <FieldError message={errors.biaya.message} />}

          <InputNumber
            label="Gaji Tutor"
            placeholder="Masukkan besar Fee tutor"
            useHookRegister={register("gaji_tutor", {
              required: "gaji tutor harus diisi",
            })}
          />
          {errors.gaji_tutor && (
            <FieldError message={errors.gaji_tutor.message} />
          )}

          <Button
            type="submit"
            text="Simpan"
            additionalClassName="mt-8 bg-yellow-400 hover:bg-yellow-600 w-full rounded-full"
          />
        </form>
      ) : (
        <SkeletonLoading
          fullWidthLineCount={2}
          elementClassName="w-4/5 h-3 mt-4"
        />
      )}
    </ContentContainer>
  );
};
