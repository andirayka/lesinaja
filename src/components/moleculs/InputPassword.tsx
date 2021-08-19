import React, { useState, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

type Props = {
  label?: string;
  placeholder?: string;
  useHookRegister?: any;
  name?: string;
  onClick?: any;
};
export const InputPassword: FC<Props> = ({
  label,
  placeholder,
  useHookRegister,
  name,
  onClick,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mt-4 relative">
      <p className="text-left text-base font-medium">{label}</p>
      <input
        onClick={onClick}
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        {...useHookRegister}
        className="border-2 rounded-lg outline-none border-gray-200 px-1 py-1.5 w-full focus:border-gray-600"
      />
      <button
        className="absolute right-1 top-6 p-2"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <FontAwesomeIcon icon={faEye} className="text-gray-200" />
        ) : (
          <FontAwesomeIcon icon={faEyeSlash} className="text-gray-200" />
        )}
      </button>
    </div>
  );
};
