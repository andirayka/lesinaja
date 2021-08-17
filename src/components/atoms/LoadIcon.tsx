import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

type Props = {
  additionalClassName: string;
};

export const LoadIcon: FC<Props> = ({ additionalClassName }) => {
  return (
    <FontAwesomeIcon
      icon={faCircleNotch}
      className={`self-center text-black mr-1 ${additionalClassName}`}
      spin
    />
  );
};
