import React, { FC, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { MasterContext } from "@context";
import { Swal, InputSelect, InputText, InputSelectSec } from "@components";
import { getFirebaseDataOnce } from "@utils";
import { useForm } from "react-hook-form";
import { parse } from "path/posix";
import { DropdownArrow } from "@assets";

type Props = {
  item?: any;
  isEditing: boolean;
  onClickEdit?: any;
  onClickSave: any;
  onClickCancel: any;
  inputValue: any;
  setInputValue: any;
};

export const RowMaster: FC<Props> = ({
  item,
  isEditing,
  onClickEdit,
  onClickSave,
  onClickCancel,
  inputValue,
  setInputValue,
}) => {
  const {
    state: { formName, dropdownData, formStatus },
    saveFormData,
    deleteFormData,
    getDropdownData,
  } = useContext(MasterContext);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [provinsi, setProvinsi] = useState<any>({});

  const [idProvinsi, setIdProvinsi] = useState<any>([]);

  const [onWilayah, setOnWilayah] = useState<Boolean>(false);

  const getdataProvinsi = async () => {
    const getData = await getFirebaseDataOnce("wilayah_provinsi");

    setProvinsi(getData);
  };

  const handleOnChange = (e: any) => {
    if (e.target.checked) {
      setIdProvinsi((prev: any) => [...prev, parseInt(e.target.value)]);
    } else {
      setIdProvinsi((prev: any[]) =>
        prev.filter((item) => item != e.target.value)
      );
    }
  };

  // data rowmaster
  const rowRender = () => {
    if (formName == "master_paket") {
      return (
        <div className="w-3/4 ml-2.5 text-lg">{`${item?.nama} (${item?.jumlah_pertemuan} pertemuan)`}</div>
      );
    }

    if (formName == "master_wilayah") {
      return (
        <>
          <div className="w-3/4 ml-2.5 text-lg">{item.nama}</div>
          <div className="w-3/4 ml-2.5 text-lg">{item.biaya_daftar}</div>
        </>
      );
    }
  };

  useEffect(() => {
    if (formName == "master_wilayah") {
      getdataProvinsi();
    }
  }, []);

  // tampilan form saat update data
  if (isEditing) {
    return (
      <div className="flex flex-row py-4">
        <div className="w-3/4 ml-2.5 text-lg">
          {/* untuk form master paket */}
          {formName == "master_paket" && (
            <>
              <input
                autoFocus
                value={inputValue.nama}
                onChange={(e) => {
                  setInputValue({
                    ...inputValue,
                    nama: e.target.value,
                  });
                }}
                type="text"
                placeholder="nama paket"
                className="border-b-2 outline-none border-gray-300 w-4/5 focus:border-gray-600 mb-2"
              />

              <input
                value={inputValue.jumlah_pertemuan}
                onChange={(e) => {
                  setInputValue({
                    ...inputValue,
                    jumlah_pertemuan: e.target.value,
                  });
                }}
                type="number"
                placeholder="jumlah pertemuan"
                className="border-b-2 outline-none border-gray-300 w-4/5 focus:border-gray-600 mb-2"
              />
            </>
          )}

          {/* untuk form master wilayah */}
          {formName == "master_wilayah" && (
            <>
              <input
                autoFocus
                value={inputValue.nama}
                onChange={(e) => {
                  setInputValue({
                    ...inputValue,
                    nama: e.target.value,
                  });
                }}
                type="text"
                placeholder="nama wilayah"
                className="border-b-2 outline-none border-gray-300 w-4/5 focus:border-gray-600 mb-2"
              />
              <input
                value={inputValue.biaya_daftar}
                onChange={(e) => {
                  setInputValue({
                    ...inputValue,
                    biaya_daftar: e.target.value,
                  });
                }}
                type="number"
                placeholder="biaya daftar"
                className="border-b-2 outline-none border-gray-300 w-4/5 focus:border-gray-600 mb-2"
              />
              <div className="relative">
                <button
                  className="border-b-2 w-4/5 text-left flex"
                  onClick={() => setOnWilayah(true)}
                >
                  <a>Pilih Wilayah</a>

                  <a className="mt-auto mb-auto ml-auto">
                    <DropdownArrow />
                  </a>
                </button>
                {inputValue.id_provinsi && (
                  <div className="border-b-2 w-4/5 text-left">
                    {inputValue.id_provinsi.map(
                      (keyValue: any, index: number) => {
                        return <p key={index}>- {provinsi[keyValue].nama}</p>;
                      }
                    )}
                  </div>
                )}
                {onWilayah && (
                  <div className="absolute w-4/5">
                    <div className="bg-gray-300 overflow-y-auto max-h-40 w-full">
                      {Object.entries(provinsi).map((data: any, index: any) => {
                        const [key, value] = data;
                        return (
                          <div className="w-full" key={index}>
                            <input
                              type="checkbox"
                              value={key}
                              onChange={(event) => {
                                handleOnChange(event);
                              }}
                              className="ml-4"
                            />
                            <a className="ml-2">{value.nama}</a>
                          </div>
                        );
                      })}
                    </div>
                    <div className="w-full flex bg-gray-300 p-2">
                      <button
                        className="px-4 py-1 bg-yellow-400 hover:bg-yellow-600 rounded-lg ml-auto mt-2"
                        onClick={() => {
                          setInputValue({
                            ...inputValue,
                            id_provinsi: idProvinsi,
                          });
                          setIdProvinsi([]);
                          setOnWilayah(false);
                        }}
                      >
                        Simpan
                      </button>
                      <button
                        className="px-4 py-1 bg-yellow-400 hover:bg-yellow-600 rounded-lg ml-2 mt-2"
                        onClick={() => {
                          setOnWilayah(false);
                        }}
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          {/* untuk form master jenjangkelas dan mapel */}
          {(formName == "master_jenjangkelas" ||
            formName == "master_mapel") && (
            <input
              autoFocus
              value={inputValue.nama}
              onChange={(e) => {
                setInputValue({ nama: e.target.value });
              }}
              type="text"
              className="border-b-2 outline-none border-gray-300 w-4/5 focus:border-gray-600"
            />
          )}
        </div>

        {/* button aksi */}
        <div className="w-1/4 flex flex-row justify-center">
          <div className="flex flex-1 justify-center">
            <button
              onClick={() => {
                // untuk button simpan dan update master wilayah
                if (formName == "master_wilayah") {
                  // Jika data belum lengkap
                  if (
                    !inputValue.nama ||
                    !inputValue.biaya_daftar ||
                    inputValue.id_provinsi.length <= 0
                  ) {
                    Swal.fire({
                      icon: "error",
                      text: "data tidak boleh kosong",
                      confirmButtonColor: "#FBBF24",
                    });
                  } else {
                    if (item) {
                      // Edit
                      saveFormData({
                        ...item,
                        nama: inputValue.nama,
                        biaya_daftar: parseInt(inputValue.biaya_daftar),
                        id_provinsi: inputValue.id_provinsi,
                      });
                    } else {
                      // Buat baru
                      saveFormData({
                        nama: inputValue.nama,
                        biaya_daftar: parseInt(inputValue.biaya_daftar),
                        id_provinsi: inputValue.id_provinsi,
                      });
                    }
                    onClickSave();
                  }

                  // untuk button simpan dan update master paket
                } else if (formName == "master_paket") {
                  // Jika data belum lengkap
                  if (!inputValue.nama || !inputValue.jumlah_pertemuan) {
                    Swal.fire({
                      icon: "error",
                      text: "data tidak boleh kosong",
                      confirmButtonColor: "#FBBF24",
                    });
                  } else {
                    if (item) {
                      // Edit
                      saveFormData({
                        ...item,
                        nama: inputValue.nama,
                        jumlah_pertemuan: parseInt(inputValue.jumlah_pertemuan),
                      });
                    } else {
                      // Buat baru
                      saveFormData({
                        nama: inputValue.nama,
                        jumlah_pertemuan: parseInt(inputValue.jumlah_pertemuan),
                      });
                    }
                    onClickSave();
                  }

                  // untuk button simpan dan update master jenjangkelas dan mapel
                } else {
                  // Jika data belum lengkap
                  if (!inputValue.nama) {
                    Swal.fire({
                      icon: "error",
                      text: "data tidak boleh kosong",
                      confirmButtonColor: "#FBBF24",
                    });
                  } else {
                    if (item) {
                      // Edit
                      saveFormData({ ...item, nama: inputValue.nama });
                    } else {
                      // Buat baru
                      saveFormData({ nama: inputValue.nama });
                    }
                    onClickSave();
                  }
                }
              }}
              className="self-center bg-green-500 rounded-lg w-20 py-1.5"
            >
              Simpan
            </button>
          </div>
          <div className="flex flex-1 justify-center">
            <button
              onClick={() => {
                onClickCancel();
              }}
              className="self-center bg-red-500 rounded-lg w-20 py-1.5"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row py-6">
      {formName == "master_jenjangkelas" || formName == "master_mapel" ? (
        <div className="w-3/4 ml-2.5 text-lg">{item.nama}</div>
      ) : (
        rowRender()
      )}

      <div className="w-1/4 flex flex-row">
        <div className="flex flex-1 justify-center">
          <button
            // button edit master paket
            onClick={() => {
              if (formName == "master_paket") {
                onClickEdit({
                  nama: item.nama,
                  jumlah_pertemuan: item.jumlah_pertemuan,
                });
                // button edit master wilayah
              } else if (formName == "master_wilayah") {
                onClickEdit({
                  nama: item.nama,
                  biaya_daftar: item.biaya_daftar,
                  id_provinsi: item.id_provinsi,
                });
                //button edit master jenjangkelas dan mapel
              } else {
                onClickEdit({
                  nama: item.nama,
                });
              }
            }}
          >
            <FontAwesomeIcon icon={faPencilAlt} className="text-2xl" />
          </button>
        </div>
        <div className="flex flex-1 justify-center">
          {/* button delete */}
          <button
            onClick={() => {
              Swal.fire({
                text: `Apakah Anda yakin akan menghapus ${item.nama}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#FBBF24",
                cancelButtonColor: "#d33",
                confirmButtonText: "Hapus",
                cancelButtonText: "Batal",
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteFormData(item.id);
                }
              });
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};
