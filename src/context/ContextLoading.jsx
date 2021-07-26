import React, { createContext, useReducer } from "react";

// * initial Value
const initialState = {
  message: "",
  description: "",
};

// * Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "START_LOADING":
      return {
        ...state,
        [`isLoading${action.loadingName}`]: true,
        [`message${action.loadingName}`]: action.message,
        [`description${action.loadingName}`]: action.description,
      };

    case "STOP_LOADING":
      return {
        ...state,
        [`isLoading${action.loadingName}`]: false,
        [`message${action.loadingName}`]: action.message,
        [`description${action.loadingName}`]: action.description,
      };
    default:
      return state;
  }
};

// * Every loading has its own name and states
const ContextLoading = createContext(initialState);
const ProviderLoading = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startLoading = (
    loadingName,
    description = "",
    message = "Loading..."
  ) => {
    dispatch({
      type: "START_LOADING",
      loadingName,
      description,
      message,
    });
  };

  const stopLoading = (loadingName) => {
    dispatch({ type: "STOP_LOADING", loadingName });
  };

  return (
    <ContextLoading.Provider
      value={{
        state,
        startLoading,
        stopLoading,
      }}
    >
      {children}
    </ContextLoading.Provider>
  );
};

export { ContextLoading, ProviderLoading };
