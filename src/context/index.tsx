import React from "react";
import { ProviderAuth, ContextAuth } from "./AuthContext";

// * Combine all providers
const providers = [ProviderAuth];
const ProviderApp = ({ children }) => {
  return providers.reduceRight((acc, Comp) => {
    return <Comp>{acc}</Comp>;
  }, children);
};

export default ProviderApp;
export * from "./AuthContext";
