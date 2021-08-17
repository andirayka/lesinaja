import React, { FC } from "react";
import { Button } from "@components";

type Props = {
  notification: string;
  buttonText: string;
  onClickButton: () => void;
  additionalClassName: string;
  isTime: string;
};

export const CardNotification: FC<Props> = ({
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
