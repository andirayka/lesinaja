import {
  addFirebaseData,
  deleteFirebaseData,
  updateFirebaseData,
  firebase,
  DBKEY,
} from "@utils";
import React, { createContext, useReducer } from "react";

// * initial Value
// Status:
// loading = load data awal
// viewing = melihat data
// refreshing = refresh data setelah interaksi dengan databsae
const initialState = {
  listData: {
    jenjangkelas: undefined,
    mapel: undefined,
    paket: undefined,
    wilayah: undefined,
  },
  listStatus: "loading",
  formData: null,
  formStatus: "loading",
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
const reducer = (state, action) => {
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

const ContextMaster = createContext(initialState);
const ProviderMaster = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Instance firebase database
  const rtDatabase = firebase.database();

  // Get 4 list master datas
  const getListData = async () => {
    const getData = async (ref) => {
      try {
        const value = await rtDatabase
          .ref(ref)
          .limitToFirst(3)
          .once("value", (snapshot) => snapshot);
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
  const getFormData = async (ref) => {
    try {
      const value = await rtDatabase
        .ref(ref)
        .once("value", (snapshot) => snapshot);
      const data = value.val();

      setFormStatus("viewing");
      dispatch({ type: "GET_FORM_DATA", data });
    } catch (message) {
      console.error(message);
    }
  };

  // query untuk dropdown
  const getDropdownData = async (ref) => {
    try {
      const value = await rtDatabase
        .ref(ref)
        .once("value", (snapshot) => snapshot);
      const data = value.val();

      dispatch({ type: "GET_DROPDOWN_DATA", data });
    } catch (message) {
      console.error(message);
    }
  };

  const getMultipleDropdownData = async () => {
    const getData = async (ref) => {
      try {
        const value = await rtDatabase
          .ref(ref)
          .once("value", (snapshot) => snapshot);
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

  const setFormStatus = (status) => {
    dispatch({ type: "SET_FORM_STATUS", status });
  };

  const setFormName = (name) => {
    dispatch({ type: "SET_FORM_NAME", name });
  };

  const setListStatus = (status) => {
    dispatch({ type: "SET_LIST_STATUS", status });
  };

  const saveFormData = async (data) => {
    // untuk master paket
    if (state.formName == "master_paket") {
      let fbParams = {
        payload: { nama: data.nama, jumlah_pertemuan: data.jumlah_pertemuan },
      };

      if (data.id) {
        // Update
        fbParams.ref = `${state.formName}/${data.id}`;
        await updateFirebaseData(fbParams);
      } else {
        // Add new
        fbParams.ref = `${state.formName}`;
        await addFirebaseData(fbParams);
      }

      // untuk master wilyah
    } else if (state.formName == "master_wilayah") {
      let fbParams = {
        payload: {
          nama: data.nama,
          biaya_daftar: data.biaya_daftar,
          provinsi: data.provinsi,
        },
      };

      if (data.id) {
        // Update
        fbParams.ref = `${state.formName}/${data.id}`;
        await updateFirebaseData(fbParams);
      } else {
        // Add new
        fbParams.ref = `${state.formName}`;
        await addFirebaseData(fbParams);
      }

      //untuk master les
    } else if (state.formName == "master_les") {
      let fbParams = {
        payload: {
          mapel: data.mapel,
          jenjangkelas: data.jenjangkelas,
          paket: data.paket,
          wilayah: data.wilayah,
          biaya: parseInt(data.biaya),
          gaji_tutor: parseInt(data.gaji_tutor),
        },
      };

      if (data.id) {
        // Update
        fbParams.ref = `${state.formName}/${data.id}`;
        await updateFirebaseData(fbParams);
      } else {
        // Add new
        fbParams.ref = `${state.formName}`;
        await addFirebaseData(fbParams);
      }

      // untuk master jenjangkelas dan mapel
    } else {
      let fbParams = {
        payload: { nama: data.nama },
      };

      if (data.id) {
        // Update
        fbParams.ref = `${state.formName}/${data.id}`;
        await updateFirebaseData(fbParams);
      } else {
        // Add new
        fbParams.ref = `${state.formName}`;
        await addFirebaseData(fbParams);
      }
    }
    refreshData();
  };

  const deleteFormData = async (dataId) => {
    let fbParams = { ref: `${state.formName}/${dataId}` };

    await deleteFirebaseData(fbParams);

    refreshData();
  };

  const refreshData = async () => {
    // Refresh form
    setFormStatus("refreshing");
    await getFormData(state.formName);
    setFormStatus("viewing");

    // list
    setListStatus("loading");
    await getListData();
    setListStatus("viewing");
  };

  return (
    <ContextMaster.Provider
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
    </ContextMaster.Provider>
  );
};

export { ContextMaster, ProviderMaster };
