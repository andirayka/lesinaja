import React, { FC } from "react";

type Props = {
  type: "pageTitle" | "cardItem";
  title: string;
  subtitle?: string;
};
// Judul content
export const Title: FC<Props> = ({ type, title, subtitle }) => {
  if (type == "cardItem")
    return (
      <div className="rounded-md p-2.5">
        <p className="font-bold text-xl">{title}</p>
      </div>
    );

  // Default = pageTitle
  return (
    <div className={`rounded-md`}>
      <p className={`font-bold text-4xl`}>{title}</p>
      <p className="text-gray-500">{subtitle}</p>
    </div>
  );
};
