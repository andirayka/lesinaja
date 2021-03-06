import React from "react";

const CardKeyValue = ({ keyName, value }) => {
  return (
    <div className="flex flex-row my-3">
      <p className="font-medium w-56">{keyName}</p>
      <p className="flex flex-1">{value}</p>
    </div>
  );
};

export default CardKeyValue;
