import React from "react";

const Button = ({ type, text, additionalClassName, onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-3 ${additionalClassName}`}
    >
      {text}
    </button>
  );
};

export default Button;
