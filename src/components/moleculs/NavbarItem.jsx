import React from "react";

const NavbarItem = ({ text }) => {
  return (
    <div className="w-full bg-yellow-400 z-50">
      <div className="hover:bg-yellow-600">
        <button className="text-md py-2 pl-4">{text}</button>
      </div>
    </div>
  );
};

export default NavbarItem;
