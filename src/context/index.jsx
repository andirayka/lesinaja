import React from "react";
import { ProviderLoading } from "./ContextLoading";
import { ProviderMaster } from "./ContextMaster";

const providers = [ProviderLoading, ProviderMaster];
const ProviderApp = ({ children }) => {
  return providers.reduceRight((acc, Comp) => {
    return <Comp>{acc}</Comp>;
  }, children);
};

export default ProviderApp;
