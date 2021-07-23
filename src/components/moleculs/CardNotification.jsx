import React from "react";
import { Button } from "@components";

const CardNotification = ({ notification, buttonText, onClickButton }) => {
  return (
    <div className="flex flex-row my-3 items-center">
      <p className="flex-grow">{notification}</p>
      {buttonText && (
        <Button
          text={buttonText}
          additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
          onClick={onClickButton}
        />
      )}
    </div>
  );
};

export default CardNotification;
