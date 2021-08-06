import React, { useContext, useEffect } from "react";
import {
  Title,
  CardItem,
  CardKeyValue,
  Button,
  EmptyIcon,
  Swal,
} from "@components";
import { Link } from "react-router-dom";
import { ContextMaster } from "@context";

const ListCourse = () => {
  const {
    state: { formData, formStatus },
    getFormData,
    deleteFormData,
    setFormName,
  } = useContext(ContextMaster);

  useEffect(() => {
    getFormData("master_les");
    setFormName("master_les");
  }, []);

  if (formStatus == "loading") {
    return <EmptyIcon />;
  }

  return (
    <div className="w-full flex-grow md:ml-8">
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

      {Object.entries(formData).map(([key, value], index) => {
        return (
          <CardItem key={index} title={value.mapel} containerClass="mt-8">
            <CardKeyValue keyName="Paket" value={value.paket} />
            <CardKeyValue keyName="Wilayah" value={value.wilayah} />
            <CardKeyValue keyName="Harga" value={value.biaya} />
            <div className="flex flex-row mt-8 justify-end">
              <Button
                text="Ubah Pilihan Les"
                additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium mr-4"
                onClick={() => {}}
              />
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
