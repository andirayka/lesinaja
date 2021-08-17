import React, { useEffect, useState } from "react";
import {
  Title,
  CardItem,
  CardNotification,
  CardTable,
  SkeletonLoading,
} from "@components";
import { getFirebaseDataOnce, updateFirebaseData } from "@utils";
// import { faHome } from "@fortawesome/free-solid-svg-icons";
import { IconFb, IconIg, IconYt, IconTeman, IconTiktok } from "@assets";

export const Home = () => {
  const [loading, setLoading] = useState(true);

  const [persentase, setPersentase] = useState({
    facebook: 0,
    instagram: 0,
    tiktok: 0,
    youtube: 0,
    teman: 0,
  });

  const [dataSosmed, setDataSosmed] = useState<any>({});

  const [dataNotif, setDataNotif] = useState({});

  const getDataFirebase = async () => {
    const getDataSosmed = await getFirebaseDataOnce(`referensi_bimbel`);
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

    const getDataNotif = await getFirebaseDataOnce(`notifikasi`);
    setDataNotif(getDataNotif);
    // let date = new Date().getTime();
    // console.log(date);
    setLoading(false);
  };

  const handleSubmitTrue = (key: string) => {
    updateFirebaseData({
      ref: `notifikasi/${key}`,
      payload: { sudah_dibaca: true },
    });
    getDataFirebase();
  };

  const handleSubmitFalse = (key: string) => {
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
    <div className="flex-grow">
      <Title
        title="Beranda"
        subtitle="Beranda / Administrator"
        type="pageTitle"
      />

      {/* Notifications */}
      {loading ? (
        <div className="w-full flex-grow shadow-lg">
          <CardItem title="Notifikasi Loading..." containerClass="mt-8">
            <SkeletonLoading fullWidthLineCount={6} />
          </CardItem>
        </div>
      ) : (
        <CardItem title="Notifikasi Terbaru" containerClass="mt-8 shadow-lg">
          {Object.entries<any>(dataNotif).map((item, index) => {
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
        </CardItem>
      )}

      {/* Social Media Effectivity */}
      {loading ? (
        <div className="w-full flex-grow shadow-lg">
          <CardItem title="Sosial Media Loading..." containerClass="mt-8">
            <SkeletonLoading fullWidthLineCount={6} />
          </CardItem>
        </div>
      ) : (
        <CardItem
          title="Efektivitas Sosial Media"
          containerClass="mt-8 shadow-lg"
        >
          <CardTable
            headerValues={["Sosial Media", "Efektivitas", "Keterangan"]}
            contentValues={[
              [
                IconFb,
                `Facebook`,
                `${persentase.facebook ? persentase.facebook : 0}%`,
                `${dataSosmed.facebook} wali murid tahu Lesin Aja dari Facebook`,
              ],
              [
                IconTiktok,
                `Tiktok`,
                `${persentase.tiktok ? persentase.tiktok : 0}%`,
                `${dataSosmed.tiktok} wali murid tahu Lesin Aja dari Tiktok`,
              ],
              [
                IconIg,
                `Instagram`,
                `${persentase.instagram ? persentase.instagram : 0}%`,
                `${dataSosmed.instagram} wali murid tahu Lesin Aja dari Instagram`,
              ],
              [
                IconYt,
                `YouTube`,
                `${persentase.youtube ? persentase.youtube : 0}%`,
                `${dataSosmed.youtube} wali murid tahu Lesin Aja dari YouTube`,
              ],
              [
                IconTeman,
                `Teman`,
                `${persentase.teman ? persentase.teman : 0}%`,
                `${dataSosmed.teman} wali murid tahu Lesin Aja dari Temannya`,
              ],
            ]}
          />
        </CardItem>
      )}
    </div>
  );
};
