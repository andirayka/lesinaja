import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const LoadIcon = () => {
  return (
    <FontAwesomeIcon
      icon={faCircleNotch}
      className="text-2xl self-center text-black mr-1"
      spin
    />
  );
};

export default LoadIcon;
