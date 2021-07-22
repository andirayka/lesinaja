import React from "react";

const NavbarItem = ({ text }) => {
  return (
    <div className="absolute w-full top-0 bottom-0 left-0 bg-yellow-400 z-50">
      <button>{text}</button>
    </div>
  );
};

export default NavbarItem;
