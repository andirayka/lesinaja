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
import {
  addFirebaseData,
  databaseRef,
  getFirebaseDataOnce,
  updateFirebaseData,
} from "@utils";
import dayjs from "dayjs";
import { timeStamp } from "console";
import { parse } from "path/posix";
import Swal from "sweetalert2";
import { text } from "@fortawesome/fontawesome-svg-core";

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

            const idTutor = await getFirebaseDataOnce(
              `les_siswatutor/${value.id_lessiswatutor}/id_tutor`
            );

            const idSiswa = await getFirebaseDataOnce(
              `les_siswa/${value.idlessiswa}/id_siswa`
            );

            const idWalimurid = await getFirebaseDataOnce(
              `siswa/${idSiswa}/id_walimurid`
            );

            const finalValue = {
              ...value,
              namaPengirim: await getFirebaseDataOnce(
                `user/${value.id_pengirim}/nama`
              ),

              rolePengirim: pengirimIsAdmin ? "Admin" : "Wali Murid",

              rolePenerima: penerimaIsAdmin ? "Admin" : "Tutor",

              namaPenerima: penerimaIsAdmin
                ? await getFirebaseDataOnce(`user/${value.id_penerima}/nama`)
                : await getFirebaseDataOnce(`user/${idTutor}/nama`),

              namaSiswa: penerimaIsAdmin
                ? await getFirebaseDataOnce(`siswa/${value.id_siswa}/nama`)
                : await getFirebaseDataOnce(`siswa/${idSiswa}/nama`),

              namaWalimurid:
                !penerimaIsAdmin &&
                (await getFirebaseDataOnce(`user/${idWalimurid}/nama`)),
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

    updateFirebaseData(`siswa/${data.id_siswa}`, {
      status_bayar: true,
    });
    updateFirebaseData(`les_siswa/${data.id_lessiswa}`, {
      status_bayar: true,
    });
    updateFirebaseData(`pembayaran/${key}`, {
      sudah_dikonfirmasi: true,
    });

    const idTutor = await getFirebaseDataOnce(
      `les_siswa/${data.id_lessiswa}/id_tutor`
    );
    const waktuMulai = await getFirebaseDataOnce(
      `les_siswa/${data.id_lessiswa}/waktu_mulai`
    );
    const idLes = await getFirebaseDataOnce(
      `les_siswa/${data.id_lessiswa}/id_les`
    );
    const idPaket = await getFirebaseDataOnce(`master_les/${idLes}/paket`);
    const jumlahPertemuan = await getFirebaseDataOnce(
      `master_paket/${idPaket}/jumlah_pertemuan`
    );

    addFirebaseData({
      ref: `les_siswatutor`,
      payload: {
        id_lessiswa: data.id_lessiswa,
        id_tutor: idTutor,
        idlessiswa_idtutor: `${data.id_lessiswa}_${idTutor}`,
        jumlah_presensi: parseInt(jumlahPertemuan),
        waktu_mulai: waktuMulai,
      },
    });

    addDataFirebaseLesSiswaTutor(data.id_lessiswa);

    // console.log(data)
    // console.log(key, data);
    getData();
  };

  // Submit konfirmasi pembayaran les siswa
  const konfirmasiPembayaranLes = async (data: any, key: string) => {
    setIsKey(key);
    setIsLoadingButton(true);

    updateFirebaseData(`pembayaran/${key}`, {
      sudah_dikonfirmasi: true,
    });
    updateFirebaseData(`les_siswa/${data.id_lessiswa}`, {
      status_bayar: true,
    });

    const idTutor = await getFirebaseDataOnce(
      `les_siswa/${data.id_lessiswa}/id_tutor`
    );
    const waktuMulai = await getFirebaseDataOnce(
      `les_siswa/${data.id_lessiswa}/waktu_mulai`
    );
    const idLes = await getFirebaseDataOnce(
      `les_siswa/${data.id_lessiswa}/id_les`
    );
    const idPaket = await getFirebaseDataOnce(`master_les/${idLes}/paket`);
    const jumlahPertemuan = await getFirebaseDataOnce(
      `master_paket/${idPaket}/jumlah_pertemuan`
    );

    addFirebaseData({
      ref: `les_siswatutor`,
      payload: {
        id_lessiswa: data.id_lessiswa,
        id_tutor: idTutor,
        idlessiswa_idtutor: `${data.id_lessiswa}_${idTutor}`,
        jumlah_presensi: parseInt(jumlahPertemuan),
        waktu_mulai: waktuMulai,
      },
    });

    addDataFirebaseLesSiswaTutor(data.id_lessiswa);

    // console.log(`${data.id_lessiswa}_${idTutor}`);
    getData();
  };

  // membuat id les_siswatutor
  const addDataFirebaseLesSiswaTutor = async (idlessiswa: any) => {
    const siswaTutorQuery = await databaseRef("les_siswatutor")
      .orderByChild("id_lessiswa")
      .equalTo(idlessiswa)
      .once("value", (snapshot) => snapshot);

    addDataFirebasePresensi(
      Object.keys(siswaTutorQuery.val())[0],
      Object.values(siswaTutorQuery.val())[0]
    );
  };

  // membuat id les_presensi
  const addDataFirebasePresensi = async (key: string, value: any) => {
    const jumlahWaktu = Object.values(value.waktu_mulai);
    console.log(key);

    let arrayTimestamp: number[] = [];
    let arrayFormatJadi: string[] = [];
    let waktuLesTimestamp: number[] = [];
    let index = 0;
    let waktuLes: any;
    for (let j = 0; j < jumlahWaktu.length; j++) {
      for (
        let i = 0;
        i < parseInt(value.jumlah_presensi) / jumlahWaktu.length;
        i++
      ) {
        if (index < parseInt(value.jumlah_presensi)) {
          if (i == 0) {
            arrayTimestamp[index] = value.waktu_mulai[j];
            waktuLes = dayjs(arrayTimestamp[index]).format();
            waktuLesTimestamp[index] = value.waktu_mulai[j];
          } else {
            arrayTimestamp[index] = Date.parse(arrayFormatJadi[index - 1]);
            waktuLes = dayjs(arrayTimestamp[index]).add(1, "week").format();
            waktuLesTimestamp[index] = Date.parse(waktuLes);
          }
          arrayFormatJadi[index] = waktuLes;
          addFirebaseData({
            ref: `les_presensi/${key}`,
            payload: {
              sudah_laporan: false,
              waktu: waktuLesTimestamp[index],
            },
          });
          index += 1;
        }
      }
    }
  };

  const handleUnduhBukti = (link: any) => {
    window.open(link, "_blank");
  };

  // Submit konfirmasi tandai sudah bayar tutor
  const konfirmasiSudahMengirim = async (key: string) => {
    setIsKey(key);
    setIsLoadingButton(true);
    const timestamp = Date.now();

    Swal.fire({
      text: "Apakah anda yakin ingin menandai tutor ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FBBF24",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Tandai",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({ text: "Berhasil untuk di tandai.", icon: "success" });

        updateFirebaseData(`pembayaran/${key}`, {
          sudah_dikonfirmasi: true,
        });
        addFirebaseData({
          ref: `pembayaran/${key}/waktu_transfer`,
          payload: timestamp,
          isNoKey: true,
        });
        console.log(key, timestamp);
        getData();
      }
      getData();
    });
  };

  // Ambil kata2 keterangan untuk key keterangan di dalam CardItem
  const getTextKeterangan = (data: any) => {
    if (data.biaya_daftar && data.biaya_les) {
      return "Bayar Pendaftaran dan Bayar Les";
    }
    if (data.biaya_les) {
      return "Bayar Les Siswa";
    }
    if (!data.biaya_daftar && !data.biaya_les) {
      return "Bayar Gaji Tutor";
    }

    return "Tidak ada keterangan";
  };

  // Menjadikan format rupiah
  const formatRupiah = (value: number | undefined) => {
    var number_string = String(value);
    let sisa = number_string.length % 3;
    let rupiah = number_string.substr(0, sisa);
    let ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    return rupiah;
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
          // console.log(key, value);
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

              {value.namaWalimurid && (
                <CardKeyValue
                  keyName="Nama Wali Murid"
                  value={value.namaWalimurid}
                />
              )}

              <CardKeyValue keyName="Nama Siswa" value={value.namaSiswa} />
              {value.waktu_transfer && (
                <CardKeyValue
                  keyName="Waktu Pembayaran"
                  value={waktu_transfer}
                />
              )}

              {value.gaji_tutor && (
                <CardKeyValue
                  keyName="Biaya Gaji Tutor"
                  value={`Rp ${formatRupiah(value.gaji_tutor)}`}
                />
              )}
              {value.biaya_daftar && (
                <CardKeyValue
                  keyName="Biaya Pendaftaran Siswa"
                  value={`Rp ${formatRupiah(value.biaya_daftar)}`}
                />
              )}
              {value.biaya_les && (
                <CardKeyValue
                  keyName="Biaya Pendaftaran Les"
                  value={`Rp ${formatRupiah(value.biaya_les)}`}
                />
              )}

              {value.biaya_daftar && value.biaya_les && (
                <CardKeyValue
                  keyName="Total"
                  value={`Rp ${formatRupiah(
                    value.biaya_daftar + value.biaya_les
                  )}`}
                />
              )}

              <div className="flex flex-row mt-8">
                {["Wali Murid"].includes(value.rolePengirim) && (
                  <Button
                    text="Lihat Bukti Pembayaran"
                    additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                    onClick={() => handleUnduhBukti(value.bukti)}
                  />
                )}

                {!value.sudah_dikonfirmasi &&
                  value.biaya_daftar !== undefined &&
                  value.biaya_les !== undefined &&
                  ["Wali Murid"].includes(value.rolePengirim) && (
                    <Button
                      text="Konfirmasi Uang Sudah Masuk"
                      additionalClassName="bg-yellow-600 hover:bg-yellow-300 rounded-lg font-medium ml-auto"
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
                  value.biaya_les !== undefined &&
                  value.biaya_daftar === undefined &&
                  ["Wali Murid"].includes(value.rolePengirim) && (
                    <Button
                      key={key}
                      text="Konfirmasi Uang Sudah Masuk"
                      additionalClassName="bg-yellow-600 hover:bg-yellow-300 rounded-lg font-medium ml-auto"
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
                      additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium ml-auto"
                      onClick={() => konfirmasiSudahMengirim(key)}
                      loading={
                        isLoadingButton &&
                        key == isKey && (
                          <LoadIcon additionalClassName="text-2xl" />
                        )
                      }
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
