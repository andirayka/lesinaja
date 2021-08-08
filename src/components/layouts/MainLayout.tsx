import React, { FC } from "react";
import { Sidebar } from "@components";

// Pembungkus semua content di dalam halaman yang bisa login
export const MainLayout: FC = ({ children }) => {
  return (
    <div className="flex p-6">
      <div className="w-72">
        <Sidebar />
      </div>

      {/* Content halaman dengan flex-grow:1 */}
      <div className="flex-grow bg-green-500 ml-16">{children}</div>
    </div>
  );
};
