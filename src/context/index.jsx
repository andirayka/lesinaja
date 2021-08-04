import React from "react";
import { ProviderMaster, ContextMaster } from "./ContextMaster";
import { ProviderAuth, ContextAuth } from "./ContextAuth";

// * Combine all providers
const providers = [ProviderAuth, ProviderMaster];
const ProviderApp = ({ children }) => {
  return providers.reduceRight((acc, Comp) => {
    return <Comp>{acc}</Comp>;
  }, children);
};

export default ProviderApp;
export { ContextMaster, ContextAuth };
