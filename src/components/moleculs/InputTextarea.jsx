import React from "react";

const InputTextarea = ({
  heading,
  value,
  useHookRegister,
  disabled,
  placeholder,
}) => {
  return (
    <div className="mt-4">
      <label>{heading}</label>
      <textarea
        value={value}
        rows="3"
        disabled={disabled}
        placeholder={placeholder}
        {...useHookRegister}
        className="border-2 rounded-lg outline-none border-gray-200 px-1 py-1.5 w-full focus:border-gray-600 bg-white"
      ></textarea>
    </div>
  );
};

export default InputTextarea;
