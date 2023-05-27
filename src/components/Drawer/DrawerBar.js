import React from "react";
import {
  Drawer,
  Typography,
  IconButton
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Sidebar from "../Sidebar/Sidebar";
 
export function DrawerBar({ open, closeDrawer}) {
 
  return (
    <React.Fragment>
      <Drawer open={open} onClose={closeDrawer} className="bg-[#463BFB] border-r-4">
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h6" color="white">
            SAMS
          </Typography>
          <IconButton variant="text" color="white" onClick={closeDrawer}>
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <Sidebar/>
      </Drawer>
    </React.Fragment>
  );
}