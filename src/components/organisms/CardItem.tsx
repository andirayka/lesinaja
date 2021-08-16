import React, { FC } from "react";
import { Title } from "@components";

type Props = {
  title?: string;
  containerClass?: string;
};
// Card yang menampilkan list data di dalam content
export const CardItem: FC<Props> = ({ title, children, containerClass }) => {
  return (
    <div className={`rounded-md bg-white ${containerClass}`}>
      {title && <Title title={title} type="cardItem" />}

      <div className="p-2.5">{children}</div>
    </div>
  );
};
