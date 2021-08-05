import {
  Button,
  CardItem,
  Title,
  CardKeyValue,
  Paginations,
  SectionFee,
  Skeleton,
  InputNumber,
  InputText,
  InputDate,
} from "@components";
import React, { useEffect, useState } from "react";
import { getFirebaseDataOnce } from "@utils";

const Keuangan = () => {
  const [data, setData] = useState({});

  const [pengeluaran, setPengeluaran] = useState({});

  const [getKey, setGetKey] = useState();
  const [loading, setLoading] = useState(true);

  const getDataFirebase = async () => {
    const getData = await getFirebaseDataOnce({ ref: `keuangan` });
    console.log({ getData });
    const namaBulan = "perBulanNya"; //sementara
    const dataBulanTerpilih = getData[namaBulan];
    console.log(dataBulanTerpilih);
    setData(dataBulanTerpilih);
    // setLoading(false);
  };

  // const getPengeluaran = async () => {
  //   const getDataPengeluaran = await getFirebaseDataOnce({
  //     ref: `keuangan/${getKey}/pengeluaran`,
  //   });
  //   setPengeluaran(getDataPengeluaran);
  //   console.log(getKey);
  // };

  useEffect(() => {
    getDataFirebase();
    // getPengeluaran();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex-grow md:ml-8">
        <Title text="Loading..." type="pageTitle" />
        <CardItem title="Loading..." containerClass="mt-8">
          <Skeleton mainCount={[1, 2, 3, 4, 5, 6]} />
        </CardItem>
      </div>
    );
  } else {
    return (
      <div className="w-full flex-grow md:ml-8">
        {Object.entries(data.keuangan).map((item, index) => {
          const [key, value] = item;

          // console.log(key);
          // setGetKey(key);
          console.log(key);
          let labaBersih =
            value.pemasukan -
            (value.pembayaran_tutor +
              value.laba_kotor +
              value.sadaqah +
              value.pengeluaran);

          return (
            <div key={index} className="mb-8">
              <Title text={`Keuangan Bulan ${value.bulan}`} type="pageTitle" />

              <CardItem title="Rangkuman" containerClass="mt-8">
                <CardKeyValue
                  keyName="Pemasukan Biaya Les"
                  value={`Rp ${value.pemasukan}`}
                />

                <CardKeyValue
                  keyName="Pembayaran Tutor"
                  value={`Rp ${value.pembayaran_tutor}`}
                />

                <CardKeyValue
                  keyName="Laba Kotor"
                  value={`Rp ${value.laba_kotor}`}
                />

                <CardKeyValue keyName="Sadaqah" value={`Rp ${value.sadaqah}`} />

                <CardKeyValue
                  keyName="Pengeluaran"
                  value={`Rp ${value.pengeluaran}`}
                />

                <SectionFee heading="Laba Bersih" value={labaBersih} />
              </CardItem>

              <div className="mt-8">
                <Button
                  text="Input Pengeluaran"
                  additionalClassName="bg-yellow-400 hover:bg-white rounded-lg font-medium"
                />
              </div>

              <div className="rounded-md bg-white mt-8">
                {/* Header */}
                <div className="rounded-md p-2.5 bg-yellow-400 flex flex-row">
                  <p className="font-semibold text-xl w-3/4">Tanggal</p>
                  <p className="font-semibold text-xl w-3/4">Nama</p>
                  <p className="font-semibold text-xl w-3/4">Nominal</p>
                  <p className="font-semibold text-xl text-center w-1/4">
                    Aksi
                  </p>
                </div>

                {/* Isi */}
                {}
                <div className="p-3 flex">
                  <div className="flex-grow text-left">12-12.1212</div>
                  <div className="flex-grow text-left ">Prin Buku</div>
                  <div className="flex-grow text-center">{value.sadaqah}</div>
                  <div className="flex-grow text-right">Edit / Hapus</div>
                </div>

                {/* Form Imput */}
                <div className="p-3 flex">
                  <div className="flex-grow text-left">
                    <InputDate />
                  </div>
                  <div className="flex-grow text-left ">
                    <InputText />
                  </div>
                  <div className="flex-grow text-center">
                    <InputNumber />
                  </div>
                  <div className="flex-grow flex py-3 justify-end">
                    <Button
                      text="Simpan"
                      type="submit"
                      additionalClassName="bg-green-400 rounded-lg"
                    />
                    <Button
                      text="Batal"
                      type="submit"
                      additionalClassName="bg-red-500 rounded-lg ml-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <Paginations />
      </div>
    );
  }
};

export default Keuangan;
