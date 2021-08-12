import React from "react";
import { Button } from "@components";

const CardNotification = ({
  notification,
  buttonText,
  onClickButton,
  additionalClassName,
  isTime,
}) => {
  return (
    <div className="flex flex-row my-3 items-center">
      <p className="flex-grow">
        <a className="text-gray-400">{isTime}</a>
        <br />
        {notification}
      </p>
      {buttonText && (
        <Button
          text={buttonText}
          additionalClassName={`${additionalClassName} rounded-lg font-medium`}
          onClick={onClickButton}
        />
      )}
    </div>
  );
};

export default CardNotification;
