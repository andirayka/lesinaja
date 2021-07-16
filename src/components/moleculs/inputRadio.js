import React from 'react';

const InputRadio = ({ heading, label, value, placeholder, onChange }) => {
  return (
    <div className="mt-4">
      {heading && <p className="text-left text-base font-medium">{heading}</p>}
      <input
        type="radio"
        value={value}
        // onChange={({ target }) => onChange(target.value)}
        className="form-radio"
      />
      <label htmlFor="" className="">
        {label}
      </label>
    </div>
  );
};

export default InputRadio;
