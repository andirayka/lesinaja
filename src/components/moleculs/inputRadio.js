import React from 'react';

const InputRadio = ({ heading, label, useHookRegister }) => {
  return (
    <div>
      {heading && (
        <p className="text-left text-base font-medium mt-4">{heading}</p>
      )}
      <input type="radio" {...useHookRegister} className="form-radio" />
      <label htmlFor="" className="">
        {label}
      </label>
    </div>
  );
};

export default InputRadio;
