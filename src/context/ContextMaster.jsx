import {
  addFirebaseData,
  deleteFirebaseData,
  getFirebaseDataOnce,
  updateFirebaseData,
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
};

// * Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "GET_LIST_DATA":
      return { ...state, listData: action.data };
    case "GET_FORM_DATA":
      return { ...state, formData: action.data };
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

  const getListData = async () => {
    const data = {
      jenjangkelas: await getFirebaseDataOnce({
        ref: "master_jenjangkelas",
        limit: 3,
      }),
      mapel: await getFirebaseDataOnce({ ref: "master_mapel", limit: 3 }),
      paket: await getFirebaseDataOnce({ ref: "master_paket", limit: 3 }),
      wilayah: await getFirebaseDataOnce({ ref: "master_wilayah", limit: 3 }),
    };

    setListStatus("viewing");
    dispatch({ type: "GET_LIST_DATA", data });
  };

  const getFormData = async () => {
    const fbParams = {
      ref: `${state.formName}`,
    };

    const data = await getFirebaseDataOnce(fbParams);
    if (data) {
      setFormStatus("viewing");
      dispatch({ type: "GET_FORM_DATA", data });
    } else {
      setFormStatus("empty");
    }
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

    refreshFormData();
  };

  const deleteFormData = async (dataId) => {
    let fbParams = {
      masterJenjangkelas: {
        ref: `${state.formName}/${dataId}`,
      },
    };

    await deleteFirebaseData(fbParams.masterJenjangkelas);

    refreshFormData();
  };

  const refreshFormData = async () => {
    setFormStatus("refreshing");
    await getFormData();
    setFormStatus("viewing");
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
        refreshFormData,
        setFormName,
        setListStatus,
      }}
    >
      {children}
    </ContextMaster.Provider>
  );
};

export { ContextMaster, ProviderMaster };
