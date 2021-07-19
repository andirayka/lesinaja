import React from "react";
import { Title, CardItem, CardNotification } from "@components";

const Home = () => {
  return (
    <div>
      <Title text="Beranda Administrator" type="pageTitle" />

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
      </CardItem>
    </div>
  );
};

export default Home;
