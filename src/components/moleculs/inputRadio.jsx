import React from "react";

const InputRadio = ({ id, heading, label, useHookRegister }) => {
  return (
    <div>
      <p className="mt-4">{heading && heading}</p>
      <input {...useHookRegister} type="radio" value="Tutor/Pengajar" />
    </div>
  );
};

export default InputRadio;
