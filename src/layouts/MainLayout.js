import React, { useState } from "react";
import Header from "../components/Navbar/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { DrawerBar } from "../components/Drawer/DrawerBar";

const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  return (
    <div className="bg-indigo-300">
      <Header openDrawer={openDrawer}/>
      <div className="flex gap-8">
        <div className="hidden lg:block mt-8">
          <Sidebar />
        </div>
        <div className="w-full banner">
          <Outlet />
        </div>
      </div>
      <DrawerBar openDrawer={openDrawer} open={open} closeDrawer={closeDrawer}/>
    </div>
  );
};

export default MainLayout;
