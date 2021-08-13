import React from "react";

const Title = ({ text, type, title }) => {
  if (type == "pageTitle") {
    return (
      <div className={`rounded-md`}>
        <p className={`font-bold text-4xl`}>{title}</p>
        <p className="text-gray-500">{text}</p>
      </div>
    );
  }
  if (type == "cardItem") {
    return (
      <div className={`rounded-md p-2.5 `}>
        <p className={`font-bold text-xl`}>{text}</p>
      </div>
    );
  }
};

export default Title;
