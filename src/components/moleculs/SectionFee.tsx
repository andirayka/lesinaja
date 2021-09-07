import React, { FC } from "react";

type Props = {
  heading: string;
  value: string | number;
};

export const SectionFee: FC<Props> = ({ heading, value }) => {
  return (
    <div className="text-center lg:px-80 px-20 mb-4">
      <h2 className="font-medium text-xl">{heading}</h2>
      <div>
        <div className="font-medium text-4xl">{value}</div>
        <hr className="border-solid border-black border-2" />
      </div>
    </div>
  );
};
