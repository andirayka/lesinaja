import React from "react";

const Button = ({ type, text, additionalClassName }) => {
  return (
    <button type={type} className={`px-4 py-3 ${additionalClassName}`}>
      {text}
    </button>
  );
};

export default Button;
