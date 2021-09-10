// @ts-nocheck
import {
  ContentContainer,
  Title,
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
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [prompt, setPrompt] = useState(undefined);

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

  const handleDropdownDefaultOption = (type: string) => {
    if (prompt) {
      return prompt[type];
    } else if (!prevData.prevValue) {
      return `Pilih ${type}...`;
    } else {
      return "Memuat...";
    }
  };

  const dropdownRender = (type, label) => {
    if (multipleDropdownData[type] === undefined && !prevData.prevValue) {
      return (
        <SkeletonLoading
          fullWidthLineCount={4}
          elementClassName="w-full h-3 mt-4"
        />
      );
    } else if (multipleDropdownData[type] === null) {
      return (
        <>
          <p className="mt-4 text-red-500">{`Data ${label} Kosong`}</p>
          <p className="text-red-500">
            Silahkan tambahkan melalui menu data master
          </p>
        </>
      );
    } else {
      return (
        <>
          <InputSelectSec
            label={label}
            defaultOption={handleDropdownDefaultOption(type)}
            defaultOptionValue={
              prevData.prevValue ? prevData.prevValue[type] : ""
            }
            data={multipleDropdownData[type]}
            useHookRegister={register(type, {
              required: `Data ${type} belum diisi`,
            })}
            disabled={!prompt && prevData.prevValue ? true : false}
          />
          {errors[type] && <FieldError message={errors[type].message} />}
        </>
      );
    }
  };

  const formRender = () => {
    if (multipleDropdownData.wilayah) {
      return (
        <>
          <InputNumber
            label="Biaya"
            placeholder="Masukkan biaya pilihan les"
            useHookRegister={register("biaya", {
              required: "Biaya les belum diisi",
            })}
          />
          {errors.biaya && <FieldError message={errors.biaya.message} />}

          <InputNumber
            label="Gaji Tutor"
            placeholder="Masukkan besar Fee tutor"
            useHookRegister={register("gaji_tutor", {
              required: "Gaji tutor belum diisi",
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
        </>
      );
    }
  };

  const onSubmit = (data: any) => {
    if (prevData.prevKey) {
      saveFormData({ ...data, id: prevData.prevKey });
      Swal.fire({
        icon: "success",
        text: "berhasil update les",
        confirmButtonColor: "#FBBF24",
      });
    } else {
      reset({
        mapel: "",
        jenjangkelas: "",
        paket: "",
        wilayah: "",
        biaya: "",
        gaji_tutor: "",
      });
      saveFormData(data);
      Swal.fire({
        icon: "success",
        text: "berhasil menambahkan les",
        confirmButtonColor: "#FBBF24",
      });
    }
  };

  useEffect(() => {
    getMultipleDropdownData();
    setFormName("master_les");

    if (prevData.prevValue) {
      getMasterData();
      setValue("gaji_tutor", prevData.prevValue.gaji_tutor);
      setValue("biaya", prevData.prevValue.biaya);
      console.log(prompt);
    }
  }, []);

  return (
    <ContentContainer additionalClassName="flex-grow bg-white rounded-lg p-6 shadow-lg">
      <Title
        type="pageTitle"
        title={prevData.isUpdating ? "Edit Les" : "Tambah Les"}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        {dropdownRender("mapel", "Mapel")}

        {dropdownRender("jenjangkelas", "Jenjang Kelas")}

        {dropdownRender("paket", "Paket")}

        {dropdownRender("wilayah", "Wilayah")}

        {formRender()}
      </form>
    </ContentContainer>
  );
};
