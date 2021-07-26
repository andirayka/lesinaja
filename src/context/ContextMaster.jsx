import React, { createContext, useReducer } from "react";

// * initial Value
const initialState = {
  formData: null,
};

// * Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "":
      return {
        ...state,
      };

    default:
      return state;
  }
};

const ContextMaster = createContext(initialState);
const ProviderMaster = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ContextMaster.Provider value={{ state }}>
      {children}
    </ContextMaster.Provider>
  );
};

export { ContextMaster, ProviderMaster };
