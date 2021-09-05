import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, FC, MouseEventHandler } from "react";

type Props = {
  label?: string;
  placeholder?: string;
  value?: string | null;
  disabled?: boolean;
  name?: string;
  containerClassName?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onChange?: (e: any) => any;
  onKeyDown?: (e: any) => any;
  useHookRegister?: any;
  search?: boolean;
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
  search,
}) => {
  return (
    <div className={containerClassName}>
      <p className="text-left text-base font-medium">{label}</p>
      <div className="flex relative">
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
        {search && (
          <FontAwesomeIcon
            icon={faSearch}
            className="text-2xl absolute right-5 top-2 text-gray-500"
          />
        )}
      </div>
    </div>
  );
};
