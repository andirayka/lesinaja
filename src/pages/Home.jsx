import React, { useEffect, useState } from "react";
import {
  Title,
  CardItem,
  Paginations,
  CardNotification,
  CardTable,
  Skeleton,
} from "@components";
import { getFirebaseDataOnce, updateFirebaseData } from "@utils";
// import { faHome } from "@fortawesome/free-solid-svg-icons";
import { IconFb, IconIg, IconYt, IconTeman, IconTiktok } from "@assets";

const Home = () => {
  const [loading, setLoading] = useState(true);

  const [persentase, setPersentase] = useState({
    facebook: 0,
    instagram: 0,
    tiktok: 0,
    youtube: 0,
    teman: 0,
  });

  const [dataSosmed, setDataSosmed] = useState({});

  const [dataNotif, setDataNotif] = useState({});

  const getDataFirebase = async () => {
    const getDataSosmed = await getFirebaseDataOnce({
      ref: `referensi_bimbel`,
    });
    setDataSosmed(getDataSosmed);

    let total =
      getDataSosmed.facebook +
      getDataSosmed.instagram +
      getDataSosmed.tiktok +
      getDataSosmed.youtube +
      getDataSosmed.teman;
    let persenFacebook = (getDataSosmed.facebook / total) * 100;
    let persenInstagram = (getDataSosmed.instagram / total) * 100;
    let persenTiktok = (getDataSosmed.tiktok / total) * 100;
    let persenYoutube = (getDataSosmed.youtube / total) * 100;
    let persenTeman = (getDataSosmed.teman / total) * 100;

    setPersentase({
      facebook: Math.round(persenFacebook),
      instagram: Math.round(persenInstagram),
      tiktok: Math.round(persenTiktok),
      youtube: Math.round(persenYoutube),
      teman: Math.round(persenTeman),
    });

    const getDataNotif = await getFirebaseDataOnce({ ref: `notifikasi` });
    setDataNotif(getDataNotif);
    // let date = new Date().getTime();
    // console.log(date);
    setLoading(false);
  };

  const handleSubmitTrue = (key) => {
    updateFirebaseData({
      ref: `notifikasi/${key}`,
      payload: { sudah_dibaca: true },
    });
    getDataFirebase();
  };

  const handleSubmitFalse = (key) => {
    updateFirebaseData({
      ref: `notifikasi/${key}`,
      payload: { sudah_dibaca: false },
    });
    getDataFirebase();
  };

  useEffect(() => {
    getDataFirebase();
  }, []);

  return (
    <div className="flex-grow md:ml-8 md:mr-8 md:mb-8">
      <Title title="Beranda" text="Beranda / Administrator" type="pageTitle" />

      {/* Notifications */}
      {loading ? (
        <div className="w-full flex-grow">
          <CardItem title="Notifikasi Loading..." containerClass="mt-8">
            <Skeleton mainCount={[1, 2, 3, 4, 5, 6]} />
          </CardItem>
        </div>
      ) : (
        <CardItem title="Notifikasi Terbaru" containerClass="mt-8">
          {Object.entries(dataNotif).map((item, index) => {
            const [key, value] = item;
            let timestamp = value.waktu_dibuat;
            let times = new Date(timestamp).toLocaleString("id");
            if (value.sudah_dibaca) {
              return (
                <CardNotification
                  key={index}
                  notification={value.pesan}
                  buttonText="Batalkan"
                  additionalClassName="bg-green-400 hover:bg-green-600"
                  isTime={times}
                  onClickButton={() => handleSubmitFalse(key)}
                />
              );
            } else {
              return (
                <CardNotification
                  key={index}
                  notification={value.pesan}
                  buttonText="Tandai Sudah Dibaca"
                  additionalClassName="bg-yellow-400 hover:bg-yellow-600"
                  isTime={times}
                  onClickButton={() => handleSubmitTrue(key)}
                />
              );
            }
          })}
          <Paginations />
        </CardItem>
      )}

      {/* Social Media Effectivity */}
      {loading ? (
        <div className="w-full flex-grow">
          <CardItem title="Sosial Media Loading..." containerClass="mt-8">
            <Skeleton mainCount={[1, 2, 3, 4, 5, 6]} />
          </CardItem>
        </div>
      ) : (
        <CardItem title="Efektivitas Sosial Media" containerClass="mt-8">
          <CardTable
            headerValues={["Sosial Media", "Efektivitas", "Keterangan"]}
            contentValues={[
              [
                IconFb,
                `Facebook`,
                `${persentase.facebook}%`,
                `${dataSosmed.facebook} wali murid tahu Lesin Aja dari Facebook`,
              ],
              [
                IconTiktok,
                `Tiktok`,
                `${persentase.tiktok}%`,
                `${dataSosmed.tiktok} wali murid tahu Lesin Aja dari Tiktok`,
              ],
              [
                IconIg,
                `Instagram`,
                `${persentase.instagram}%`,
                `${dataSosmed.instagram} wali murid tahu Lesin Aja dari Instagram`,
              ],
              [
                IconYt,
                `YouTube`,
                `${persentase.youtube}%`,
                `${dataSosmed.youtube} wali murid tahu Lesin Aja dari YouTube`,
              ],
              [
                IconTeman,
                `Teman`,
                `${persentase.teman}%`,
                `${dataSosmed.teman} wali murid tahu Lesin Aja dari Temannya`,
              ],
            ]}
          />
        </CardItem>
      )}
    </div>
  );
};

export default Home;
