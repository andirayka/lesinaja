import React, { FC, useEffect, useState } from "react";
import { Title, CardEmpty, CardItem, CardKeyValue, Button } from "@components";
import { firebase } from "@utils";
import dayjs from "dayjs";

export const ListPayment: FC = () => {
  const [data, setData] = useState<null | object>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ambil data dari database
  useEffect(() => {
    firebase
      .database()
      .ref("pembayaran")
      .once("value", (snapshot) => {
        const value = snapshot.val();
        if (value) {
          setData(value);
        }
      })
      .then(() => setIsLoading(false))
      .catch(console.error);
    return () => {};
  }, []);

  // Ambil kata2 keterangan untuk key keterangan di dalam CardItem
  const getTextKeterangan = (data: any) => {
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

  return (
    <div>
      <Title text="Daftar Riwayat Pembayaran" type="pageTitle" />

      {/* Tampilan loading */}
      {isLoading && <CardEmpty type="loading" />}

      {/* Tampilan jika selesai loading dan tidak ada data */}
      {!isLoading && !data && (
        <CardEmpty type="noData" title="Belum ada data pembayaran" />
      )}

      {/* Tampilan jika selesai loading dan ada data */}
      {!isLoading &&
        data &&
        Object.entries(data).map(([key, value]) => {
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
