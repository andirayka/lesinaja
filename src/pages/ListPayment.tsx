import React, { FC, useEffect, useState } from "react";
import {
  Title,
  CardEmpty,
  CardItem,
  CardKeyValue,
  Button,
  PaginationButtons,
} from "@components";
import { databaseRef } from "@utils";
import dayjs from "dayjs";

export const ListPayment: FC = () => {
  const dataCountPerPage = 2;
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState<null | object>(null);
  const [allDataCount, setAllDataCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ambil data dari database
    const getData = async () => {
      try {
        // Ambil total jumlah data
        await databaseRef("jumlah_data/pembayaran").once(
          "value",
          (snapshot) => {
            const value = snapshot.val();
            if (value) {
              setAllDataCount(value);
            }
          }
        );

        // Ambil list data
        await databaseRef("pembayaran")
          // .orderByKey()
          .startAt(currentPage)
          .limitToFirst(dataCountPerPage)
          .once("value", (snapshot) => {
            const value = snapshot.val();
            if (value) {
              // const reversedValue = Object.entries(value).reverse();
              // console.log(reversedValue);
              setData(value);
            }
          });

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getData();

    return () => {};
  }, [currentPage]);

  // Conditional content render
  const renderContent = () => {
    // Tampilan loading
    if (isLoading) {
      return <CardEmpty type="loading" />;
    }

    // Tampilan jika selesai loading dan tidak ada data
    if (!data) {
      return <CardEmpty type="noData" title="Belum ada data pembayaran" />;
    }

    // Tampilan jika selesai loading dan ada data
    return (
      <>
        {Object.entries(data).map(([key, value]) => {
          const waktu_transfer = dayjs(value.waktu_transfer).format(
            "D MMMM YYYY, HH:mm"
          );

          return (
            <CardItem
              key={key}
              title={`Wali Murid Sucipto ke Lesin Aja (Sementara)`}
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

        {allDataCount > dataCountPerPage && (
          <PaginationButtons
            onClick={(index) => {
              // Ganti page sesuai index page yang dipilih
              setCurrentPage(index + 1);
            }}
            dataCountPerPage={dataCountPerPage}
            dataCount={allDataCount}
          />
        )}
      </>
    );
  };

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

      {renderContent()}
    </div>
  );
};
