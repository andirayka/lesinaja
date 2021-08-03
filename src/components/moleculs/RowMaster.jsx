import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ContextMaster } from "@context";
import { Swal, InputSelect } from "@components";

const RowMaster = ({
  item,
  isEditing,
  onClickEdit,
  onClickSave,
  onClickCancel,
  inputValue,
  setInputValue,
}) => {
  const {
    state: { formName, dropdownData },
    saveFormData,
    deleteFormData,
    getDropdownData,
  } = useContext(ContextMaster);

  useEffect(() => {
    getDropdownData("wilayah_provinsi");
  }, []);

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
                className="border-b-2 outline-none border-gray-300 w-4/5 focus:border-gray-600"
              />
              <input
                value={inputValue.jumlah_pertemuan}
                onChange={(e) => {
                  setInputValue({
                    ...inputValue,
                    jumlah_pertemuan: e.target.value,
                  });
                }}
                type="text"
                placeholder="jumlah pertemuan"
                className="border-b-2 outline-none border-gray-300 w-4/5 focus:border-gray-600"
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
                className="border-b-2 outline-none border-gray-300 w-4/5 focus:border-gray-600"
              />
              <input
                value={inputValue.biaya_daftar}
                onChange={(e) => {
                  setInputValue({
                    ...inputValue,
                    biaya_daftar: e.target.value,
                  });
                }}
                type="text"
                placeholder="biaya daftar"
                className="border-b-2 outline-none border-gray-300 w-4/5 focus:border-gray-600"
              />
              <InputSelect
                data={dropdownData}
                prompt="Pilih Provinsi..."
                value={inputValue.provinsi.nama}
                onChange={(val) => {
                  setInputValue({
                    ...inputValue,
                    provinsi: val,
                  });
                }}
              />
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

        <div className="w-1/4 flex flex-row justify-center">
          <div className="flex flex-1 justify-center">
            <button
              onClick={() => {
                // untuk button simpan master wilayah
                if (formName == "master_wilayah") {
                  // Jika data belum lengkap
                  if (
                    !inputValue.nama ||
                    !inputValue.biaya_daftar ||
                    !inputValue.provinsi
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
                        biaya_daftar: inputValue.biaya_daftar,
                        provinsi: inputValue.provinsi,
                      });
                    } else {
                      // Buat baru
                      saveFormData({
                        nama: inputValue.nama,
                        biaya_daftar: inputValue.biaya_daftar,
                        provinsi: inputValue.provinsi,
                      });
                    }
                    onClickSave();
                  }

                  // untuk button simpan master paket
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
                        jumlah_pertemuan: inputValue.jumlah_pertemuan,
                      });
                    } else {
                      // Buat baru
                      saveFormData({
                        nama: inputValue.nama,
                        jumlah_pertemuan: inputValue.jumlah_pertemuan,
                      });
                    }
                    onClickSave();
                  }
                  // untuk button simpan master jenjangkelas dan mapel
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
    <div className="flex flex-row py-4">
      {formName == "master_paket" ? (
        <div className="w-3/4 ml-2.5 text-lg">{`${item.nama} (${item.jumlah_pertemuan} pertemuan)`}</div>
      ) : (
        <div className="w-3/4 ml-2.5 text-lg">{item.nama}</div>
      )}
      <div className="w-1/4 flex flex-row">
        <div className="flex flex-1 justify-center">
          <button
            onClick={() => {
              if (formName == "master_paket") {
                onClickEdit({
                  nama: item.nama,
                  jumlah_pertemuan: item.jumlah_pertemuan,
                });
              } else if (formName == "master_wilayah") {
                onClickEdit({
                  nama: item.nama,
                  biaya_daftar: item.biaya_daftar,
                  provinsi: item.provinsi,
                });
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

export default RowMaster;
