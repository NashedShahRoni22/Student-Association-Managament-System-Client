import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home/Home"
import Membership from "../pages/Membership/Membership"
import SignIn from "../pages/Auth/SignIn"
import SignUp from "../pages/Auth/SignUp"
import UpcomingNotices from "../pages/UpcomingNotices/UpcomingNotices"


export const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children: [
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/membership",
                element:<Membership/>
            },
            {
                path:"/sign-in",
                element:<SignIn/>
            },
            {
                path:"/sign-up",
                element:<SignUp/>
            },
            {
                path:"/upcoming-notices",
                element:<UpcomingNotices/>
            }
        ]
    }
])