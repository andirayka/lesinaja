import React from "react";
import { Title } from "@components";

const CardItem = ({ title, children, containerClass, additionalClassName }) => {
  return (
    <div className={`rounded-md bg-white ${containerClass}`}>
      {title && (
        <div className={`rounded-t-md ${additionalClassName}`}>
          <Title text={title} type="cardItem" />
        </div>
      )}
      <div className="p-2.5">{children}</div>
    </div>
  );
};

export default CardItem;
