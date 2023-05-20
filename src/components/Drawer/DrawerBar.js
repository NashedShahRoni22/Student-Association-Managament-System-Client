import React from "react";
import {
  Drawer,
  Typography,
  IconButton
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Sidebar from "../Sidebar/Sidebar";
 
export function DrawerBar({openDrawer, open, closeDrawer}) {
 
  return (
    <React.Fragment>
      <Drawer open={open} onClose={closeDrawer}>
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h6" color="blue-gray">
            SAMS Menu
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <Sidebar/>
      </Drawer>
    </React.Fragment>
  );
}