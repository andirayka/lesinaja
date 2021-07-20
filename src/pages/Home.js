import React from "react";
import {
  Title,
  CardItem,
  Paginations,
  CardNotification,
  CardTable,
} from "@components";

const Home = () => {
  return (
    <div>
      <Title text="Beranda Administrator" type="pageTitle" />

      {/* Notifications */}
      <CardItem title="Notifikasi Terbaru" containerClass="mt-8">
        {[1, 1, 1, 1, 1].map((item, key) => {
          return (
            <CardNotification
              key={key}
              notification="Tutor Zainal Abidin menunggu pembayaran Rp 200.000 ke rekening 112334456666"
              buttonText="Tandai Sudah Dibaca"
              onClickButton={() => {}}
            />
          );
        })}
        <Paginations />
      </CardItem>

      {/* Social Media Effectivity */}
      <CardItem title="Efektivitas Sosial Media" containerClass="mt-8">
        <CardTable
          headerValues={["Sosial Media", "Efektivitas", "Keterangan"]}
          contentValues={[
            ["Facebook", "40%", "100 wali murid tahu Lesin Aja dari Facebook"],
            ["Tiktok", "40%", "100 wali murid tahu Lesin Aja dari Tiktok"],
            ["Instagram", "20%", "50 wali murid tahu Lesin Aja dari Instagram"],
          ]}
        />
      </CardItem>
    </div>
  );
};

export default Home;
