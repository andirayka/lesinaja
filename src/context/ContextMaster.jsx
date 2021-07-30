import {
  addFirebaseData,
  deleteFirebaseData,
  getFirebaseDataOnce,
  updateFirebaseData,
} from "@utils";
import React, { createContext, useReducer } from "react";

// * initial Value
const initialState = {
  formData: null,
  listData: null,
  formStatus: "loading",
  listStatus: "loading",
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

    default:
      return state;
  }
};

const ContextMaster = createContext(initialState);
const ProviderMaster = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getListData = async () => {
    const data_jenjangkelas = await getFirebaseDataOnce({
      ref: "master_jenjangkelas",
    });
    const data_mapel = await getFirebaseDataOnce({ ref: "master_mapel" });
    const data_paket = await getFirebaseDataOnce({ ref: "master_paket" });
    const data_wilayah = await getFirebaseDataOnce({ ref: "master_wilayah" });

    const data = {
      jenjangkelas: data_jenjangkelas,
      mapel: data_mapel,
      paket: data_paket,
      wilayah: data_wilayah,
    };

    setListStatus("viewing");
    dispatch({ type: "GET_LIST_DATA", data });
  };

  const getFormData = async (refName) => {
    const fbParams = {
      ref: `${refName}`,
    };

    const data = await getFirebaseDataOnce(fbParams);
    if (data) {
      setFormStatus("viewing");
      dispatch({ type: "GET_FORM_DATA", data });
      console.log(data);
    } else {
      setFormStatus("empty");
    }
  };

  const setFormStatus = (status) => {
    dispatch({ type: "SET_FORM_STATUS", status });
  };

  const setListStatus = (status) => {
    dispatch({ type: "SET_LIST_STATUS", status });
  };

  // const saveFormData = async (data) => {
  //   let fbParams = {
  //     payload: { nama: data.nama },
  //   };

  //   if (data.id) {
  //     // Update
  //     fbParams.ref = `master_jenjangkelas/${data.id}`;
  //     await updateFirebaseData(fbParams);
  //   } else {
  //     // Add new
  //     fbParams.ref = `master_jenjangkelas`;
  //     await addFirebaseData(fbParams);
  //   }

  //   refreshFormData();
  // };

  const deleteFormData = async (dataId) => {
    // let fbParams = {
    //   ref: `master_jenjangkelas/${dataId}`,
    // };
    let fbParams = {
      masterJenjangkelas: {
        ref: `master_jenjangkelas/${dataId}`,
      },
      masterMapel: { ref: `master_mapel/${dataId}` },
      masterPaket: { ref: `master_paket/${dataId}` },
      masterWilayah: { ref: `master_wilayah/${dataId}` },
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
        // saveFormData,
        deleteFormData,
        refreshFormData,
      }}
    >
      {children}
    </ContextMaster.Provider>
  );
};

export { ContextMaster, ProviderMaster };
