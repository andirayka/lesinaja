import React from "react";
import { mainLogo } from "@assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarItem } from "@components/moleculs";
import { sidebarList } from "@components/organisms";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(true);
  };

  return (
    <div className="md:hidden fixed top-0 right-0 left-0 bg-yellow-400">
      <div className="flex flex-row justify-between items-center">
        <img src={mainLogo} alt="" className="w-36" />
        <button onClick={openHandler}>
          <FontAwesomeIcon icon={faBars} size="2x" className="mr-3" />
        </button>
      </div>
      <div>
        {isOpen &&
          sidebarList.map((item, index) => {
            return (
              <Link key={index} to={item.path}>
                <SidebarItem text={item.text} />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Navbar;
