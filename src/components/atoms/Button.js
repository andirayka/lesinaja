import React from "react";

const Button = ({ text, additionalClassName }) => {
  return <button className={`px-4 py-3 ${additionalClassName}`}>{text}</button>;
};

export default Button;
