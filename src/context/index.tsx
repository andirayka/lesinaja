import React, { FC } from "react";
import { AuthProvider } from "./AuthContext";
import { ProviderMaster, ContextMaster } from "./ContextMaster";

// * Combine all providers
const providers = [AuthProvider, ProviderMaster];
const AppProvider: FC = ({ children }) => {
  return providers.reduceRight((acc, Comp) => {
    return <Comp>{acc}</Comp>;
  }, children);
};

export default AppProvider;
export { ContextMaster };
