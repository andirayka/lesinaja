import React from "react";
import { Title, CardItem, CardKeyValue, Button } from "@components";

const ListTutor = () => {
  return (
    <div>
      <Title text="Daftar Tutor Lesin Aja" type="pageTitle" />

      {[1, 1, 1, 1, 1, 1].map((item, key) => {
        return (
          <CardItem
            key={key}
            title="Beranda Administrator"
            containerClass="mt-8"
          >
            <CardKeyValue keyName="Email" value="handoko@gmail.com" />
            <CardKeyValue keyName="No. WA" value="089912345678" />
            <CardKeyValue
              keyName="Alamat"
              value="Perum Graha Kuncara Blok H No.29 Kemiri , Sidoarjo, Jawa Timur, Kemiri, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61234"
            />
            <CardKeyValue keyName="Mata Pelajaran" value="Matematika" />
            <div className="flex-row mt-8">
              <Button
                text="Lihat Detail"
                additionalClassName="bg-blue-300 rounded-lg font-medium"
                onClick={() => {}}
              />
            </div>
          </CardItem>
        );
      })}
    </div>
  );
};

export default ListTutor;