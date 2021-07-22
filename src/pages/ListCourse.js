import React from "react";
import { Title, CardItem, CardKeyValue, Button } from "@components";
import { Link } from "react-router-dom";

const ListCourse = () => {
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
          additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium mt-4"
          onClick={() => {}}
        />
      </Link>

      {[1, 1, 1, 1, 1, 1].map((item, key) => {
        return (
          <CardItem
            key={key}
            title="Bhs. Inggris Kelas 3 SD"
            containerClass="mt-8"
          >
            <CardKeyValue keyName="Paket" value="1 (4 pertemuan)" />
            <CardKeyValue keyName="Wilayah" value="Semua wilayah" />
            <CardKeyValue keyName="Harga" value="Rp 300.000" />
            <div className="flex flex-row mt-8 justify-end">
              <Button
                text="Ubah Pilihan Les"
                additionalClassName="bg-blue-300 rounded-lg font-medium mr-4"
                onClick={() => {}}
              />
              <Button
                text="Hapus Pilihan Les"
                additionalClassName="bg-red-500 rounded-lg font-medium"
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
