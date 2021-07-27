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
  formStatus: "loading",
};

// * Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "GET_FORM_DATA":
      return { ...state, formData: action.data };
    case "SET_FORM_STATUS":
      return { ...state, formStatus: action.status };

    default:
      return state;
  }
};

const ContextMaster = createContext(initialState);
const ProviderMaster = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getFormData = async () => {
    const fbParams = {
      ref: "master_jenjangkelas",
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

  const saveFormData = (data) => {
    let fbParams = {
      payload: { nama: data.nama },
    };

    if (data.id) {
      // Update
      fbParams.ref = `master_jenjangkelas/${data.id}`;
      updateFirebaseData(fbParams);
    } else {
      // Add new
      fbParams.ref = `master_jenjangkelas`;
      addFirebaseData(fbParams);
    }
  };

  const deleteFormData = (dataId) => {
    let fbParams = {
      ref: `master_jenjangkelas/${dataId}`,
    };
    deleteFirebaseData(fbParams);
  };

  return (
    <ContextMaster.Provider
      value={{
        state,
        getFormData,
        setFormStatus,
        saveFormData,
        deleteFormData,
      }}
    >
      {children}
    </ContextMaster.Provider>
  );
};

export { ContextMaster, ProviderMaster };
