import { Sidebar } from "@components/organisms";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col items-start md:flex-row p-8">
      <Sidebar />
      {children}
    </div>
  );
};

export default MainLayout;
