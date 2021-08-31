import React, { FC, MouseEventHandler } from "react";

type Props = {
  type?: "submit" | "reset" | "button";
  text: string;
  additionalClassName?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: any;
  icon?: any;
};

export const Button: FC<Props> = ({
  type,
  text,
  additionalClassName,
  onClick,
  loading,
  icon,
}) => {
  if (loading)
    return (
      <button
        className={`px-4 py-3 flex justify-center bg-yellow-600 pointer-events-none ${additionalClassName}`}
      >
        {loading}
        Loading...
      </button>
    );

  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-3 flex justify-center ${additionalClassName}`}
    >
      {text}
      {icon}
    </button>
  );
};
