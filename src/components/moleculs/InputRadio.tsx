import React, { FC, MouseEventHandler } from "react";

type Props = {
  id?: any;
  heading?: string;
  label?: string;
  value?: string;
  useHookRegister?: any;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  checked?: any;
  name?: string;
};

export const InputRadio: FC<Props> = ({
  id,
  heading,
  label,
  value,
  useHookRegister,
  onClick,
  checked,
  name,
}) => {
  return (
    <>
      {heading && <p className="mt-4">{heading}</p>}

      {id && (
        <input
          onClick={onClick}
          type="radio"
          name={name}
          checked={checked}
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
