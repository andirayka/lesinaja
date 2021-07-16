import React from "react";
import { Title } from "@components";

const CardItem = ({ title, children }) => {
  return (
    <div className="rounded-md bg-white">
      <Title text={title} type="cardItem" />
      <div className="p-2.5">{children}</div>
    </div>
  );
};

export default CardItem;
