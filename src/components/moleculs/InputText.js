import React from "react";

const InputText = ({ label, value, placeholder, onChange }) => {
  return (
    <div className="mt-4">
      <p className="text-left text-base font-medium">{label}</p>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={({ target }) => onChange(target.value)}
        className="border-2 rounded-lg outline-none border-gray-200 px-1 py-1.5 w-full focus:border-gray-600"
      />
    </div>
  );
};

export default InputText;
