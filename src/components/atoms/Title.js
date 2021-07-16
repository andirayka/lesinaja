import React from "react";

const Title = ({ containerClass, textClass, text }) => {
  return (
    <div className={`rounded-md p-3 ${containerClass}`}>
      <p className={`font-semibold ${textClass}`}>{text}</p>
    </div>
  );
};

export default Title;
