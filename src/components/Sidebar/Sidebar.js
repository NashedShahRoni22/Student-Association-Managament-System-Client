import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function Sidebar() {
  //accordion
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const { signedInUser } = useContext(AuthContext);
  return (
    <div className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4">
      <List>
        <Link to="/" className="font-semibold text-white">
          <ListItem>
            <ListItemPrefix>
              <HomeIcon className="h-6 w-6" />
            </ListItemPrefix>
            Home
          </ListItem>
        </Link>
        <Link to="/festive" className="font-semibold text-white">
          <ListItem>
            <ListItemPrefix>
              <CalendarDaysIcon className="h-6 w-6" />
            </ListItemPrefix>
            Festive
          </ListItem>
        </Link>
        <Link to="/club-members" className="font-semibold text-white">
          <ListItem>
            <ListItemPrefix>
              <UserGroupIcon className="h-6 w-6" />
            </ListItemPrefix>
            Club Members
          </ListItem>
        </Link>
        <Link to="/blogs" className="font-semibold text-white">
          <ListItem>
            <ListItemPrefix>
              <PaperAirplaneIcon className="h-6 w-6" />
            </ListItemPrefix>
            Blogs
          </ListItem>
        </Link>
        {/* admin action  */}
        {signedInUser?.isAdmin && (
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform${
                  open === 1 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="border-b-0 p-3 font-semibold text-white"
              >
                <ListItemPrefix>
                  <AcademicCapIcon className="h-6 w-6" />
                </ListItemPrefix>
                <Typography color="white" className="mr-auto font-normal">
                  Admin
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0 text-white">
                <Link className="ml-5" to="/users">
                  <ListItem>Users</ListItem>
                </Link>
                <Link className="ml-5" to="/festive-request">
                  <ListItem>Festive Request</ListItem>
                </Link>
                <Link className="ml-5" to="/add-club">
                  <ListItem>Add Club</ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>
        )}

        {/* president action  */}
        {signedInUser?.isPresident && (
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
                className="border-b-0 p-3 font-semibold text-white"
              >
                <ListItemPrefix>
                  <UserGroupIcon className="h-6 w-6" />
                </ListItemPrefix>
                <Typography className="mr-auto font-normal">
                  President
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0 text-white">
                <Link className="ml-5" to="/take-decision">
                  <ListItem>Suggestions</ListItem>
                </Link>
                <Link className="ml-5" to="/apply-festive">
                  <ListItem>Apply Festive</ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>
        )}
      </List>
    </div>
  );
}
