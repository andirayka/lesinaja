import React, { FC, MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  text: string;
  icon: any;
  onClick: MouseEventHandler<HTMLDivElement>;
};

export const NavbarDesktopItem: FC<Props> = ({ text, icon, onClick }) => {
  return (
    <div className="relative w-full bg-yellow-400 z-50">
      <div
        className="hover:bg-yellow-500 border-b-[1.8px] border-yellow-300 cursor-pointer"
        onClick={onClick}
      >
        <button className="flex flex-row text-md py-2 pl-4">
          <div className="w-12 mr-2">
            <FontAwesomeIcon icon={icon} size="2x" />
          </div>
          {text}
        </button>
      </div>
    </div>
  );
};
