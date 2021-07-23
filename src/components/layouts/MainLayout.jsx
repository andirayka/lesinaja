import { Sidebar, Navbar } from "@components/organisms";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col items-start md:flex-row pt-24 md:pt-8 p-8 bg-image">
      <Navbar />
      <Sidebar />
      {children}
    </div>
  );
};

export default MainLayout;
