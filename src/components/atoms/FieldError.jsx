import React from "react";

// * Untuk message di bawah field jika ada error
const FieldError = ({ message }) => {
  return <p className="text-red-500">{message}</p>;
};

export default FieldError;
