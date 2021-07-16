import React from "react";

const InputText = ({ label, value, onChange }) => {
  // const focusInputClass = inputClass
  //   .split(" ")
  //   .map((item) => `focus:${item}`)
  //   .join(" ");

  return (
    <div>
      <p className="text-left text-base font-medium">{label}</p>
      <input
        type="text"
        value={value}
        onChange={({ target }) => onChange(target.value)}
        // className={`${inputClass} ${focusInputClass}`}
        className="border-2 rounded-lg border-gray-200 p-1"
      />
    </div>
  );
};

export default InputText;
