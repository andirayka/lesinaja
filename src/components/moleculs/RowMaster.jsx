import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ContextMaster } from "@context";
import { Swal } from "@components";

const RowMaster = ({ item, type: defaultType }) => {
  const [inputValue, setInputValue] = useState("");
  const [type, setType] = useState(defaultType);

  const {
    state: { formName },
    saveFormData,
    deleteFormData,
    setFormStatus,
  } = useContext(ContextMaster);

  if (type == "editing") {
    return (
      <div className="flex flex-row py-4">
        <div className="w-3/4 ml-2.5 text-lg">
          <input
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            className="border-b-2 outline-none border-gray-300 w-4/5 focus:border-gray-600"
          />
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
                    saveFormData({ ...item, nama: inputValue });
                    setType("list");
                  } else {
                    saveFormData({ nama: inputValue });
                    setFormStatus("viewing");
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
                if (item) {
                  setType("list");
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

  if (type == "list") {
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
                setType("editing");
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
                  text: "Konfirmasi",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#FBBF24",
                  cancelButtonColor: "#d33",
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
  }
};

export default RowMaster;
