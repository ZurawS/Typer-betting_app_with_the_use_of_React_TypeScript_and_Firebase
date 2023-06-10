import Sidebar from "./Sidebar/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <div className="flex w-full bg-slate-50 max-h-screen overflow-y-hidden overflow-x-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="container relative mt-12 mx-auto flex flex-col flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
