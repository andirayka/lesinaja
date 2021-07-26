import React from "react";
import { ProviderLoading, ContextLoading } from "./ContextLoading";
import { ProviderMaster, ContextMaster } from "./ContextMaster";

// * Combine all providers
const providers = [ProviderLoading, ProviderMaster];
const ProviderApp = ({ children }) => {
  return providers.reduceRight((acc, Comp) => {
    return <Comp>{acc}</Comp>;
  }, children);
};

export default ProviderApp;
export { ContextMaster, ContextLoading };
