import { Sidebar, Navbar, NavbarPage } from "@components";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col items-start md:flex-row pt-24 md:pt-0">
      <Navbar />
      <Sidebar />
      <div className="w-full">
        <NavbarPage />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
