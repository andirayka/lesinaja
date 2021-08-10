import React, { useEffect, useState } from "react";
import {
  Title,
  CardItem,
  Paginations,
  CardNotification,
  CardTable,
} from "@components";
import { getFirebaseDataOnce } from "@utils";

const Home = () => {
  const [persentase, setPersentase] = useState({
    facebook: 0,
    instagram: 0,
    tiktok: 0,
    youtube: 0,
    teman: 0,
  });

  const [data, setData] = useState({});

  const getDataFirebase = async () => {
    const getData = await getFirebaseDataOnce({ ref: `referensi_bimbel` });
    console.log(getData);

    setData(getData);

    let total = getData.facebook + getData.instagram;
    let persenFacebook = (getData.facebook / total) * 100;
    let persenInstagram = (getData.instagram / total) * 100;
    let persenTiktok = (getData.tiktok / total) * 100;
    let persenYoutube = (getData.youtube / total) * 100;
    let persenTeman = (getData.teman / total) * 100;

    setPersentase({
      facebook: Math.round(persenFacebook),
      instagram: Math.round(persenInstagram),
      tiktok: Math.round(persenTiktok),
      youtube: Math.round(persenYoutube),
      teman: Math.round(persenTeman),
    });
  };

  useEffect(() => {
    getDataFirebase();
  }, []);

  return (
    <div className="w-full flex-grow md:ml-8">
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
            [
              "Facebook",
              `${persentase.facebook}%`,
              `${data.facebook} wali murid tahu Lesin Aja dari Facebook`,
            ],
            [
              "Tiktok",
              `${persentase.tiktok}%`,
              `${data.tiktok} wali murid tahu Lesin Aja dari Tiktok`,
            ],
            [
              "Instagram",
              `${persentase.instagram}%`,
              `${data.instagram} wali murid tahu Lesin Aja dari Instagram`,
            ],
            [
              "YouTube",
              `${persentase.youtube}%`,
              `${data.youtube} wali murid tahu Lesin Aja dari YouTube`,
            ],
            [
              "Teman",
              `${persentase.teman}%`,
              `${data.teman} wali murid tahu Lesin Aja dari Temannya`,
            ],
          ]}
        />
      </CardItem>
    </div>
  );
};

export default Home;
