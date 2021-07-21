import React from 'react';
import { Title, CardItem, CardKeyValue, Button } from '@components';

const ListCourse = () => {
  return (
    <div className="w-full flex-grow ml-8">
      <Title text="Daftar Pilihan Les" type="pageTitle" />
      <Button
        text="Tambah Pilihan Les"
        additionalClassName="bg-yellow-500 rounded-lg font-medium mt-4"
        onClick={() => {}}
      />

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
