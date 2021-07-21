import React from 'react';

const InputRadio = ({ id, heading, label, useHookRegister }) => {
  return (
    <>
      {heading && (
        <p className="text-left text-base font-medium mt-4">{heading}</p>
      )}

      <div className="inline-block">
        {id && (
          <input type="radio" id={id} {...useHookRegister} className="mr-2" name="role" />
        )}

        {label && (
          <label htmlFor={id} className="mr-2">
            {label}
          </label>
        )}
      </div>
    </>
  );
};

export default InputRadio;
