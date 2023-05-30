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
      <div className="bg-[#463BFB]">
        <div className="flex">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <div className="w-full">
            <Header openDrawer={openDrawer}/>
            <Outlet />
          </div>
        </div>
        <DrawerBar
          openDrawer={openDrawer}
          open={open}
          closeDrawer={closeDrawer}
        />
      </div>
  );
};

export default MainLayout;
