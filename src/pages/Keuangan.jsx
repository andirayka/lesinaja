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
  FieldError,
} from "@components";
import React, { useEffect, useState } from "react";
import { getFirebaseDataOnce, addFirebaseData } from "@utils";
import { useForm } from "react-hook-form";

const Keuangan = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState({});

  const [loading, setLoading] = useState(true);

  const [loadForm, setLoadForm] = useState(false);

  let labaBersih = data.pemasukan - (data.pembayaran_tutor + data.sadaqah);

  const getDataFirebase = async () => {
    const getData = await getFirebaseDataOnce({ ref: `keuangan` });
    const namaBulan = "perBulanNya"; //sementara
    const dataBulanTerpilih = getData[namaBulan];
    setData(dataBulanTerpilih);
    // console.log(dataBulanTerpilih);
    setLoading(false);
  };

  const onSubmit = (data) => {
    console.log(data.nominal);
    addFirebaseData({
      ref: `keuangan/perBulanNya/pengeluaran`,
      payload: {
        tanggal: data.tanggal,
        transaksi: data.transaksi,
        nominal: data.nominal,
      },
    });
    getDataFirebase();
  };

  useEffect(() => {
    getDataFirebase();
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
        <div className="mb-8">
          <Title text={`Keuangan Bulan ${data.bulan}`} type="pageTitle" />

          <CardItem title="Rangkuman" containerClass="mt-8">
            <CardKeyValue
              keyName="Pemasukan Biaya Les"
              value={`Rp ${data.pemasukan}`}
            />

            <CardKeyValue
              keyName="Pembayaran Tutor"
              value={`Rp ${data.pembayaran_tutor}`}
            />

            <CardKeyValue
              keyName="Laba Kotor"
              value={`Rp ${data.laba_kotor}`}
            />

            <CardKeyValue keyName="Sadaqah" value={`Rp ${data.sadaqah}`} />

            <CardKeyValue keyName="Pengeluaran" value={`Rp Pengembangan`} />

            <SectionFee heading="Laba Bersih" value={`Rp. ${labaBersih}`} />
          </CardItem>

          <div className="mt-8">
            <Button
              text="Input Pengeluaran"
              onClick={() => setLoadForm(true)}
              additionalClassName="bg-yellow-400 hover:bg-white rounded-lg font-medium"
            />
          </div>

          {/* Data pengeluaran */}
          <div className="rounded-md bg-white mt-8">
            {/* Header */}
            <div className="rounded-md p-2.5 bg-yellow-400 flex flex-row">
              <p className="font-semibold text-xl w-3/4">Tanggal</p>
              <p className="font-semibold text-xl w-3/4">Nama</p>
              <p className="font-semibold text-xl w-3/4">Nominal</p>
              <p className="font-semibold text-xl text-center w-1/4">Aksi</p>
            </div>
            {/* Form Imput */}
            {loadForm && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-3 flex">
                  <div className="flex-grow text-left">
                    <InputDate
                      useHookRegister={register("tanggal", {
                        required: "Tanggal harus di isi",
                      })}
                    />
                    {errors.name && (
                      <FieldError message={errors.tanggal.message} />
                    )}
                  </div>
                  <div className="flex-grow text-left ">
                    <InputText
                      useHookRegister={register("transaksi", {
                        required: "Nama transaksi harus di isi",
                      })}
                    />
                    {errors.name && (
                      <FieldError message={errors.transaksi.message} />
                    )}
                  </div>
                  <div className="flex-grow text-center">
                    <InputNumber
                      useHookRegister={register("nominal", {
                        required: "Besar nominal harus di isi",
                      })}
                    />
                    {errors.name && (
                      <FieldError message={errors.nominal.message} />
                    )}
                  </div>
                  <div className="flex-grow flex py-3 justify-end">
                    <Button
                      text="Simpan"
                      type="submit"
                      additionalClassName="bg-green-400 rounded-lg"
                    />
                    <Button
                      text="Batal"
                      onClick={() => setLoadForm(false)}
                      additionalClassName="bg-red-500 rounded-lg ml-4"
                    />
                  </div>
                </div>
              </form>
            )}

            {/* Isi */}
            {Object.entries(data.pengeluaran).map((item, index) => {
              const [key, value] = item;
              console.log(key);
              // value.nominal += value.nominal;
              console.log(value.nominal);

              return (
                <div key={index} className="p-3 flex">
                  <div className="flex-none w-3/12 text-left">
                    {value.tanggal}
                  </div>
                  <div className="flex-none w-3/12 text-left">
                    {value.transaksi}
                  </div>
                  <div className="flex-grow text-center">
                    Rp. {value.nominal}
                  </div>
                  <div className="flex-grow text-right">Edit / Hapus</div>
                </div>
              );
            })}
          </div>
        </div>
        );
        <Paginations />
      </div>
    );
  }
};

export default Keuangan;
