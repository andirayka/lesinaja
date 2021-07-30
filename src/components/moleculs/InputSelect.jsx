import React from "react";

const InputSelect = ({ heading, useHookRegister, disabled }) => {
  return (
    <div className="mt-4">
      <label>{heading}</label>
      <select
        className="border-2 rounded-lg outline-none border-gray-200 px-1 py-1.5 w-full focus:border-gray-600 bg-white"
        {...useHookRegister}
        disabled={disabled}
      >
        <option>Masukkan pilihan anda</option>
        <option></option>
        <option></option>
      </select>
    </div>
  );
};

export default InputSelect;
