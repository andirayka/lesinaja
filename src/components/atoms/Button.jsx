import React from "react";

const Button = ({ type, text, additionalClassName, onClick, load }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-3 flex justify-center ${additionalClassName}`}
    >
      {load}
      {text}
    </button>
  );
};

export default Button;
