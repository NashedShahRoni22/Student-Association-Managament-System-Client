import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Membership from "../pages/Membership/Membership";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import UpcomingNotices from "../pages/UpcomingNotices/UpcomingNotices";
import RecentActivity from "../pages/RecentActivity/RecentActivity";
import PrivateRoute from "./PrivateRoute";
import Users from "../pages/Admin/Users";

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
        path: "/membership",
        element: <Membership />,
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
]);
