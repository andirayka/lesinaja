import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const LoadIcon = ({ additionalClassName }) => {
  return (
    <FontAwesomeIcon
      icon={faCircleNotch}
      className={`self-center text-black mr-1 ${additionalClassName}`}
      spin
    />
  );
};

export default LoadIcon;
