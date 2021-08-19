import React, { FC } from "react";

type Props = {
  useHookRegister?: any;
  disabled?: boolean;
  onChange?: any;
  label?: string;
  name?: string;
  value?: any;
  placeholder?: string;
  onClick?: any;
  additionalClassName?: string;
};
export const InputDate: FC<Props> = ({
  useHookRegister,
  disabled,
  onChange,
  label,
  name,
  value,
  placeholder,
  onClick,
  additionalClassName,
}) => {
  return (
    <div className="mt-4">
      <p className="text-left text-base font-medium">{label}</p>
      <input
        onClick={onClick}
        type="Date"
        onChange={onChange}
        name={name}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        {...useHookRegister}
        className={`border-2 rounded-lg outline-none border-gray-200 px-1 py-1.5 w-full focus:border-gray-600 bg-white ${additionalClassName}`}
      />
    </div>
  );
};
