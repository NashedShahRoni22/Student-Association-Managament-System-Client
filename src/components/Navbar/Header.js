import React, { useContext } from "react";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function Header({ openDrawer }) {
  const { user, logOut, signedInUser } = useContext(AuthContext);
  return (
    <div className="px-4 py-2 text-white">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="text-xl mr-4 cursor-pointer py-1.5 font-extrabold text-blue-[#463BFB]"
        >
          SAMS
        </Link>
        {signedInUser?.club_name && (
          <h5 className="text-2xl font-semibold hidden md:block">
            Welcome to {signedInUser.club_name} Club
          </h5>
        )}
        <div className="flex items-center">
          {user?.uid ? (
            <Link
              className="mr-4 font-bold bg-red-600 text-white px-4 py-2 rounded"
              onClick={logOut}
            >
              Sign Out
            </Link>
          ) : (
            <Link
              to="/sign-in"
              className="mr-4 font-bold bg-white text-[#463BFB] px-4 py-2 rounded"
            >
              Sign In
            </Link>
          )}

          <Bars3CenterLeftIcon
            onClick={openDrawer}
            className="h-8 w-8 cursor-pointer lg:hidden"
            strokeWidth={2}
          />
        </div>
      </div>
    </div>
  );
}
