// @ts-nocheck
import React, { FC } from "react";
import { AuthProvider, AuthContext } from "./AuthContext";
import { MasterProvider, MasterContext } from "./MasterContext";

// * Combine all providers
const providers = [AuthProvider, MasterProvider];
const AppProvider: FC = ({ children }) => {
  return providers.reduceRight((acc, Comp) => {
    return <Comp>{acc}</Comp>;
  }, children);
};

export default AppProvider;
export { MasterContext, AuthContext };
