import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ContextMaster } from "@context";
import { Swal } from "@components";

const RowMaster = ({ item, isEditing }) => {
  const [inputValue, setInputValue] = useState({
    nama: "",
    jumlah_pertemuan: "",
  });

  const {
    state: { formName },
    saveFormData,
    deleteFormData,
    setFormStatus,
  } = useContext(ContextMaster);

  if (isEditing) {
    return (
      <div className="flex flex-row py-4">
        <div className="w-3/4 ml-2.5 text-lg">
          {formName == "master_paket" ? (
            <>
              <input
                autoFocus
                value={inputValue.nama}
                onChange={(e) => setInputValue({ nama: e.target.value })}
                type="text"
                placeholder="nama paket"
                className="border-b-2 outline-none border-gray-300 w-4/5 focus:border-gray-600"
              />
              <input
                value={inputValue.jumlah_pertemuan}
                onChange={(e) =>
                  setInputValue((prev) => ({
                    ...prev,
                    jumlah_pertemuan: e.target.value,
                  }))
                }
                type="text"
                placeholder="jumlah pertemuan"
                className="border-b-2 outline-none border-gray-300 w-4/5 focus:border-gray-600"
              />
            </>
          ) : (
            <input
              autoFocus
              value={inputValue.nama}
              onChange={(e) => setInputValue({ nama: e.target.value })}
              type="text"
              className="border-b-2 outline-none border-gray-300 w-4/5 focus:border-gray-600"
            />
          )}
        </div>
        <div className="w-1/4 flex flex-row justify-center">
          <div className="flex flex-1 justify-center">
            <button
              onClick={() => {
                if (!inputValue) {
                  Swal.fire({
                    icon: "error",
                    text: "data tidak boleh kosong",
                    confirmButtonColor: "#FBBF24",
                  });
                } else {
                  if (item) {
                    if (formName == "master_paket") {
                      saveFormData({
                        ...item,
                        nama: inputValue.nama,
                        jumlah_pertemuan: inputValue.jumlah_pertemuan,
                      });
                    }

                    saveFormData({ ...item, nama: inputValue.nama });
                    // setType("list");
                  } else {
                    saveFormData({ nama: inputValue.nama });
                    setFormStatus("viewing");
                  }
                  console.log(inputValue);
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
                if (item) {
                  // setType("list");
                } else {
                  setFormStatus("viewing");
                }
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
              // setType("editing");
              setInputValue(item.nama);
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
