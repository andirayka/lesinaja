import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import React, { FC, MouseEventHandler } from "react";

type Props = {
  text: string;
  icon: any;
  isActive: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

// Item tiap sidebar
export const SidebarItem: FC<Props> = ({ text, icon, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`hover:bg-yellow-400 py-2 w-full text-left pl-6 flex flex-row items-center ${
        isActive && "bg-yellow-400"
      }`}
    >
      <div className="w-12 mr-2">
        <FontAwesomeIcon icon={icon} size="2x" />
      </div>
      {text}
    </button>
  );
};
