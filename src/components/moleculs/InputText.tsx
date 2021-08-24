import React, { ChangeEvent, FC, MouseEventHandler } from "react";

type Props = {
  label?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  name?: string;
  containerClassName?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onChange?: (e: any) => any;
  onKeyDown?: (e: any) => any;
  useHookRegister?: any;
};

export const InputText: FC<Props> = ({
  label,
  placeholder,
  useHookRegister,
  value,
  disabled,
  name,
  containerClassName = "mt-4",
  onClick,
  onChange,
}) => {
  return (
    <div className={containerClassName}>
      <p className="text-left text-base font-medium">{label}</p>
      <input
        onClick={onClick}
        type="text"
        onChange={onChange}
        name={name}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        {...useHookRegister}
        className="border-2 rounded-lg outline-none border-gray-200 px-1 py-1.5 w-full focus:border-gray-600 bg-white"
      />
    </div>
  );
};
