import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

const RefreshIcon = ({
  additionalClassName = "text-2xl text-black absolute left-1/2 bottom-20 top-3 z-10",
}) => {
  return (
    <div>
      <FontAwesomeIcon icon={faSyncAlt} className={additionalClassName} spin />
    </div>
  );
};

export default RefreshIcon;
