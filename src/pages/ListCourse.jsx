import React, { useContext, useEffect } from "react";
import { Title, CardItem, CardKeyValue, Button, EmptyIcon } from "@components";
import { Link } from "react-router-dom";
import { ContextMaster } from "@context";

const ListCourse = () => {
  const {
    state: { formData },
    getFormData,
  } = useContext(ContextMaster);

  useEffect(() => {
    getFormData("master_les");
  }, []);

  if (!formData) {
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
          <CardItem key={index} title={value.id_mapel} containerClass="mt-8">
            <CardKeyValue keyName="Paket" value={value.id_paket} />
            <CardKeyValue keyName="Wilayah" value={value.id_wilayah} />
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
                onClick={() => {}}
              />
            </div>
          </CardItem>
        );
      })}
    </div>
  );
};

export default ListCourse;
