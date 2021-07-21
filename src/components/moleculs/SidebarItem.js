import React from "react";

const SidebarItem = ({
  additionalClassName,
  text,
  children,
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
      {children}
      {text}
    </button>
  );
};

export default SidebarItem;
