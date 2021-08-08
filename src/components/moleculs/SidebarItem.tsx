import React, { FC } from "react";

type Props = {
  text: string;
  isActive: boolean;
  additionalClassName?: string;
};

// Item tiap sidebar
export const SidebarItem: FC<Props> = ({
  additionalClassName,
  text,
  icon,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`hover:bg-yellow-400 py-2 w-full text-left pl-6 ${additionalClassName} ${
        isActive && "bg-yellow-400"
      }`}
    >
      {icon}
      {text}
    </button>
  );
};
