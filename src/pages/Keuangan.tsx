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
  LoadIcon,
} from "@components";
import React, { useEffect, useState } from "react";
import {
  getFirebaseDataOnce,
  addFirebaseData,
  deleteFirebaseData,
  updateFirebaseData,
  databaseRef,
  handleExportExcel,
} from "@utils";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrashAlt,
  faWindowClose,
  faFunnelDollar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

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

  const [loadFormPenjualan, setLoadFormPenjualan] = useState(false);

  const [loadFormPengeluaran, setLoadFormPengeluaran] = useState(false);

  const [loadFormSadaqah, setLoadFormSadaqah] = useState(false);

  const [isUpdate, setIsUpdate] = useState<string>();

  const [isId, setId] = useState();

  const [isPengeluaran, setIsPengeluaran] = useState<number>();

  const [isPenjualan, setIsPenjualan] = useState<number>();

  const [isSadaqah, setIsSadaqah] = useState<number>();

  const [labaBersih, setLabaBersih] = useState<number>();

  const [isPemasukan, setIsPemasukan] = useState<any>();

  const [exportData, setExportData] = useState<any>([]);

  const [dataFilter, setDataFilter] = useState<any>();

  const [filterBulan, setFilterBulan] = useState<string>();

  const [onFilter, setOnFilter] = useState(false);

  const [filterValue, setFilterValue] = useState({
    bulan: "",
    tahun: "",
  });

  const [filterMultiBulan, setFilterMultiBulan] = useState({
    awal: "",
    akhir: "",
    tahun: "",
  });

  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // form filte dalam beberapa bulan
  const filterBeberapaBulan = () => {
    const handleOnChange = (event: any) => {
      let formChange: any = { ...filterMultiBulan };
      formChange[event.target.name] = event.target.value;
      setFilterMultiBulan(formChange);
    };

    const handleOnSubmit = async () => {
      if (
        filterMultiBulan.awal == "" ||
        filterMultiBulan.akhir == "" ||
        filterMultiBulan.tahun == ""
      ) {
        Swal.fire({
          text: "Data tidak boleh ada yang kosong!!!",
          icon: "warning",
        });
      } else {
        let totalValue = 0;
        for (
          let i = parseInt(filterMultiBulan.awal);
          i <= parseInt(filterMultiBulan.akhir);
          i++
        ) {
          const element = bulan[i];
          const getData = await getFirebaseDataOnce(
            `keuangan/${element}_${filterMultiBulan.tahun}`
          );
          totalValue +=
            getData && getData.laba_bersih ? getData.laba_bersih : 0;
        }

        Swal.fire({
          title: `Rp ${formatRupiah(totalValue)}`,
          text: `Total laba bersih dari bulan ${
            bulan[parseInt(filterMultiBulan.awal)]
          } sampai bulan ${bulan[parseInt(filterMultiBulan.akhir)]}`,
          icon: "info",
        });

        setFilterMultiBulan({
          awal: "",
          akhir: "",
          tahun: "",
        });
      }
    };

    return (
      <div className="mb-4">
        <div className="flex mb-4">
          <div className="flex-grow mt-4">
            <select
              name="awal"
              value={filterMultiBulan.awal}
              onChange={handleOnChange}
              className="shadow-md h-10 border-2 rounded-lg outline-none border-gray-200 px-1 py-1.5 w-full focus:border-gray-600 bg-white"
            >
              <option value="">Pilih bulan awal</option>
              {Object.entries(bulan).map((item, index) => {
                const [key, value] = item;
                return (
                  <option key={index} value={parseInt(key)}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex-grow mt-4">
            <select
              name="akhir"
              value={filterMultiBulan.akhir}
              onChange={handleOnChange}
              className="shadow-md h-10 border-2 rounded-lg outline-none border-gray-200 px-1 py-1.5 w-full focus:border-gray-600 bg-white"
            >
              <option value="">Pilih bulan akhir</option>
              {Object.entries(bulan).map((item, index) => {
                const [key, value] = item;
                return (
                  <option key={index} value={parseInt(key)}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex-grow">
            <InputNumber
              onChange={handleOnChange}
              name="tahun"
              value={filterMultiBulan.tahun != "" && filterMultiBulan.tahun}
              placeholder="Masukkan tahun"
              additionalClassName="shadow-md"
            />
          </div>
        </div>

        <Button
          text="Lihat Laba Bersih Dalam Beberapa Bulan"
          type="submit"
          onClick={handleOnSubmit}
          additionalClassName="bg-yellow-400 hover:bg-white rounded-lg font-bold mr-2 shadow-lg w-full"
        />
      </div>
    );
  };

  // mentotal semua laba bersih seluruhnya
  const totalLabaKeseluruhan = () => {
    const handleSubmit = async () => {
      const getData = await getFirebaseDataOnce(`keuangan`);

      const semuaNominal = Object.values(getData);
      let totalValue = 0;
      for (let i = 0; i < semuaNominal.length; i++) {
        const element: any = semuaNominal[i];
        totalValue += element.laba_bersih;
      }

      Swal.fire({
        title: `Rp ${formatRupiah(totalValue)}`,
        text: "Total laba bersih secara keseluruhan hingga saat ini",
        icon: "info",
      });
    };
    return (
      <div className="mb-8">
        <Button
          text="Lihat Laba Bersih Keseluruhan"
          type="submit"
          onClick={handleSubmit}
          additionalClassName="bg-yellow-400 hover:bg-white rounded-lg font-bold mr-2 shadow-lg w-full"
        />
      </div>
    );
  };

  // form filter dalam satu bulan
  const filterBulanTahun = () => {
    const handleOnChange = (event: any) => {
      let formChange: any = { ...filterValue };
      formChange[event.target.name] = event.target.value;
      setFilterValue(formChange);
    };

    const handleSubmitFilter = () => {
      if (filterValue.bulan == "" || filterValue.tahun == "") {
        Swal.fire({
          text: "Data tidak boleh ada yang kosong!!!",
          icon: "warning",
        });
      } else {
        setLoading(true);
        let idKeuangan = `${filterValue.bulan}_${filterValue.tahun}`;
        const onBulan = `${filterValue.bulan} ${filterValue.tahun}`;
        setFilterBulan(onBulan);
        setDataFilter(idKeuangan);

        addFirebaseData({
          ref: `keuangan/${idKeuangan}/view`, //sementara
          payload: true,
          isNoKey: true,
        });

        getDataFirebase(idKeuangan, onBulan);

        setFilterValue({
          bulan: "",
          tahun: "",
        });

        setOnFilter(false);
      }
    };

    return (
      <div className="mb-4">
        <div className="flex mb-2">
          <div className="flex-grow pt-4">
            <select
              name="bulan"
              onChange={handleOnChange}
              value={filterValue.bulan}
              className="shadow-md h-10 border-2 rounded-lg outline-none border-gray-200 px-1 py-1.5 w-full focus:border-gray-600 bg-white"
            >
              <option value="">Pilih Bulan</option>
              {bulan.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex-grow">
            <InputNumber
              onChange={handleOnChange}
              value={filterValue.tahun != "" && filterValue.tahun}
              name="tahun"
              placeholder="Masukkan tahun"
              additionalClassName="shadow-md"
            />
          </div>
        </div>
        <Button
          text="Lihat Detail Keuangan Dalam Satu Bulan"
          type="submit"
          onClick={handleSubmitFilter}
          additionalClassName="bg-yellow-400 hover:bg-white rounded-lg font-bold mr-2 shadow-lg w-full"
        />
      </div>
    );
  };

  const getDataFirebase = async (id: any, time: any) => {
    const getData = await getFirebaseDataOnce(`keuangan`);
    const namaBulan = id;
    const dataBulanTerpilih = getData[namaBulan];
    setData(dataBulanTerpilih);
    setLoading(false);

    // Total Pemasukan dalam satu bulan
    const getDataPembayaran = await getFirebaseDataOnce(`pembayaran`);
    let totalBiayaLes = 0;
    let totalBiayaDaftar = 0;
    const semuaNominal: any = Object.values(getDataPembayaran);
    for (let i = 0; i < semuaNominal.length; i++) {
      const element: any = semuaNominal[i];
      const waktu = dayjs(element.waktu_transfer).format("MMMM YYYY");
      if (element.waktu_transfer && waktu == time) {
        if (element.biaya_daftar) {
          totalBiayaDaftar += element.biaya_daftar;
        }
        if (element.biaya_les) {
          totalBiayaLes += element.biaya_les;
        }
      }
    }
    let pemasukan = totalBiayaLes + totalBiayaDaftar;

    setIsPemasukan(totalBiayaLes + totalBiayaDaftar);
    addFirebaseData({
      ref: `keuangan/${namaBulan}/pemasukan`,
      payload: totalBiayaLes + totalBiayaDaftar,
      isNoKey: true,
    });

    const pengeluaranAndSadaqah = await handlePengeluaranaAndSadaqah(
      dataBulanTerpilih
    );

    const penjualan = await handlePenjualan(dataBulanTerpilih);

    let pembayaran_tutor =
      dataBulanTerpilih && dataBulanTerpilih.pembayaran_tutor
        ? dataBulanTerpilih.pembayaran_tutor
        : 0;

    const getLabaBersih = await totalLabaBersih(
      pemasukan,
      penjualan,
      pembayaran_tutor,
      pengeluaranAndSadaqah
    );
    addFirebaseData({
      ref: `keuangan/${namaBulan}/laba_bersih`,
      payload: getLabaBersih,
      isNoKey: true,
    });
    setLabaBersih(getLabaBersih);
  };

  // Perhitungan laba bersih dalam satu bulan
  const totalLabaBersih = async (
    dataPemasukan: number,
    dataPenjualan: number,
    dataPembayaran: number,
    dataPengeluaranAndSadaqah: number
  ) => {
    let labaNew =
      dataPemasukan +
      dataPenjualan -
      (dataPembayaran + dataPengeluaranAndSadaqah);
    return labaNew;
  };

  // mengambil data pengeluaran dan sadaqah dalam firebase
  const handlePenjualan = async (data: any) => {
    let totalPenjualan = 0;
    if (data && data.penjualan) {
      const semuaNominal = Object.values(data.penjualan);
      for (let i = 0; i < semuaNominal.length; i++) {
        const element: any = semuaNominal[i];
        totalPenjualan += element.nominal;
      }
    }
    setIsPenjualan(totalPenjualan);

    return totalPenjualan;
  };

  // mengambil data pengeluaran dan sadaqah dalam firebase
  const handlePengeluaranaAndSadaqah = async (data: any) => {
    let totalPengeluaran = 0;
    if (data && data.pengeluaran) {
      const semuaNominal = Object.values(data.pengeluaran);
      for (let i = 0; i < semuaNominal.length; i++) {
        const element: any = semuaNominal[i];
        totalPengeluaran += element.nominal;
      }
    }
    setIsPengeluaran(totalPengeluaran);

    let totalSadaqah = 0;
    if (data && data.sadaqah) {
      const semuaNominal = Object.values(data.sadaqah);
      for (let i = 0; i < semuaNominal.length; i++) {
        const element: any = semuaNominal[i];
        totalSadaqah += element.nominal;
      }
    }
    setIsSadaqah(totalSadaqah);
    return totalPengeluaran + totalSadaqah;
  };

  // Menghapus data pengeluaran dan sadaqah
  const handleDeleteData = (id: any, type: string) => {
    const isDelete =
      (type == "pengeluaran" && data.pengeluaran[id].tanggal) ||
      (type == "sadaqah" && data.sadaqah[id].tanggal) ||
      (type == "penjualan" && data.penjualan[id].tanggal);

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
          deleteFirebaseData(`keuangan/${dataFilter}/pengeluaran/${id}`);
        } else if (type == "penjualan") {
          deleteFirebaseData(`keuangan/${dataFilter}/penjualan/${id}`);
        } else {
          deleteFirebaseData(`keuangan/${dataFilter}/sadaqah/${id}`);
        }
        getDataFirebase(dataFilter, filterBulan);
      }
    });
  };

  // Update data pengeluaran dan sadaqah
  const handleUpdateData = (id: any, type: string) => {
    if (type == "pengeluaran") {
      setLoadFormPengeluaran(true);
      const oldData = data.pengeluaran[id];
      setValue("tanggal", oldData.tanggal);
      setValue("transaksi", oldData.transaksi);
      setValue("nominal", oldData.nominal);

      setId(id);
      setIsUpdate("pengeluaran");
    } else if (type == "penjualan") {
      setLoadFormPenjualan(true);
      const oldData = data.penjualan[id];
      setValue("tanggal", oldData.tanggal);
      setValue("jumlah_item", oldData.jumlah);
      setValue("transaksi", oldData.transaksi);
      setValue("nominal", oldData.nominal);

      setId(id);
      setIsUpdate("penjualan");
    } else {
      setLoadFormSadaqah(true);
      const oldData = data.sadaqah[id];
      setValue("tanggal", oldData.tanggal);
      setValue("nominal", oldData.nominal);

      setId(id);
      setIsUpdate("sadaqah");
    }
  };

  // Submit form pengeluaran
  const onSubmitPengeluaran = (event: any) => {
    let nominalNew = parseInt(event.nominal);
    if (isUpdate == "pengeluaran") {
      updateFirebaseData(`keuangan/${dataFilter}/pengeluaran/${isId}`, {
        tanggal: event.tanggal,
        transaksi: event.transaksi,
        nominal: nominalNew,
      });
      setIsUpdate("");
    } else {
      addFirebaseData({
        ref: `keuangan/${dataFilter}/pengeluaran`,
        payload: {
          tanggal: event.tanggal,
          transaksi: event.transaksi,
          nominal: nominalNew,
        },
      });
    }

    reset({ nominal: "", tanggal: "", transaksi: "" });
    setLoadFormPengeluaran(false);
    getDataFirebase(dataFilter, filterBulan);
  };

  // Submit form pengeluaran
  const onSubmitPenjualan = (event: any) => {
    let nominalNew = parseInt(event.nominal);
    if (isUpdate == "penjualan") {
      updateFirebaseData(`keuangan/${dataFilter}/penjualan/${isId}`, {
        tanggal: event.tanggal,
        jumlah: event.jumlah_item,
        transaksi: event.transaksi,
        nominal: nominalNew,
      });
      setIsUpdate("");
    } else {
      addFirebaseData({
        ref: `keuangan/${dataFilter}/penjualan`,
        payload: {
          tanggal: event.tanggal,
          jumlah: event.jumlah_item,
          transaksi: event.transaksi,
          nominal: nominalNew,
        },
      });
    }

    reset({ nominal: "", tanggal: "", transaksi: "", jumlah_item: "" });
    setLoadFormPenjualan(false);
    getDataFirebase(dataFilter, filterBulan);
  };

  // Submit form sadaqah
  const onSubmitSadaqah = (event: any) => {
    let nominalNew = parseInt(event.nominal);
    if (isUpdate == "sadaqah") {
      updateFirebaseData(`keuangan/${dataFilter}/sadaqah/${isId}`, {
        tanggal: event.tanggal,
        nominal: nominalNew,
      });
      setIsUpdate("");
    } else {
      addFirebaseData({
        ref: `keuangan/${dataFilter}/sadaqah`,
        payload: {
          tanggal: event.tanggal,
          nominal: nominalNew,
        },
      });
    }

    reset({ nominal: "", tanggal: "" });
    setLoadFormSadaqah(false);
    getDataFirebase(dataFilter, filterBulan);
  };

  // Batal membuat dan update data
  const handleBatal = (type: string) => {
    if (type == "penjualan") {
      setLoadFormPenjualan(false);
    } else if (type == "pengeluaran") {
      setLoadFormPengeluaran(false);
    } else {
      setLoadFormSadaqah(false);
    }
    reset({ nominal: "", tanggal: "", transaksi: "", jumlah_item: "" });
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
    const timestamp = Date.now();
    const waktuSekarang = dayjs(timestamp).format("MMMM YYYY");
    const onId = `${dayjs(timestamp).format("MMMM")}_${dayjs(timestamp).format(
      "YYYY"
    )}`;

    setDataFilter(onId);
    setFilterBulan(waktuSekarang);
    getDataFirebase(onId, waktuSekarang);
  }, []);

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
      <div className="mb-8 relative">
        {onFilter && (
          <div className="absolute w-full bg-white p-4 rounded-lg shadow-2xl">
            <div className="flex">
              <FontAwesomeIcon
                icon={faWindowClose}
                onClick={() => setOnFilter(false)}
                className="text-4xl ml-auto cursor-pointer"
              />
            </div>
            {filterBulanTahun()}
            {filterBeberapaBulan()}
            {totalLabaKeseluruhan()}
          </div>
        )}

        <div className="lg:flex">
          <div className="font-bold text-4xl mt-auto mb-auto flex-grow">
            {`Keuangan Bulan ${
              filterBulan ? filterBulan : dayjs(Date.now()).format("MMMM YYYY")
            }`}
          </div>
          <div className="flex-grow flex lg:mt-0 mt-6">
            <div className="flex-grow-0 ml-auto">
              <Link
                to={{
                  pathname: "/sub-keuangan",
                  state: {
                    bulan: filterBulan,
                    type: "daftar",
                  },
                }}
              >
                <Button
                  text={`Laporan Murid`}
                  additionalClassName="ml-auto bg-yellow-400 hover:bg-white rounded-lg font-medium mr-2 shadow-lg"
                />
              </Link>
            </div>
            <div className="flex-grow-0">
              <Link
                to={{
                  pathname: "/sub-keuangan",
                  state: {
                    bulan: filterBulan,
                    type: "les",
                  },
                }}
              >
                <Button
                  text={`Laporan Les`}
                  additionalClassName="ml-auto bg-yellow-400 hover:bg-white rounded-lg font-medium mr-2 shadow-lg"
                />
              </Link>
            </div>

            <div className="flex-grow-0">
              <Button
                text={`Filter`}
                icon={
                  <FontAwesomeIcon
                    icon={faFunnelDollar}
                    onClick={() => setOnFilter(false)}
                    className="text-2xl ml-2 cursor-pointer"
                  />
                }
                onClick={() => setOnFilter(true)}
                additionalClassName="ml-auto bg-yellow-400 hover:bg-white rounded-lg font-medium mr-2 shadow-lg"
              />
            </div>
          </div>
        </div>

        <CardItem title="Rangkuman" containerClass="mt-8 shadow-lg">
          <CardKeyValue
            keyName="Pemasukan Biaya Les"
            value={`Rp ${formatRupiah(isPemasukan)}`}
          />

          <CardKeyValue
            keyName="Pembayaran Tutor"
            value={`Rp ${
              data && data.pembayaran_tutor
                ? formatRupiah(data.pembayaran_tutor)
                : 0
            }`}
          />

          <CardKeyValue
            keyName="Laba Kotor"
            value={`Rp ${
              data && data.laba_kotor ? formatRupiah(data.laba_kotor) : 0
            }`}
          />

          <CardKeyValue
            keyName="Penjualan"
            value={`Rp ${formatRupiah(isPenjualan)}`}
          />

          <CardKeyValue
            keyName="Sadaqah"
            value={`Rp ${formatRupiah(isSadaqah)}`}
          />

          <CardKeyValue
            keyName="Pengeluaran"
            value={`Rp ${formatRupiah(isPengeluaran)}`}
          />

          <SectionFee
            heading="Laba Bersih"
            value={`Rp ${formatRupiah(labaBersih)}`}
          />
        </CardItem>

        {/* Button input penjualan */}
        <div className="flex-row mt-8 relative">
          <Button
            text="Input Penjualan"
            onClick={() => setLoadFormPenjualan(true)}
            additionalClassName="bg-yellow-400 hover:bg-white rounded-lg font-medium mr-2 shadow-lg"
          />

          {/* Form Imput */}
          {loadFormPenjualan && (
            <form onSubmit={handleSubmit(onSubmitPenjualan)}>
              <div className="p-3 absolute bg-white rounded-lg w-full mt-4 shadow-2xl z-10">
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
                    placeholder="Masukkan Jumlah Item"
                    useHookRegister={register("jumlah_item", {
                      required: "Besar nominal harus di isi",
                    })}
                  />
                  {errors.nominal && (
                    <p className="text-red-500">{errors.nominal.message}</p>
                  )}
                </div>
                <div className="flex-grow text-left ">
                  <InputText
                    placeholder="Masukkan Nama Transaksi"
                    useHookRegister={register("transaksi", {
                      required: "Nama transaksi harus di isi",
                    })}
                  />
                  {errors.transaksi && (
                    <p className="text-red-500">{errors.transaksi.message}</p>
                  )}
                </div>
                <div className="flex-grow text-center">
                  <InputNumber
                    placeholder="Masukkan Nominal"
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
                    onClick={() => handleBatal("penjualan")}
                    additionalClassName="bg-red-500 hover:bg-red-700 rounded-lg lg:ml-4"
                  />
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Data penjualan */}
        <div className="rounded-md bg-white mt-4 shadow-lg">
          {/* Header */}
          <div className="rounded-md p-2.5 bg-yellow-400 flex">
            <p className="font-semibold text-xl lg:w-80 w-2/5">Tanggal</p>
            <p className="font-semibold text-xl w-5/12">Jumlah</p>
            <p className="font-semibold text-xl w-5/12">Nama</p>
            <p className="font-semibold text-xl w-5/12 ">Nominal</p>
            <p className="font-semibold text-xl text-center w-1/4 ">Aksi</p>
          </div>

          {/* Isi */}
          {data === undefined || data.penjualan === undefined ? (
            <div className="py-8">
              <EmptyIcon />
            </div>
          ) : (
            Object.entries<any>(data.penjualan)
              .reverse()
              .map((item, index) => {
                const [key, value] = item;

                return (
                  <div key={index} className="p-3 flex">
                    <p className="text-lg md:w-1/4 w-2/6">{value.tanggal}</p>
                    <p className="text-lg md:w-1/3 w-1/3 md:ml-4">
                      {value.jumlah} item
                    </p>
                    <p className="text-lg md:w-1/3 w-1/3 md:ml-4">
                      {value.transaksi}
                    </p>
                    <p className="text-lg md:w-5/12 w-1/3">
                      Rp. {formatRupiah(value.nominal)}
                    </p>
                    <div className="flex-grow flex justify-end">
                      <button
                        onClick={() => handleUpdateData(key, "penjualan")}
                      >
                        <FontAwesomeIcon
                          icon={faPencilAlt}
                          className="text-2xl"
                        />
                      </button>
                      <button
                        onClick={() => handleDeleteData(key, "penjualan")}
                        className="lg:ml-8 ml-4 lg:mr-8 mr-4"
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

        {/* Button input pengeluaran dan export excel */}
        <div className="flex-row mt-8 relative">
          <div className="flex">
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

          {/* Form Imput */}
          {loadFormPengeluaran && (
            <form onSubmit={handleSubmit(onSubmitPengeluaran)}>
              <div className="p-3 absolute bg-white rounded-lg shadow-2xl mt-4 w-full z-10">
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
                <div className="flex-grow text-left ">
                  <InputText
                    placeholder="Masukkan Nama Transaksi"
                    useHookRegister={register("transaksi", {
                      required: "Nama transaksi harus di isi",
                    })}
                  />
                  {errors.transaksi && (
                    <p className="text-red-500">{errors.transaksi.message}</p>
                  )}
                </div>
                <div className="flex-grow text-center">
                  <InputNumber
                    placeholder="Masukkan Nominal"
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
                    onClick={() => handleBatal("pengeluaran")}
                    additionalClassName="bg-red-500 hover:bg-red-700 rounded-lg lg:ml-4"
                  />
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Data pengeluaran */}
        <div className="rounded-md bg-white mt-4 shadow-lg">
          {/* Header */}
          <div className="rounded-md p-2.5 bg-yellow-400 flex">
            <p className="font-semibold text-xl lg:w-80 w-2/5">Tanggal</p>
            <p className="font-semibold text-xl w-5/12">Nama</p>
            <p className="font-semibold text-xl w-5/12 ">Nominal</p>
            <p className="font-semibold text-xl text-right w-1/4 lg:mr-12">
              Aksi
            </p>
          </div>

          {/* Isi */}
          {data === undefined || data.pengeluaran === undefined ? (
            <div className="py-8">
              <EmptyIcon />
            </div>
          ) : (
            Object.entries<any>(data.pengeluaran)
              .reverse()
              .map((item, index) => {
                const [key, value] = item;

                return (
                  <div key={index} className="p-3 flex">
                    <p className="text-lg md:w-1/4 w-2/6">{value.tanggal}</p>
                    <p className="text-lg md:w-1/3 w-1/3 ">{value.transaksi}</p>
                    <p className="text-lg md:w-5/12 w-1/3">
                      Rp. {formatRupiah(value.nominal)}
                    </p>
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
                        className="lg:ml-8 ml-4 lg:mr-8 mr-4"
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

        {/* Button input Sadaqah */}
        <div className="flex-row mt-8 relative">
          <Button
            text="Input Sadaqah"
            onClick={() => setLoadFormSadaqah(true)}
            additionalClassName="bg-yellow-400 hover:bg-white rounded-lg font-medium mr-2 shadow-lg"
          />

          {/* Form Imput */}
          {loadFormSadaqah && (
            <form onSubmit={handleSubmit(onSubmitSadaqah)}>
              <div className="p-3 absolute bg-white z-10 rounded-md shadow-2xl mt-4 w-full">
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
                    placeholder="Masukkan Nominal"
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
                    onClick={() => handleBatal("sadaqah")}
                    additionalClassName="bg-red-500 hover:bg-red-700 rounded-lg lg:ml-4"
                  />
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Data Sadaqah */}
        <div className="rounded-md bg-white mt-4 shadow-lg">
          {/* Header */}
          <div className="rounded-md p-2.5 bg-yellow-400 flex flex-row">
            <p className="font-semibold text-xl lg:w-80 w-1/3">Tanggal</p>
            <p className="font-semibold text-xl w-5/12 ">Nominal</p>
            <p className="font-semibold text-xl text-right w-1/5">Aksi</p>
          </div>

          {/* Isi */}
          {data === undefined || data.sadaqah === undefined ? (
            <div className="py-8">
              <EmptyIcon />
            </div>
          ) : (
            Object.entries<any>(data.sadaqah)
              .reverse()
              .map((item, index) => {
                const [key, value] = item;

                return (
                  <div key={index} className="p-3 flex">
                    <p className="text-lg lg:w-2/6 w-2/6">{value.tanggal}</p>
                    <p className="text-lg lg:w-5/12 w-1/3">
                      Rp. {formatRupiah(value.nominal)}
                    </p>
                    <div className="flex-grow flex justify-end">
                      <button onClick={() => handleUpdateData(key, "sadaqah")}>
                        <FontAwesomeIcon
                          icon={faPencilAlt}
                          className="text-2xl"
                        />
                      </button>
                      <button
                        onClick={() => handleDeleteData(key, "sadaqah")}
                        className="lg:ml-8 ml-4 lg:mr-8 mr-4"
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
  }
};
