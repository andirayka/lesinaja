import React from "react";

const Button = ({ type, text, additionalClassName, onClick, loading }) => {
  if (loading) {
    return (
      <button
        onClick={onClick}
        type={type}
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
      {loading}
      {text}
    </button>
  );
};

export default Button;
