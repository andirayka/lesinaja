import React, { FC } from "react";

type Props = {
  type: "pageTitle" | "cardItem";
  title: string;
  subtitle?: string;
  titleClassName?: string;
  itemClassName?: string;
};
// Judul content
export const Title: FC<Props> = ({
  type,
  title,
  subtitle,
  itemClassName = "p-2.5",
  titleClassName = "text-xl",
}) => {
  if (type == "cardItem")
    return (
      <div className={`rounded-md ${itemClassName}`}>
        <p className={`font-bold ${titleClassName}`}>{title}</p>
        {subtitle && <p className="text-gray-500">{subtitle}</p>}
      </div>
    );

  // Default = pageTitle
  return (
    <div className={`rounded-md`}>
      <p className={`font-bold text-4xl`}>{title}</p>
      {subtitle && <p className="text-gray-500">{subtitle}</p>}
    </div>
  );
};
