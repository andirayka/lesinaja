import React from "react";
import { mainLogo } from "@assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarItem } from "@components";
import { sidebarList } from "@components";
import { NavbarItem } from "@components";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  const openHandler = () => {
    !isOpen ? setOpen(true) : setOpen(false);
  };

  return (
    <div className="md:hidden fixed top-0 right-0 left-0 bg-yellow-400 z-50">
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
                <NavbarItem text={item.text} />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Navbar;
