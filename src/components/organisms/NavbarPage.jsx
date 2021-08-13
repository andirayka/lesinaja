import React from "react";
import { judulLogo } from "@assets";

export const NavbarPage = () => {
  return (
    <nav className="px-8 py-2 bg-yellow-400 mb-8 flex h-14">
      <div className="flex-auto ">
        <div className="flex">
          <img
            src={judulLogo}
            alt=""
            className="w-12 rounded-full border-2 ml-auto mr-2"
          />
          <div className="mt-auto mb-auto">Nama Admin</div>
        </div>
      </div>
    </nav>
  );
};
