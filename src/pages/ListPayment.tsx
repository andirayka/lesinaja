import React, { useEffect, useState } from "react";
import {
  Title,
  CardItem,
  Button,
  CardKeyValue,
  InputSearch,
  Skeleton,
  EmptyIcon,
} from "@components";
import { getFirebaseDataOnce } from "@utils";
import dayjs from "dayjs";

const ListPayment = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  // Ambil data pembayaran
  useEffect(() => {
    const fbParams = {
      ref: `pembayaran`,
    };
    getFirebaseDataOnce(fbParams)
      .then((val) => {
        if (val) {
          setData(val);
        }
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  // Ambil data user
  const getUser = async (uid) => {};

  // Ambil kata2 keterangan untuk key keterangan di dalam CardItem
  const getTextKeterangan = (data) => {
    if (data.bayar_pendaftaran) {
      return "Biaya Pendaftaran";
    }
    if (data.bayar_lessiswa) {
      return "Biaya Les";
    }
    if (data.bayar_gajitutor) {
      return "Gaji Tutor";
    }

    return "Tidak ada keterangan";
  };

  if (loading) {
    return (
      <div className="flex-grow md:ml-8 md:mr-8">
        <Title
          title="Riwayat Pembayaran"
          text="Daftar / Riwayat Pembayaran"
          type="pageTitle"
        />
        <CardItem title="Loading..." containerClass="mt-8">
          <Skeleton mainCount={[1, 2, 3, 4, 5, 6]} />
        </CardItem>
      </div>
    );
  }

  if (data) {
    return (
      <div className="flex-grow md:ml-8 md:mr-8">
        <Title
          title="Riwayat Pembayaran"
          text="Daftar / Riwayat Pembayaran"
          type="pageTitle"
        />
        <CardItem title="Belum ada data pembayaran" containerClass="mt-8">
          <EmptyIcon />
        </CardItem>
      </div>
    );
  }

  return (
    <div className="w-full flex-grow md:ml-8">
      <Title text="Daftar Riwayat Pembayaran" type="pageTitle" />

      <InputSearch />

      {Object.entries(data).map(([key, value]) => {
        const waktu_transfer = dayjs(value.waktu_transfer).format(
          "D MMMM YYYY, HH:mm"
        );

        return (
          <CardItem
            key={key}
            title={`Wali Murid Sucipto ke Lesin Aja`}
            containerClass="mt-8"
          >
            <CardKeyValue
              keyName="Keterangan"
              value={getTextKeterangan(value)}
            />
            <CardKeyValue keyName="Waktu Pembayaran" value={waktu_transfer} />
            <CardKeyValue keyName="Nominal" value={`Rp ${value.nominal}`} />
            <div className="flex flex-row mt-8">
              <Button
                text="Unduh Bukti Pembayaran"
                additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                onClick={() => {}}
              />
              <Button
                text="Konfirmasi Uang Sudah Masuk"
                additionalClassName="bg-yellow-600 hover:bg-yellow-300 rounded-lg font-medium ml-5"
                onClick={() => {}}
              />
            </div>
          </CardItem>
        );
      })}
    </div>
  );
};

export default ListPayment;
