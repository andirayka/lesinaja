import React from "react";

const InputRadio = ({ id, heading, label, value, useHookRegister }) => {
  return (
    <>
      {heading && <p className="mt-4">{heading}</p>}

      {id && <input type="radio" id={id} value={value} {...useHookRegister} />}

      {label && (
        <label className="ml-2" htmlFor={id}>
          {label}
        </label>
      )}
    </>
  );
};

export default InputRadio;
