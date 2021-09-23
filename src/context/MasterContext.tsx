import {
  addFirebaseData,
  updateFirebaseData,
  deleteFirebaseData,
  databaseRef,
  DBKEY,
  getFirebaseDataOnce,
} from "@utils";
import React, { FC, createContext, useReducer } from "react";

const initialState = {
  // data dan status list master
  listData: {},
  listStatus: "loading",

  // data dan status form master
  formData: undefined,
  formStatus: "loading",

  // ref tiap form master
  formName: "",

  // data dropdown
  dropdownData: "",
  multipleDropdownData: {},
};

// * Reducer
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "GET_LIST_DATA":
      return { ...state, listData: action.data };
    case "GET_FORM_DATA":
      return { ...state, formData: action.data };
    case "GET_DROPDOWN_DATA":
      return { ...state, dropdownData: action.data };
    case "GET_MULTIPLE_DROPDOWN_DATA":
      return { ...state, multipleDropdownData: action.data };
    case "SET_FORM_STATUS":
      return { ...state, formStatus: action.status };
    case "SET_LIST_STATUS":
      return { ...state, listStatus: action.status };
    case "SET_FORM_NAME":
      return { ...state, formName: action.name };

    default:
      return state;
  }
};

export const MasterContext = createContext<any>(initialState);
export const MasterProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // list data
  const getListData = async () => {
    const getData = async (ref: string) => {
      try {
        const value = await databaseRef(ref)
          .limitToFirst(3)
          .once("value", (snapshot: any) => snapshot);
        return value.val();
      } catch (message) {
        return console.error(message);
      }
    };

    const data = {
      jenjangkelas: await getData(DBKEY.masterJenjangKelas),
      mapel: await getData(DBKEY.masterMapel),
      paket: await getData(DBKEY.masterPaket),
      wilayah: await getData(DBKEY.masterWilayah),
    };

    setListStatus("viewing");
    dispatch({ type: "GET_LIST_DATA", data });
  };

  // form data
  const getFormData = async (ref: string) => {
    try {
      const value = await databaseRef(ref).once(
        "value",
        (snapshot) => snapshot
      );
      const data = value.val();
      setFormStatus("viewing");
      dispatch({ type: "GET_FORM_DATA", data });
    } catch (message) {
      console.error(message);
    }
  };

  // query dropdown
  const getDropdownData = async (ref: string) => {
    try {
      const value = await databaseRef(ref).once(
        "value",
        (snapshot) => snapshot
      );
      const data = value.val();
      dispatch({ type: "GET_DROPDOWN_DATA", data });
    } catch (message) {
      console.error(message);
    }
  };

  const getMultipleDropdownData = async () => {
    const getData = async (ref: string) => {
      try {
        const value = await databaseRef(ref).once(
          "value",
          (snapshot) => snapshot
        );
        return value.val();
      } catch (message) {
        return console.error(message);
      }
    };

    const data = {
      jenjangkelas: await getData(DBKEY.masterJenjangKelas),
      mapel: await getData(DBKEY.masterMapel),
      paket: await getData(DBKEY.masterPaket),
      wilayah: await getData(DBKEY.masterWilayah),
    };

    dispatch({ type: "GET_MULTIPLE_DROPDOWN_DATA", data });
  };

  const setFormStatus = (status: string) => {
    dispatch({ type: "SET_FORM_STATUS", status });
  };

  const setFormName = (name: string) => {
    dispatch({ type: "SET_FORM_NAME", name });
  };

  const setListStatus = (status: string) => {
    dispatch({ type: "SET_LIST_STATUS", status });
  };

  const saveFormData = async (data: any) => {
    if (state.formName == "master_paket") {
      const payload = {
        nama: data.nama,
        jumlah_pertemuan: data.jumlah_pertemuan,
      };

      if (data.id) {
        // Update
        await updateFirebaseData(`${state.formName}/${data.id}`, payload);
      } else {
        // Add new
        await addFirebaseData({ ref: `${state.formName}`, payload: payload });
      }
    } else if (state.formName == "master_wilayah") {
      const payload = {
        nama: data.nama,
        biaya_daftar: data.biaya_daftar,
        id_provinsi: data.id_provinsi,
      };

      if (data.id) {
        // Update
        await updateFirebaseData(`${state.formName}/${data.id}`, payload);

        const idProvinsi = data.id_provinsi;
        for (let i = 0; i < idProvinsi.length; i++) {
          const element = idProvinsi[i];
          await updateFirebaseData(`wilayah_provinsi/${element}`, {
            id_wilayah: data.id,
          });
        }
      } else {
        // Add new
        await addFirebaseData({ ref: `${state.formName}`, payload: payload });

        const getData = await databaseRef("master_wilayah")
          .orderByChild("nama")
          .equalTo(data.nama)
          .once("value", (snapshot) => snapshot);

        const idMasterWilayah = Object.keys(getData.val())[0];
        const idProvinsi = data.id_provinsi;
        for (let i = 0; i < idProvinsi.length; i++) {
          const element = idProvinsi[i];
          console.log(element);
          await updateFirebaseData(`wilayah_provinsi/${element}`, {
            id_wilayah: idMasterWilayah,
          });
        }
      }
    } else if (state.formName == "master_les") {
      const payload = {
        ...data,
        biaya: parseInt(data.biaya),
        gaji_tutor: parseInt(data.gaji_tutor),
      };

      if (data.id) {
        console.log("hi");
        // Update
        await updateFirebaseData(`${state.formName}/${data.id}`, payload);
      } else {
        // Add new
        await addFirebaseData({ ref: `${state.formName}`, payload: payload });
      }
    } else {
      const payload = { ...data };

      if (data.id) {
        // Update
        await updateFirebaseData(`${state.formName}/${data.id}`, payload);
      } else {
        // Add new
        await addFirebaseData({ ref: `${state.formName}`, payload: payload });
      }
    }
    refreshData();
  };

  const deleteFormData = async (dataId: string | number) => {
    await deleteFirebaseData(`${state.formName}/${dataId}`);
    refreshData();
  };

  const refreshData = async () => {
    // Refresh form dan list
    setFormStatus("refreshing");
    await getFormData(state.formName);
    setFormStatus("viewing");

    setListStatus("loading");
    await getListData();
    setListStatus("viewing");
  };

  return (
    <MasterContext.Provider
      value={{
        state,
        getFormData,
        getListData,
        setFormStatus,
        saveFormData,
        deleteFormData,
        setFormName,
        setListStatus,
        getDropdownData,
        getMultipleDropdownData,
      }}
    >
      {children}
    </MasterContext.Provider>
  );
};
