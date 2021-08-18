import React, { FC, useEffect, useState } from "react";
import {
  Title,
  CardEmpty,
  CardItem,
  CardKeyValue,
  Button,
  PaginationButtons,
  LoadIcon,
} from "@components";
import { databaseRef, getFirebaseDataOnce, updateFirebaseData } from "@utils";
import dayjs from "dayjs";

export const ListPayment: FC = () => {
  const dataCountPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [data, setData] = useState<null | any[]>(null);
  const [allDataCount, setAllDataCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isKey, setIsKey] = useState<string>();

  // Ambil data dari database
  const getData = async () => {
    try {
      // Ambil total jumlah data
      const jumlahData = await getFirebaseDataOnce("jumlah_data/pembayaran");
      if (jumlahData) {
        setAllDataCount(jumlahData);
      }

      const dataPembayaran = await getFirebaseDataOnce("pembayaran");
      if (dataPembayaran) {
        // Membalik urutan data
        const reversedData = Object.entries<any>(dataPembayaran).reverse();
        const finalData = await Promise.all(
          reversedData.map(async ([key, value]) => {
            const pengirimIsAdmin = await getFirebaseDataOnce(
              `user/${value.id_pengirim}/roles/admin`
            );
            const penerimaIsAdmin = await getFirebaseDataOnce(
              `user/${value.id_penerima}/roles/admin`
            );

            const finalValue = {
              ...value,
              namaPengirim: await getFirebaseDataOnce(
                `user/${value.id_pengirim}/nama`
              ),
              rolePengirim: pengirimIsAdmin ? "Admin" : "Wali Murid",
              namaPenerima: await getFirebaseDataOnce(
                `user/${value.id_penerima}/nama`
              ),
              rolePenerima: penerimaIsAdmin ? "Admin" : "Tutor",
              namaSiswa: await getFirebaseDataOnce(
                `siswa/${value.id_siswa || value.bayar_pendaftaran}/nama`
              ),
            };

            return [key, finalValue];
          })
        );

        // console.log(finalData);
        setData(finalData);
      }

      setIsLoading(false);
      setIsLoadingButton(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Submit konfirmasi pembayaran daftar siswa baru
  const konfirmasiPembayaranDaftar = async (data: any, key: string) => {
    setIsKey(key);
    setIsLoadingButton(true);

    const getDataSiswa = await getFirebaseDataOnce(
      `siswa/${data.bayar_pendaftaran}`
    );
    updateFirebaseData(`siswa/${data.bayar_pendaftaran}`, {
      walimurid_status: `${getDataSiswa.walimurid_status}_daftar`,
    });
    updateFirebaseData(`pembayaran/${key}`, {
      sudah_dikonfirmasi: true,
    });

    console.log(key, data);
    getData();
  };

  // Submit konfirmasi pembayaran les siswa
  const konfirmasiPembayaranLes = async (data: any, key: string) => {
    setIsKey(key);
    setIsLoadingButton(true);

    updateFirebaseData(`pembayaran/${key}`, {
      sudah_dikonfirmasi: true,
    });

    const getDataLesSiswa = await getFirebaseDataOnce(
      `les_siswa/${data.bayar_lessiswa}/wilayah_status`
    );

    updateFirebaseData(`les_siswa/${data.bayar_lessiswa}`, {
      wilayah_status: `${getDataLesSiswa}_apply`,
    });

    console.log(getDataLesSiswa);
    getData();
  };

  // Ambil kata2 keterangan untuk key keterangan di dalam CardItem
  const getTextKeterangan = (data: any) => {
    if (data.bayar_pendaftaran) {
      return "Bayar Pendaftaran";
    }
    if (data.bayar_lessiswa) {
      return "Bayar Les Siswa";
    }
    if (data.bayar_gajitutor) {
      return "Bayar Gaji Tutor";
    }

    return "Tidak ada keterangan";
  };

  useEffect(() => {
    getData();

    return () => {
      databaseRef("jumlah_data/pembayaran").off();
    };
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
        {data.map(([key, value]) => {
          // console.log(value);
          const waktu_transfer = dayjs(value.waktu_transfer).format(
            "DD MMMM YYYY, HH:mm"
          );

          return (
            <CardItem
              key={key}
              title={`${value.rolePengirim} ${value.namaPengirim} kepada ${value.rolePenerima} ${value.namaPenerima}`}
              containerClass="mt-8 shadow-lg"
            >
              <CardKeyValue
                keyName="Keterangan"
                value={getTextKeterangan(value)}
              />
              {!value.bayar_gajitutor && (
                <CardKeyValue keyName="Nama Siswa" value={value.namaSiswa} />
              )}
              <CardKeyValue keyName="Waktu Pembayaran" value={waktu_transfer} />
              <CardKeyValue keyName="Nominal" value={`Rp ${value.nominal}`} />
              <div className="flex flex-row mt-8">
                {["Wali Murid"].includes(value.rolePengirim) && (
                  <Button
                    text="Unduh Bukti Pembayaran"
                    additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                    onClick={() => {}}
                  />
                )}

                {!value.sudah_dikonfirmasi &&
                  value.bayar_pendaftaran !== undefined &&
                  ["Wali Murid"].includes(value.rolePengirim) && (
                    <Button
                      text="Konfirmasi Uang Sudah Masuk"
                      additionalClassName="bg-yellow-600 hover:bg-yellow-300 rounded-lg font-medium ml-5"
                      onClick={() => konfirmasiPembayaranDaftar(value, key)}
                      loading={
                        isLoadingButton &&
                        key == isKey && (
                          <LoadIcon additionalClassName="text-2xl" />
                        )
                      }
                    />
                  )}

                {!value.sudah_dikonfirmasi &&
                  value.bayar_lessiswa !== undefined &&
                  ["Wali Murid"].includes(value.rolePengirim) && (
                    <Button
                      key={key}
                      text="Konfirmasi Uang Sudah Masuk"
                      additionalClassName="bg-yellow-600 hover:bg-yellow-300 rounded-lg font-medium ml-5"
                      onClick={() => konfirmasiPembayaranLes(value, key)}
                      loading={
                        isLoadingButton &&
                        key == isKey && (
                          <LoadIcon additionalClassName="text-2xl" />
                        )
                      }
                    />
                  )}

                {!value.sudah_dikonfirmasi &&
                  ["Admin"].includes(value.rolePengirim) && (
                    <Button
                      text="Tandai Sudah Mengirim Gaji"
                      additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                      onClick={() => {}}
                    />
                  )}
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

  return (
    <div>
      <Title
        title="Riwayat Pembayaran"
        subtitle="Daftar / Riwayat Pembayaran"
        type="pageTitle"
      />

      {renderContent()}
    </div>
  );
};
