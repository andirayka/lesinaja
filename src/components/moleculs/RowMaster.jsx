import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ContextMaster } from "@context";
import { Swal, InputSelect } from "@components";
import { getFirebaseDataOnce } from "@utils";

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
    state: { formName, dropdownData, formStatus },
    saveFormData,
    deleteFormData,
    getDropdownData,
  } = useContext(ContextMaster);

  //untuk tampilan prompt input select
  // promptkey - menampung key dari dropdown data
  // promptValue - menampung hasil query dari ref promptKey
  const [promptKey, setPromptKey] = useState([]);
  const [promptValue, setPromptValue] = useState([]);
  const [rowQuery, setRowQuery] = useState({
    status: "loading",
    data: [],
  });

  // query data prompt dropdown master wilyah
  const getProvinsiPromptData = async () => {
    // query data prompt saat input select dalam keadaan updating
    if (inputValue.id_provinsi.length > 0) {
      const query = await Promise.all(
        inputValue.id_provinsi.map(async (child) => {
          const queryData = await getFirebaseDataOnce({
            ref: `wilayah_provinsi/${child}/nama`,
          });

          return { value: queryData, key: child };
        })
      );

      setPromptValue(query);
    }
  };

  // query wilayah provinsi pada row master wilayah
  const getProvinsiRowData = async () => {
    if (item && item.id_provinsi) {
      const query = await Promise.all(
        item.id_provinsi.map(async (child) => {
          const queryData = await getFirebaseDataOnce({
            ref: `wilayah_provinsi/${child}/nama`,
          });

          return queryData;
        })
      );
      setRowQuery({
        ...rowQuery,
        data: query,
      });
    }
  };

  // data rowmaster
  const conditionalRowRender = () => {
    if (formName == "master_paket") {
      return (
        <div className="w-3/4 ml-2.5 text-lg">{`${item.nama} (${item.jumlah_pertemuan} pertemuan)`}</div>
      );
    }

    if (formName == "master_wilayah") {
      return (
        <>
          <div className="w-3/4 ml-2.5 text-lg">{item.nama}</div>
          <div className="w-3/4 ml-2.5 text-lg">{item.biaya_daftar}</div>
          <div className="w-3/4 ml-2.5 text-lg">
            {rowQuery.status == "loading" && rowQuery.data.length <= 0 ? (
              <div>Memuat...</div>
            ) : (
              rowQuery.data.length > 0 &&
              rowQuery.data.map((item, index) => {
                return (
                  <p key={index} className="bg-gray-300 rounded-md m-1 p-1">
                    {item}
                  </p>
                );
              })
            )}
          </div>
        </>
      );
    }
  };

  // data prompt input select
  const conditionalPromptRender = () => {
    // tampilan prompt saat updating
    if (inputValue.id_provinsi.length !== 0 && promptValue.length !== 0) {
      return Object.values(promptValue).map((item, index) => {
        return (
          <div
            key={index}
            className="inline-block bg-gray-300 rounded-md m-1 p-1"
            onClick={() => {
              setInputValue({
                ...inputValue,
                id_provinsi: inputValue.id_provinsi.filter(
                  (i) => i !== item.key
                ),
              });
            }}
          >
            {`${item.value} `}
            &#10006;
          </div>
        );
      });

      // tampilan prompt saat adding
    } else if (promptKey.length !== 0 && promptValue.length !== 0) {
      return Object.values(promptValue).map((item, index) => {
        return (
          <div
            key={index}
            className="inline-block bg-gray-300 rounded-md m-1 p-1"
            onClick={() => {
              setPromptKey(promptKey.filter((i) => i !== item.key));
            }}
          >
            {`${item.value} `}
            &#10006;
          </div>
        );
      });

      // tampilan prompt saat tidak ada data yang dipilih
    } else {
      return <div>Pilih Provinsi</div>;
    }
  };

  useEffect(() => {
    // hanya dieksekusi di rowmaster wilayah
    if (formName == "master_wilayah") {
      getDropdownData("wilayah_provinsi");
      getProvinsiPromptData();
      getProvinsiRowData();

      if (rowQuery.data.length > 0) {
        setRowQuery({
          ...rowQuery,
          status: "loaded",
        });
      }

      if (formStatus == "refreshing") {
        setRowQuery({
          ...rowQuery,
          status: "loading",
        });
      }
    }
  }, [inputValue.id_provinsi, promptKey, formStatus, rowQuery.status]);

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
                    jumlah_pertemuan: parseInt(e.target.value),
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
                    biaya_daftar: parseInt(e.target.value),
                  });
                }}
                type="number"
                placeholder="biaya daftar"
                className="border-b-2 outline-none border-gray-300 w-4/5 focus:border-gray-600 mb-2"
              />
              <InputSelect
                data={dropdownData}
                value={inputValue.id_provinsi}
                prompt={conditionalPromptRender()}
                onChange={({ key }) => {
                  // if (inputValue.id_provinsi.length !== 0) {
                  setInputValue({
                    ...inputValue,
                    id_provinsi: [...inputValue.id_provinsi, parseInt(key)],
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
                        biaya_daftar: inputValue.biaya_daftar,
                        id_provinsi: inputValue.id_provinsi,
                      });
                    } else {
                      // Buat baru
                      saveFormData({
                        nama: inputValue.nama,
                        biaya_daftar: inputValue.biaya_daftar,
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
    <div className="flex flex-row py-4">
      {formName == "master_jenjangkelas" || formName == "master_mapel" ? (
        <div className="w-3/4 ml-2.5 text-lg">{item.nama}</div>
      ) : (
        conditionalRowRender()
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

export default RowMaster;
