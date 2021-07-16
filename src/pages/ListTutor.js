import React from "react";
import { Title, CardItem, CardKeyValue } from "@components";

const ListTutor = () => {
  return (
    <div>
      <Title text="Daftar Tutor Lesin Aja" type="pageTitle" />

      <CardItem title="Beranda Administrator">
        <CardKeyValue keyName="Email" value="handoko@gmail.com" />
        <CardKeyValue keyName="No. WA" value="089912345678" />
        <CardKeyValue
          keyName="Alamat"
          value="Perum Graha Kuncara Blok H No.29 Kemiri , Sidoarjo, Jawa Timur, Kemiri, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61234"
        />
        <CardKeyValue keyName="Mata Pelajaran" value="Matematika" />
      </CardItem>
    </div>
  );
};

export default ListTutor;
