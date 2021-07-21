import React from "react";

const SidebarItem = ({ additionalClassName, text, children }) => {
  return (
    <button
      className={`hover:bg-yellow-400 py-2 w-full text-left pl-6 ${additionalClassName}`}
    >
      {children}
      {text}
    </button>
  );
};

export default SidebarItem;
