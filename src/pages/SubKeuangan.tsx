import { getFirebaseDataOnce } from "@utils";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import {
  Button,
  CardItem,
  EmptyIcon,
  InputText,
  SkeletonLoading,
  Title,
} from "@components";

export const SubKeuangan = () => {
  const { state: prevData } = useLocation<any>();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [filterNamaInput, setFilterNamaInput] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  let totalValue = 0;
  let totalNominal = 0;

  // mengambil data dari firebase
  const getDataFirebase = async () => {
    const getData = await getFirebaseDataOnce("pembayaran");

    const arrSiswa = await Promise.all(
      Object.values<any>(getData).map(async (value, index) => {
        const finalValue = {
          ...value,
          namaWaliMurid: await getFirebaseDataOnce(
            `user/${value.id_pengirim}/nama`
          ),

          namaMurid: await getFirebaseDataOnce(`siswa/${value.id_siswa}/nama`),
        };

        return finalValue;
      })
    );

    setData(arrSiswa);
    setLoading(false);
  };

  // merubah ke format rupiah
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
    getDataFirebase();
  }, []);

  if (loading) {
    return (
      <div className="flex-grow">
        <CardItem title="Loading..." containerClass="shadow-lg">
          <SkeletonLoading fullWidthLineCount={6} />
        </CardItem>
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex items-center mb-4">
          <InputText
            value={filterNamaInput}
            placeholder="Cari data berdasarkan nama..."
            containerClassName="mr-2 flex-grow shadow-md"
            onChange={(e) => setFilterNamaInput(e.target.value)}
          />
          <Button
            text="Cari"
            additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg py-[0.5em] shadow-lg"
            onClick={() => setFilter(filterNamaInput)}
          />
        </div>

        <div className="bg-white rounded-md p-4 shadow-lg">
          <div className="flex border-b-2 border-black text-lg font-bold">
            <div className="flex-grow">Tanggal</div>
            <div className="flex-grow">Nama Wali Murid</div>
            <div className="flex-grow">Nama Siswa</div>
            <div className="flex-grow text-right">Nominal</div>
          </div>

          {/* menampilkan data murid yang mendaftar */}
          {prevData.type == "daftar" && (
            <div>
              {data.map((item: any, index: number) => {
                const waktu = dayjs(item.waktu_transfer).format("MMMM YYYY");
                if (item.biaya_daftar && waktu == prevData.bulan) {
                  totalValue += 1;
                  totalNominal += item.biaya_daftar;
                  // hasil filter berdasarkan nama walmur dan nama murid
                  if (
                    item.namaWaliMurid == filter ||
                    (item.namaMurid == filter && filter != "")
                  ) {
                    return (
                      <div className="flex border-b-2 mt-3" key={index}>
                        <div className="flex-none w-1/5">
                          {dayjs(item.waktu_transfer).format("DD MMMM YYYY")}
                        </div>
                        <div className="flex-none w-1/4 ml-4">
                          {item.namaWaliMurid}
                        </div>
                        <div className="flex-none w-1/4 ml-12">
                          {item.namaMurid}
                        </div>
                        <div className="flex-grow text-right">
                          Rp {formatRupiah(item.biaya_daftar)}
                        </div>
                      </div>
                    );
                  }
                  // menampilkan data sebelum di filter
                  if (filter == "") {
                    return (
                      <div className="flex border-b-2 mt-3" key={index}>
                        <div className="flex-none w-1/5">
                          {dayjs(item.waktu_transfer).format("DD MMMM YYYY")}
                        </div>
                        <div className="flex-none w-1/4 ml-4">
                          {item.namaWaliMurid}
                        </div>
                        <div className="flex-none w-1/4 ml-12">
                          {item.namaMurid}
                        </div>
                        <div className="flex-grow text-right">
                          Rp {formatRupiah(item.biaya_daftar)}
                        </div>
                      </div>
                    );
                  }
                }
              })}
              <div className="mt-6 text-base font-semibold">
                Jumlah Siswa yang melakukan pendaftaran : {totalValue} Murid
              </div>
              <div className="text-base font-semibold">
                Total Nominal dalam satu bulan : Rp {formatRupiah(totalNominal)}
              </div>
            </div>
          )}

          {prevData.type == "les" && (
            <div>
              {data.map((item: any, index: number) => {
                const waktu = dayjs(item.waktu_transfer).format("MMMM YYYY");
                if (item.biaya_les && waktu == prevData.bulan) {
                  totalValue += 1;
                  totalNominal += item.biaya_les;
                  if (
                    item.namaWaliMurid == filter ||
                    (item.namaMurid == filter && filter != "")
                  ) {
                    return (
                      <div className="flex border-b-2 mt-3" key={index}>
                        <div className="flex-none w-1/5">
                          {dayjs(item.waktu_transfer).format("DD MMMM YYYY")}
                        </div>
                        <div className="flex-none w-1/4 ml-4">
                          {item.namaWaliMurid}
                        </div>
                        <div className="flex-none w-1/4 ml-12">
                          {item.namaMurid}
                        </div>
                        <div className="flex-grow text-right">
                          Rp {formatRupiah(item.biaya_les)}
                        </div>
                      </div>
                    );
                  }
                  if (filter == "") {
                    return (
                      <div className="flex border-b-2 mt-3" key={index}>
                        <div className="flex-none w-1/5">
                          {dayjs(item.waktu_transfer).format("DD MMMM YYYY")}
                        </div>
                        <div className="flex-none w-1/4 ml-4">
                          {item.namaWaliMurid}
                        </div>
                        <div className="flex-none w-1/4 ml-12">
                          {item.namaMurid}
                        </div>
                        <div className="flex-grow text-right">
                          Rp {formatRupiah(item.biaya_les)}
                        </div>
                      </div>
                    );
                  }
                }
              })}
              <div className="mt-6 text-base font-semibold">
                Jumlah Siswa yang melakukan pembayaran Les : {totalValue} Murid
              </div>
              <div className="text-base font-semibold">
                Total Nominal dalam satu bulan : Rp {formatRupiah(totalNominal)}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};
