import React, { FC } from "react";
import { Sidebar } from "@components";

// Pembungkus semua content di dalam halaman yang bisa login
export const MainLayout: FC = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      {/* Content full width dikurangi sidebar */}
      <div className="flex-grow bg-green-500">{children}</div>
    </div>
  );
};
