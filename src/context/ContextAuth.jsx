import React, { createContext, useReducer } from "react";

// * initial Value
const initialState = {
  isLoggedIn: undefined, // Undefined = belum tahu, true = sudah login, false = tidak login
};

// * Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.isLoggedIn };

    default:
      return state;
  }
};

const ContextAuth = createContext(initialState);
const ProviderAuth = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // * Set ke reducer apakah sudah login atau belum
  const setIsLoggedIn = (value) => {
    dispatch({ type: "SET_IS_LOGGED_IN", isLoggedIn: value });
  };

  // * Fungsi untuk logout
  // panggil firebase logout, lalu navigate ke login
  const logout = async () => {};

  return (
    <ContextAuth.Provider
      value={{
        state,
        setIsLoggedIn,
        logout,
      }}
    >
      {children}
    </ContextAuth.Provider>
  );
};

export { ContextAuth, ProviderAuth };
