import React from "react";
import { Title } from "@components";

const CardItem = ({ title, children, containerClass }) => {
  return (
    <div className={`rounded-md bg-white ${containerClass}`}>
      {title && <Title text={title} type="cardItem" />}
      <div className="p-2.5">{children}</div>
    </div>
  );
};

export default CardItem;
