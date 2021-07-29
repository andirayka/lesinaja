import React from "react";

const InputRadio = ({
  id,
  heading,
  label,
  value,
  useHookRegister,
  onClick,
}) => {
  return (
    <>
      {heading && <p className="mt-4">{heading}</p>}

      {id && (
        <input
          onClick={onClick}
          type="radio"
          id={id}
          value={value}
          {...useHookRegister}
        />
      )}

      {label && (
        <label className="ml-2" htmlFor={id}>
          {label}
        </label>
      )}
    </>
  );
};

export default InputRadio;
