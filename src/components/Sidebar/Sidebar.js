import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  ChevronDownIcon,
  HomeIcon,
  UserPlusIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <Card className="">
      <List>
        <Link to="/" className="font-semibold text-indigo-500">
          <ListItem>
            <ListItemPrefix>
              <HomeIcon className="h-6 w-6" />
            </ListItemPrefix>
            Home
          </ListItem>
        </Link>
        <Link to="/" className="font-semibold text-indigo-500">
          <ListItem>
            <ListItemPrefix>
              <CalendarDaysIcon className="h-6 w-6" />
            </ListItemPrefix>
            Events
          </ListItem>
        </Link>
        <Link to="/membership" className="font-semibold text-indigo-500">
          <ListItem>
            <ListItemPrefix>
              <UserPlusIcon className="h-6 w-6" />
            </ListItemPrefix>
            Membership
          </ListItem>
        </Link>

        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3 font-semibold text-indigo-500"
            >
              <ListItemPrefix>
              <AcademicCapIcon className="h-6 w-6" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Admin
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>Users</ListItem>
              <ListItem>Membership</ListItem>
              <ListItem>Events</ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3 font-semibold text-indigo-500"
            >
              <ListItemPrefix>
              <UserGroupIcon className="h-6 w-6" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Manager
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>Notice</ListItem>
              <ListItem>Activity</ListItem>
              <ListItem>Meetings</ListItem>
              <ListItem>Blog</ListItem>
            </List>
          </AccordionBody>
        </Accordion>
      </List>
    </Card>
  );
}
