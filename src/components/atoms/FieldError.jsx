import React, { useEffect, useContext } from "react";
import { ContextMaster } from "@context";

// * Untuk message di bawah field jika ada error
const FieldError = ({ message }) => {
  const {
    state: { formStatus },
    setFormStatus,
  } = useContext(ContextMaster);

  useEffect(() => {
    setFormStatus();
  });
  return <p className="text-red-500">{message}</p>;
};

export default FieldError;
