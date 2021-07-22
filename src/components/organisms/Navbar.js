import React from "react";
import { mainLogo } from "@assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <div className="block md:hidden absolute top-0 right-0 left-0 bg-yellow-400">
      <div className="flex flex-row justify-between items-center">
        <img src={mainLogo} alt="" className="w-36" />
        <FontAwesomeIcon icon={faBars} size="2x" className="mr-3" />
      </div>
    </div>
  );
};

export default Navbar;
