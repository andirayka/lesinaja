import React, { FC } from "react";
import { Sidebar } from "@components";

// Pembungkus semua content di dalam halaman yang bisa login
export const MainLayout: FC = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar di sebelah kiri */}
      <div className="w-72">
        <Sidebar />
      </div>

      {/* Content halaman di sebelah kanan */}
      <div className="flex-grow ml-16">{children}</div>
    </div>
  );
};
