import {
  addFirebaseData,
  updateFirebaseData,
  deleteFirebaseData,
  databaseRef,
  DBKEY,
} from "@utils";
import React, { FC, createContext, useReducer } from "react";

// * initial Value
// Status:
// loading = load data awal
// viewing = melihat data
// refreshing = refresh data setelah interaksi dengan databsae
const initialState = {
  // data dan status list master
  listData: {
    jenjangkelas: undefined,
    mapel: undefined,
    paket: undefined,
    wilayah: undefined,
  },
  listStatus: "loading",

  // data dan status form master
  formData: undefined,
  formStatus: "loading",

  // ref tiap form master
  formName: "",

  dropdownData: "",
  multipleDropdownData: {
    jenjangkelas: undefined,
    mapel: undefined,
    paket: undefined,
    wilayah: undefined,
  },
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

  // Get 4 list data master
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

  // Dipanggil ketika pertama kali buka form
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

  // query untuk dropdown
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
    // untuk master paket
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

      // untuk master wilyah
    } else if (state.formName == "master_wilayah") {
      const payload = {
        nama: data.nama,
        biaya_daftar: data.biaya_daftar,
        id_provinsi: data.id_provinsi,
      };

      if (data.id) {
        // Update
        await updateFirebaseData(`${state.formName}/${data.id}`, payload);
      } else {
        // Add new
        await addFirebaseData({ ref: `${state.formName}`, payload: payload });
      }

      //untuk master les
    } else if (state.formName == "master_les") {
      const payload = {
        mapel: data.mapel,
        jenjangkelas: data.jenjangkelas,
        paket: data.paket,
        wilayah: data.wilayah,
        biaya: data.biaya,
        gaji_tutor: data.gaji_tutor,
      };

      if (data.id) {
        // Update
        await updateFirebaseData(`${state.formName}/${data.id}`, payload);
      } else {
        // Add new
        await addFirebaseData({ ref: `${state.formName}`, payload: payload });
      }

      // untuk master jenjangkelas dan mapel
    } else {
      const payload = { nama: data.nama };

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
    // Refresh form
    setFormStatus("refreshing");
    await getFormData(state.formName);
    setFormStatus("viewing");

    // Refresh list setelah refresh form
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
