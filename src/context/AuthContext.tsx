import React, { createContext, useReducer } from "react";
import type { ReactNode } from "react";

// * initial Value
const initialState = {
  isLoggedIn: undefined, // Undefined = belum tahu, true = sudah login, false = tidak login
};

// * Reducer
type State = typeof initialState;
type Actions = { type: "SET_IS_LOGGED_IN"; isLoggedIn: boolean };
const reducer = (state: object, action: Actions) => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.isLoggedIn };

    default:
      return state;
  }
};

export const AuthContext = createContext<object>(initialState);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // * Set ke reducer apakah sudah login atau belum
  const setIsLoggedIn = (value: boolean) => {
    dispatch({ type: "SET_IS_LOGGED_IN", isLoggedIn: value });
  };

  // * Fungsi untuk logout
  // panggil firebase logout, lalu navigate ke login
  const logout = async () => {};

  return (
    <AuthContext.Provider value={{ state, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};