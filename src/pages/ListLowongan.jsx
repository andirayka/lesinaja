import { CardItem, Title, CardKeyValue, Button } from "@components";
import React from "react";

const ListLowongan = () => {
  return (
    <div className="w-full flex-grow md:ml-8">
      <Title
        text="Daftar Lowongan Mengajar di Kecamatan Buduran"
        type="pageTitle"
      />

      {[1, 1].map((item, key) => {
        return (
          <CardItem
            key={key}
            title="Bhs. Inggris Kelas 3 SD"
            containerClass="mt-8"
          >
            <CardKeyValue
              keyName="Tempat"
              value="Perum Graha Kuncara Blok H No.29 Kemiri"
            />
            <CardKeyValue
              keyName="Fee"
              value="Perum Graha Kuncara Blok H No.29 Kemiri"
            />
            <CardKeyValue
              keyName="Durasi"
              value="Perum Graha Kuncara Blok H No.29 Kemiri"
            />
            <CardKeyValue
              keyName="Jadwal Les"
              value="Perum Graha Kuncara Blok H No.29 Kemiri"
            />
            <CardKeyValue
              keyName="Tanggal Awal Les"
              value="Perum Graha Kuncara Blok H No.29 Kemiri"
            />
            <div className="flex flex-row mt-8 justify-end">
              <Button
                text="Ambil"
                additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium px-14"
                onClick={() => {}}
              />
            </div>
          </CardItem>
        );
      })}
    </div>
  );
};

export default ListLowongan;
