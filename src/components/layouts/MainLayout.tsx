import React, { FC } from "react";
import { Sidebar, NavbarDesktop } from "@components";

// Pembungkus semua content di dalam halaman yang bisa login
export const MainLayout: FC = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar di sebelah kiri */}
      <div className="w-72">
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col">
        <NavbarDesktop />
        {/* Content halaman di sebelah kanan */}
        <div className="flex-grow m-8">{children}</div>
      </div>
    </div>
  );
};
