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
  EmptyIcon,
  Swal,
} from "@components";
import React, { useEffect, useState } from "react";
import {
  getFirebaseDataOnce,
  addFirebaseData,
  deleteFirebaseData,
  updateFirebaseData,
  exportToExcel,
} from "@utils";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export const Keuangan = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState({});

  const [loading, setLoading] = useState(true);

  const [loadForm, setLoadForm] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false);

  const [isId, setId] = useState();

  const [isPengeluaran, setIsPengeluaran] = useState();

  const [labaBersih, setLabaBersih] = useState();

  const [exportData, setExportData] = useState([]);

  const getDataFirebase = async () => {
    const getData = await getFirebaseDataOnce({
      ref: `keuangan`,
    });
    const namaBulan = "perBulanNya"; //sementara
    const dataBulanTerpilih = getData[namaBulan];
    setData(dataBulanTerpilih);
    setLoading(false);
    handlePengeluaran(dataBulanTerpilih);
  };

  const handlePengeluaran = (data) => {
    let totalPengeluaran = 0;
    if (data.pengeluaran) {
      const semuaNominal = Object.values(data.pengeluaran);
      for (let i = 0; i < semuaNominal.length; i++) {
        const element = semuaNominal[i];
        totalPengeluaran += element.nominal;
      }
    }

    let labaNew =
      data.pemasukan -
      (data.pembayaran_tutor + data.sadaqah + totalPengeluaran);

    setIsPengeluaran(totalPengeluaran);
    setLabaBersih(labaNew);
  };

  const handleDeleteData = (id) => {
    const isDelete = data.pengeluaran[id].tanggal;
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
        deleteFirebaseData({ ref: `keuangan/perBulanNya/pengeluaran/${id}` });
        getDataFirebase();
      }
    });
  };

  const handleUpdateData = (id) => {
    setLoadForm(true);
    const oldData = data.pengeluaran[id];
    setValue("tanggal", oldData.tanggal);
    setValue("transaksi", oldData.transaksi);
    setValue("nominal", oldData.nominal);

    setId(id);
    setIsUpdate(true);
  };

  const onSubmit = (event) => {
    // const oldData = data.pengeluaran[id];
    let nominalNew = parseInt(event.nominal);
    if (isUpdate) {
      updateFirebaseData({
        ref: `keuangan/perBulanNya/pengeluaran/${isId}`, //sementara
        payload: {
          tanggal: event.tanggal,
          transaksi: event.transaksi,
          nominal: nominalNew,
        },
      });
      setIsUpdate(false);
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
    setLoadForm(false);
    // console.log(nominalNew);
    getDataFirebase();
  };

  const handleBatal = () => {
    setLoadForm(false);
    reset({ nominal: 0, tanggal: "", transaksi: "" });
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

            <CardKeyValue keyName="Pengeluaran" value={`Rp ${isPengeluaran}`} />

            <SectionFee heading="Laba Bersih" value={`Rp. ${labaBersih}`} />
          </CardItem>

          <div className="flex flex-row mt-8">
            <Button
              text="Input Pengeluaran"
              onClick={() => setLoadForm(true)}
              additionalClassName="bg-yellow-400 hover:bg-white rounded-lg font-medium mr-2"
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
              additionalClassName="bg-yellow-400 hover:bg-white rounded-lg font-medium"
            />
          </div>

          {/* Data pengeluaran */}
          <div className="rounded-md bg-white mt-8">
            {/* Header */}
            <div className="rounded-md p-2.5 bg-yellow-400 flex flex-row">
              <p className="font-semibold text-xl w-96 ">Tanggal</p>
              <p className="font-semibold text-xl w-5/12 ">Nama</p>
              <p className="font-semibold text-xl w-5/12 ">Nominal</p>
              <p className="font-semibold text-xl text-center w-1/4 ">Aksi</p>
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
                    {errors.transaksi && (
                      <FieldError message={errors.transaksi.message} />
                    )}
                  </div>
                  <div className="flex-grow text-center">
                    <InputNumber
                      useHookRegister={register("nominal", {
                        required: "Besar nominal harus di isi",
                      })}
                    />
                    {errors.nominal && (
                      <FieldError message={errors.nominal.message} />
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
                      additionalClassName="bg-red-500 hover:bg-red-700 rounded-lg ml-4"
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
              Object.entries(data.pengeluaran).map((item, index) => {
                const [key, value] = item;
                // console.log(value.nominal);

                return (
                  <div key={index} className="p-3 flex">
                    <p className="text-lg w-5/12 ">{value.tanggal}</p>
                    <p className="text-lg w-5/12 ">{value.transaksi}</p>
                    <p className="text-lg w-5/12 ">Rp. {value.nominal}</p>
                    <div className="flex-grow flex justify-end">
                      <button onClick={() => handleUpdateData(key)}>
                        <FontAwesomeIcon
                          icon={faPencilAlt}
                          className="text-2xl"
                        />
                      </button>
                      <button
                        onClick={() => handleDeleteData(key)}
                        className="ml-8 mr-4"
                      >
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="text-2xl"
                        />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        );
        <Paginations />
      </div>
    );
  }
};
