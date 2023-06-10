import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import UpcomingNotices from "../pages/UpcomingNotices/UpcomingNotices";
import RecentActivity from "../pages/RecentActivity/RecentActivity";
import PrivateRoute from "./PrivateRoute";
import Users from "../pages/Admin/Users";
import ClubMembers from "../pages/ClubMembers/ClubMembers";
import Meetings from "../pages/Meetings/Meetings";
import TakeDecission from "../pages/TakeDecission/TakeDecission";
import ApplyFestive from "../pages/President/ApplyFestive";
import FestiveRequest from "../pages/Admin/FestiveRequest";
import Festives from "../pages/Festives/Festives";
import Blogs from "../pages/Blogs/Blogs";
import AddClub from "../pages/Admin/AddClub";
import Payment from "../pages/Auth/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/club-members",
        element: <ClubMembers />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/upcoming-notices",
        element: <UpcomingNotices />,
      },
      {
        path: "/recent-activity",
        element: <RecentActivity />,
      },
      {
        path: "/upcoming-meeetings",
        element: <Meetings />,
      },
      {
        path: "/take-decision",
        element: <TakeDecission/>,
      },
      {
        path: "/apply-festive",
        element: <ApplyFestive/>,
      },
      {
        path: "/festive-request",
        element: <FestiveRequest/>,
      },
      {
        path: "/festive",
        element: <Festives/>,
      },
      {
        path: "/blogs",
        element: <Blogs/>,
      },
      {
        path: "/add-club",
        element: <AddClub/>,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
]);
