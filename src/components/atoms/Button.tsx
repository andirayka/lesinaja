import React, { FC, MouseEventHandler } from "react";

interface Props {
  type?: "submit" | "reset" | "button";
  text: string;
  additionalClassName: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  loading?: FC;
}

const Button: FC<Props> = ({
  type,
  text,
  additionalClassName,
  onClick,
  loading,
}) => {
  if (loading) {
    return (
      <button
        disabled
        // onClick={onClick}
        // type={type}
        className={`px-4 py-3 flex justify-center bg-yellow-600 ${additionalClassName}`}
      >
        {loading}
        Loading...
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-3 flex justify-center ${additionalClassName}`}
    >
      {text}
    </button>
  );
};

export default Button;
