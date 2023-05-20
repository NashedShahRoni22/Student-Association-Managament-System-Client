import React, { useContext } from "react";
import { Navbar } from "@material-tailwind/react";
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function Header({ openDrawer }) {
  const { user, logOut } = useContext(AuthContext);
  return (
    <Navbar className="mx-auto max-w-screen-xl px-6 py-3 shadow-none lg:shadow">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link
          to="/"
          className="text-xl mr-4 cursor-pointer py-1.5 font-extrabold text-indigo-600"
        >
          SAMS
        </Link>
        <div className="flex items-center">
          {user?.uid ? (
            <Link className="mr-4 font-bold text-red-600" onClick={logOut}>Sign Out</Link>
          ) : (
            <Link to="/sign-in" className="mr-4 font-bold text-indigo-600">
              Sign In
            </Link>
          )}

          <Bars3BottomRightIcon
            onClick={openDrawer}
            className="h-8 w-8 text-indigo-500 cursor-pointer md:hidden"
            strokeWidth={2}
          />
        </div>
      </div>
      <div className="lg:hidden h-1 bg-indigo-600"></div>
    </Navbar>
  );
}
