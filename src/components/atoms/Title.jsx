import React from "react";

const Title = ({ text, type }) => {
  if (type == "pageTitle") {
    return (
      <div className={`rounded-md p-3 bg-white`}>
        <p className={`font-semibold text-2xl`}>{text}</p>
      </div>
    );
  }
  if (type == "cardItem") {
    return (
      <div className={`rounded-md p-2.5 bg-yellow-400`}>
        <p className={`font-semibold text-xl`}>{text}</p>
      </div>
    );
  }
};

export default Title;
