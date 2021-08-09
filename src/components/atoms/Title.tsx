import React, { FC } from "react";

type Props = {
  type: "pageTitle" | "cardItem";
  text: string;
};
// Judul content
export const Title: FC<Props> = ({ type, text }) => {
  if (type == "cardItem")
    return (
      <div className="rounded-md p-2.5 bg-yellow-400">
        <p className="font-semibold text-xl">{text}</p>
      </div>
    );

  // Default = pageTitle
  return (
    <div className="rounded-md p-3 bg-white">
      <p className="font-semibold text-2xl">{text}</p>
    </div>
  );
};
