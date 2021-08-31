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

  const { state: prevData } = useLocation();

  useEffect(() => {
    getMultipleDropdownData();
    setFormName("master_les");

    if (prevData.prevValue) {
      setInputValue(prevData.prevValue);
      getMasterData();
    }
  }, [prevData]);

  const conditionalDropdownRender = (type, label) => {
    if (multipleDropdownData[type] === undefined) {
      return (
        <SkeletonLoading
          fullWidthLineCount={4}
          elementClassName="w-4/5 h-3 mt-4"
        />
      );
      // tampilan jika data kosong
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
            defaultOption={`Pilih ${type}...`}
            data={multipleDropdownData[type]}
            useHookRegister={register(type, {
              required: `data ${type} belum diisi`,
            })}
          />
          {errors[type] && <FieldError message={errors[type].message} />}
        </>
      );
    }
  };

  const onSubmit = (data: any) => {
    if (prevData.prevKey) {
      // saveFormData({ ...inputValue, id: prevData.prevKey });
      Swal.fire({
        icon: "success",
        text: "berhasil update les",
        confirmButtonColor: "#FBBF24",
      });
    } else {
      // saveFormData(data);
      Swal.fire({
        icon: "success",
        text: "berhasil menambahkan les",
        confirmButtonColor: "#FBBF24",
      });
    }
  };

  return (
    <ContentContainer additionalClassName="flex-grow bg-white rounded-lg p-6">
      <Title
        type="pageTitle"
        title={prevData.isUpdating ? "Edit Les" : "Tambah Les"}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        {conditionalDropdownRender("mapel", "Mapel")}

        {conditionalDropdownRender("jenjangkelas", "Jenjang Kelas")}

        {conditionalDropdownRender("paket", "Paket")}

        {conditionalDropdownRender("wilayah", "Wilayah")}

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
    </ContentContainer>
  );
};
