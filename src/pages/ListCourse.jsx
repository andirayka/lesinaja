import React, { useContext, useEffect, useState } from "react";
import {
  Title,
  CardItem,
  CardKeyValue,
  Button,
  EmptyIcon,
  Swal,
  Skeleton,
  RefreshIcon,
} from "@components";
import { Link } from "react-router-dom";
import { ContextMaster } from "@context";

const ListCourse = () => {
  const {
    // rtDatabase,
    state: { formData, formStatus },
    getFormData,
    deleteFormData,
    setFormName,
  } = useContext(ContextMaster);

  useEffect(() => {
    getFormData("master_les");
    setFormName("master_les");
  }, []);

  // tampilan form saat loading
  if (formStatus == "loading") {
    return (
      <div className="flex-grow md:ml-8 md:mr-8">
        <Title text="Daftar Pilihan Les" type="pageTitle" />
        <CardItem title="Loading..." containerClass="mt-8">
          <Skeleton mainCount={[1, 2, 3, 4, 5, 6]} />
        </CardItem>
      </div>
    );
  }

  // tampilan form saat data kosong
  if (formData === null) {
    return (
      <div className="flex-grow md:ml-8 md:mr-8">
        <Title text="Daftar Pilihan Les" type="pageTitle" />
        <Link
          to={{
            pathname: "/tambah-pilihanles",
          }}
        >
          <Button
            text="Tambah Pilihan Les"
            additionalClassName="bg-yellow-400 hover:bg-white hover:shadow-lg rounded-lg font-medium mt-4"
            onClick={() => {}}
          />
        </Link>
        <CardItem title="-" containerClass="mt-8">
          <EmptyIcon />
        </CardItem>
      </div>
    );
  }

  return (
    <div className="flex-grow md:ml-8 md:mr-8 md:mb-8">
      <Title title="Pilihan Les" text="Daftar / Pilihan Les" type="pageTitle" />
      <Link
        // button tambah mengirim state not updating
        to={{
          pathname: "/tambah-pilihanles",
          state: {
            isUpdating: false,
            prevValue: undefined,
            prevKey: undefined,
          },
        }}
      >
        <Button
          text="Tambah Pilihan Les"
          additionalClassName="bg-yellow-400 hover:bg-white hover:shadow-lg rounded-lg font-medium mt-4"
          onClick={() => {}}
        />
      </Link>

      {/* data yang diquery dari context */}
      {formData &&
        Object.entries(formData).map(([key, value], index) => {
          return (
            <CardItem key={index} title={value.mapel} containerClass="mt-8">
              {formStatus == "refreshing" && (
                <RefreshIcon additionalClassName="text-8xl absolute left-1/2" />
              )}

              <CardKeyValue keyName="Paket" value={value.paket} />
              <CardKeyValue keyName="Wilayah" value={value.wilayah} />
              <CardKeyValue keyName="Harga" value={value.biaya} />
              <div className="flex flex-row mt-8 justify-end">
                <Link
                  // button edit mengirim state updating
                  to={{
                    pathname: "/tambah-pilihanles",
                    state: { isUpdating: true, prevValue: value, prevKey: key },
                  }}
                >
                  <Button
                    text="Ubah Pilihan Les"
                    additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium mr-4"
                    onClick={() => {}}
                  />
                </Link>
                <Button
                  text="Hapus Pilihan Les"
                  additionalClassName="bg-yellow-600 hover:bg-red-500 rounded-lg font-medium"
                  onClick={() => {
                    Swal.fire({
                      text: `Apakah Anda yakin akan menghapus data les ${value.mapel}?`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#FBBF24",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Hapus",
                      cancelButtonText: "Batal",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteFormData(key);
                      }
                    });
                  }}
                />
              </div>
            </CardItem>
          );
        })}
    </div>
  );
};

export default ListCourse;
