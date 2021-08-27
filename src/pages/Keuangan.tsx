import {
  Button,
  CardItem,
  Title,
  CardKeyValue,
  SectionFee,
  SkeletonLoading,
  InputNumber,
  InputText,
  InputDate,
  EmptyIcon,
  Swal,
  InputSelect,
} from "@components";
import React, { useEffect, useState } from "react";
import {
  getFirebaseDataOnce,
  addFirebaseData,
  deleteFirebaseData,
  updateFirebaseData,
  // exportToExcel,
} from "@utils";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

export const Keuangan = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState<any>({});

  const [loading, setLoading] = useState(true);

  const [loadFormPengeluaran, setLoadFormPengeluaran] = useState(false);

  const [loadFormSadaqah, setLoadFormSadaqah] = useState(false);

  const [isUpdate, setIsUpdate] = useState<string>();

  const [isId, setId] = useState();

  const [isPengeluaran, setIsPengeluaran] = useState<number>();

  const [isSadaqah, setIsSadaqah] = useState<number>();

  const [labaBersih, setLabaBersih] = useState<number>();

  const [isPemasukan, setIsPemasukan] = useState<any>();

  const [exportData, setExportData] = useState<any>([]);

  const [dataFilter, setDataFilter] = useState({});

  const filterBulanTahun = () => {
    const onSubmitFilter = (event: any) => {
      console.log(event);
      reset({ date: "", tahun: "" });
    };

    return (
      <div className="mb-8">
        <form onSubmit={handleSubmit(onSubmitFilter)}>
          <div className="flex mb-2">
            <div className="flex-grow">
              <InputDate
                placeholder="masukkan bulan"
                useHookRegister={register("date", {
                  required: "harus di isi",
                })}
              />
              <InputSelect
                data={""}
                heading="Filter berdasarkan wilayah"
                prompt="Pilih provinsi.."
                containerClassName="cursor-pointer p-2"
                itemClassName="w-full"
                useHookRegister={register("date", {
                  required: "harus di isi",
                })}
              />
            </div>
            <div className="flex-grow">
              <InputText
                name="tahun"
                placeholder="Masukkan tahun"
                useHookRegister={register("tahun", {
                  required: "harus di isi",
                })}
              />
            </div>
          </div>
          <Button
            text="Lihat"
            type="submit"
            additionalClassName="bg-yellow-400 hover:bg-white rounded-lg font-bold mr-2 shadow-lg w-full"
          />
        </form>
      </div>
    );
  };

  const getDataFirebase = async () => {
    const getData = await getFirebaseDataOnce(`keuangan`);
    const namaBulan = "perBulanNya"; //sementara
    const dataBulanTerpilih = getData[namaBulan];
    setData(dataBulanTerpilih);
    setLoading(false);

    // Totak Pemasukan dalam satu bulan
    const timestime = Date.now();
    const waktuSekarang = dayjs(timestime).format("MMMM YYYY");

    const getDataPembayaran = await getFirebaseDataOnce(`pembayaran`);
    let totalBiayaLes = 0;
    let totalBiayaDaftar = 0;
    const semuaNominal: any = Object.values(getDataPembayaran);
    for (let i = 0; i < semuaNominal.length; i++) {
      const element: any = semuaNominal[i];
      const waktu = dayjs(element.waktu_transfer).format("MMMM YYYY");
      if (element.waktu_transfer && waktu == waktuSekarang) {
        if (element.biaya_daftar) {
          totalBiayaDaftar += element.biaya_daftar;
        }
        if (element.biaya_les) {
          totalBiayaLes += element.biaya_les;
        }
      }
    }
    setIsPemasukan(totalBiayaLes + totalBiayaDaftar);
    addFirebaseData({
      ref: `keuangan/${namaBulan}/pemasukan`,
      payload: totalBiayaLes + totalBiayaDaftar,
      isNoKey: true,
    });

    handlePengeluaranaAndSadaqah(dataBulanTerpilih);
  };

  const handlePengeluaranaAndSadaqah = async (data: any) => {
    let totalPengeluaran = 0;
    if (data.pengeluaran) {
      const semuaNominal = Object.values(data.pengeluaran);
      for (let i = 0; i < semuaNominal.length; i++) {
        const element: any = semuaNominal[i];
        totalPengeluaran += element.nominal;
      }
    }
    setIsPengeluaran(totalPengeluaran);

    let totalSadaqah = 0;
    if (data.sadaqah) {
      const semuaNominal = Object.values(data.sadaqah);
      for (let i = 0; i < semuaNominal.length; i++) {
        const element: any = semuaNominal[i];
        totalSadaqah += element.nominal;
      }
    }
    setIsSadaqah(totalSadaqah);
  };

  const handleDeleteData = (id: any, type: string) => {
    const isDelete =
      type == "pengeluaran"
        ? data.pengeluaran[id].tanggal
        : data.sadaqah[id].tanggal;
    Swal.fire({
      text: `Apakah anda yakin ingin menghapus data transaksi pada tanggal ${isDelete}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FBBF24",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Hapus",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "Data berhasil di hapus",
          icon: "success",
        });
        if (type == "pengeluaran") {
          deleteFirebaseData(`keuangan/perBulanNya/pengeluaran/${id}`);
        } else {
          deleteFirebaseData(`keuangan/perBulanNya/sadaqah/${id}`);
        }
        getDataFirebase();
      }
    });
  };

  const handleUpdateData = (id: any, type: string) => {
    if (type == "pengeluaran") {
      setLoadFormPengeluaran(true);
      const oldData = data.pengeluaran[id];
      setValue("tanggal", oldData.tanggal);
      setValue("transaksi", oldData.transaksi);
      setValue("nominal", oldData.nominal);

      setId(id);
      setIsUpdate("pengeluaran");
    } else {
      setLoadFormSadaqah(true);
      const oldData = data.sadaqah[id];
      setValue("tanggal", oldData.tanggal);
      setValue("nominal", oldData.nominal);

      setId(id);
      setIsUpdate("sadaqah");
    }
  };

  const onSubmitPengeluaran = (event: any) => {
    // const oldData = data.pengeluaran[id];
    let nominalNew = parseInt(event.nominal);
    if (isUpdate == "pengeluaran") {
      updateFirebaseData(
        `keuangan/perBulanNya/pengeluaran/${isId}`, //sementara
        {
          tanggal: event.tanggal,
          transaksi: event.transaksi,
          nominal: nominalNew,
        }
      );
      setIsUpdate("");
    } else {
      addFirebaseData({
        ref: `keuangan/perBulanNya/pengeluaran`, //sementara
        payload: {
          tanggal: event.tanggal,
          transaksi: event.transaksi,
          nominal: nominalNew,
        },
      });
    }

    reset({ nominal: 0, tanggal: "", transaksi: "" });
    setLoadFormPengeluaran(false);
    // console.log(nominalNew);
    getDataFirebase();
  };

  const onSubmitSadaqah = (event: any) => {
    let nominalNew = parseInt(event.nominal);
    if (isUpdate == "sadaqah") {
      updateFirebaseData(
        `keuangan/perBulanNya/sadaqah/${isId}`, //sementara
        {
          tanggal: event.tanggal,
          nominal: nominalNew,
        }
      );
      setIsUpdate("");
    } else {
      addFirebaseData({
        ref: `keuangan/perBulanNya/sadaqah`, //sementara
        payload: {
          tanggal: event.tanggal,
          nominal: nominalNew,
        },
      });
    }

    reset({ nominal: 0, tanggal: "" });
    setLoadFormSadaqah(false);
    getDataFirebase();
  };

  const handleBatal = () => {
    setLoadFormPengeluaran(false);
    setLoadFormSadaqah(false);
    reset({ nominal: 0, tanggal: "", transaksi: "" });
  };

  useEffect(() => {
    getDataFirebase();
    let labaNew =
      isPemasukan - (data.pembayaran_tutor + isSadaqah + isPengeluaran);
    setLabaBersih(labaNew);
  }, [isPemasukan, isSadaqah, isPengeluaran]);

  if (loading) {
    return (
      <div className="flex-grow">
        <Title title="Loading..." type="pageTitle" />
        <CardItem title="Loading..." containerClass="mt-8 shadow-lg">
          <SkeletonLoading fullWidthLineCount={6} />
        </CardItem>
      </div>
    );
  } else {
    return (
      <div className="mb-8">
        {filterBulanTahun()}
        <Title title={`Keuangan Bulan ${Date.now()}`} type="pageTitle" />

        <CardItem title="Rangkuman" containerClass="mt-8 shadow-lg">
          <CardKeyValue
            keyName="Pemasukan Biaya Les"
            value={`Rp ${isPemasukan}`}
          />

          <CardKeyValue
            keyName="Pembayaran Tutor"
            value={`Rp ${data.pembayaran_tutor}`}
          />

          <CardKeyValue keyName="Laba Kotor" value={`Rp ${data.laba_kotor}`} />

          <CardKeyValue keyName="Sadaqah" value={`Rp ${isSadaqah}`} />

          <CardKeyValue keyName="Pengeluaran" value={`Rp ${isPengeluaran}`} />

          <SectionFee heading="Laba Bersih" value={`Rp. ${labaBersih}`} />
        </CardItem>

        {/* Button input pengeluaran dan export excel */}
        <div className="flex flex-row mt-8">
          <Button
            text="Input Pengeluaran"
            onClick={() => setLoadFormPengeluaran(true)}
            additionalClassName="bg-yellow-400 hover:bg-white rounded-lg font-medium mr-2 shadow-lg"
          />
          <Button
            text="Export Excel"
            onClick={() => {
              console.log(exportData);
              if (data) {
                setExportData([{ ...data.pengeluaran["nominal"] }]);
                // exportToExcel(exportData, "test");
              }
            }}
            additionalClassName="bg-yellow-400 hover:bg-white rounded-lg font-medium shadow-lg"
          />
        </div>

        {/* Data pengeluaran */}
        <div className="rounded-md bg-white mt-8 shadow-lg">
          {/* Header */}
          <div className="rounded-md p-2.5 bg-yellow-400 flex flex-row">
            <p className="font-semibold text-xl md:w-80 w-72">Tanggal</p>
            <p className="font-semibold text-xl w-5/12">Nama</p>
            <p className="font-semibold text-xl w-5/12 ">Nominal</p>
            <p className="font-semibold text-xl text-center w-1/4 ">Aksi</p>
          </div>

          {/* Form Imput */}
          {loadFormPengeluaran && (
            <form onSubmit={handleSubmit(onSubmitPengeluaran)}>
              <div className="p-3 flex">
                <div className="flex-grow text-left">
                  <InputDate
                    useHookRegister={register("tanggal", {
                      required: "Tanggal harus di isi",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.tanggal.message}</p>
                    // <FieldError message={errors.tanggal.message} />
                  )}
                </div>
                <div className="flex-grow text-left ">
                  <InputText
                    useHookRegister={register("transaksi", {
                      required: "Nama transaksi harus di isi",
                    })}
                  />
                  {errors.transaksi && (
                    <p className="text-red-500">{errors.transaksi.message}</p>
                    // <FieldError message={errors.transaksi.message} />
                  )}
                </div>
                <div className="flex-grow text-center">
                  <InputNumber
                    useHookRegister={register("nominal", {
                      required: "Besar nominal harus di isi",
                    })}
                  />
                  {errors.nominal && (
                    <p className="text-red-500">{errors.nominal.message}</p>
                    // <FieldError message={errors.nominal.message} />
                  )}
                </div>
                <div className="flex-grow flex py-3 justify-end">
                  <Button
                    text="Simpan"
                    type="submit"
                    additionalClassName="bg-green-500 hover:bg-green-700 rounded-lg"
                  />
                  <Button
                    text="Batal"
                    onClick={handleBatal}
                    additionalClassName="bg-red-500 hover:bg-red-700 rounded-lg md:ml-4"
                  />
                </div>
              </div>
            </form>
          )}

          {/* Isi */}
          {data.pengeluaran === undefined ? (
            <div className="py-8">
              <EmptyIcon />
            </div>
          ) : (
            Object.entries<any>(data.pengeluaran).map((item, index) => {
              const [key, value] = item;
              // console.log(data);

              return (
                <div key={index} className="p-3 flex">
                  <p className="text-lg md:w-1/4 w-2/6">{value.tanggal}</p>
                  <p className="text-lg md:w-1/3 w-1/3 ">{value.transaksi}</p>
                  <p className="text-lg md:w-5/12 w-1/3">Rp. {value.nominal}</p>
                  <div className="flex-grow flex justify-end">
                    <button
                      onClick={() => handleUpdateData(key, "pengeluaran")}
                    >
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        className="text-2xl"
                      />
                    </button>
                    <button
                      onClick={() => handleDeleteData(key, "pengeluaran")}
                      className="md:ml-8 ml-4 md:mr-8 mr-4"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} className="text-2xl" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Button input Sadaqah */}
        <div className="flex flex-row mt-8">
          <Button
            text="Input Sadaqah"
            onClick={() => setLoadFormSadaqah(true)}
            additionalClassName="bg-yellow-400 hover:bg-white rounded-lg font-medium mr-2 shadow-lg"
          />
        </div>

        {/* Data Sadaqah */}
        <div className="rounded-md bg-white mt-8 shadow-lg">
          {/* Header */}
          <div className="rounded-md p-2.5 bg-yellow-400 flex flex-row">
            <p className="font-semibold text-xl md:w-80 w-72">Tanggal</p>
            <p className="font-semibold text-xl w-5/12 ">Nominal</p>
            <p className="font-semibold text-xl text-center w-1/4 ">Aksi</p>
          </div>

          {/* Form Imput */}
          {loadFormSadaqah && (
            <form onSubmit={handleSubmit(onSubmitSadaqah)}>
              <div className="p-3 flex">
                <div className="flex-grow text-left">
                  <InputDate
                    useHookRegister={register("tanggal", {
                      required: "Tanggal harus di isi",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.tanggal.message}</p>
                  )}
                </div>
                <div className="flex-grow text-center">
                  <InputNumber
                    useHookRegister={register("nominal", {
                      required: "Besar nominal harus di isi",
                    })}
                  />
                  {errors.nominal && (
                    <p className="text-red-500">{errors.nominal.message}</p>
                  )}
                </div>
                <div className="flex-grow flex py-3 justify-end">
                  <Button
                    text="Simpan"
                    type="submit"
                    additionalClassName="bg-green-500 hover:bg-green-700 rounded-lg"
                  />
                  <Button
                    text="Batal"
                    onClick={handleBatal}
                    additionalClassName="bg-red-500 hover:bg-red-700 rounded-lg md:ml-4"
                  />
                </div>
              </div>
            </form>
          )}

          {/* Isi */}
          {data.sadaqah === undefined ? (
            <div className="py-8">
              <EmptyIcon />
            </div>
          ) : (
            Object.entries<any>(data.sadaqah).map((item, index) => {
              const [key, value] = item;
              // console.log(value.nominal);

              return (
                <div key={index} className="p-3 flex">
                  <p className="text-lg md:w-1/4 w-2/6">{value.tanggal}</p>
                  <p className="text-lg md:w-5/12 w-1/3">Rp. {value.nominal}</p>
                  <div className="flex-grow flex justify-end">
                    <button onClick={() => handleUpdateData(key, "sadaqah")}>
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        className="text-2xl"
                      />
                    </button>
                    <button
                      onClick={() => handleDeleteData(key, "sadaqah")}
                      className="md:ml-8 ml-4 md:mr-8 mr-4"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} className="text-2xl" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
};
