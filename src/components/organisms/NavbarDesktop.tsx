import React, { FC } from "react";
import { IconLesinAja } from "@assets";

export const NavbarDesktop: FC = () => {
  return (
    <nav className="px-8 py-2 bg-yellow-400 h-14">
      <div className="flex-auto ">
        <div className="flex">
          <img
            src={IconLesinAja}
            alt=""
            className="w-12 rounded-full border-2 ml-auto mr-4"
          />
          <div className="mt-auto mb-auto">Nama Admin</div>
        </div>
      </div>
    </nav>
  );
};
