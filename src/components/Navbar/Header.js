import React, { useContext } from "react";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import RiseLoader from "react-spinners/RiseLoader";
import { Typewriter } from "react-simple-typewriter";

export default function Header({ openDrawer }) {
  const { user, logOut, signedInUser } = useContext(AuthContext);
  return (
    <div className="px-5 py-2 bg-white text-[#463BFB]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RiseLoader
            size={8}
            aria-label="Loading Spinner"
            data-testid="loader"
            color="#463BFB"
          />
          <Link
            to="/"
            className="text-xl mr-4 cursor-pointer py-1.5 font-extrabold text-blue-[#463BFB]"
          >
            SAMS
          </Link>
        </div>

        {signedInUser?.club_name && (
          <h5 className="text-2xl font-bold hidden md:block">
            Welcome to{" "}
            <Typewriter
              words={[`${signedInUser.club_name} Club`,]}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />{" "}
          </h5>
        )}
        <div className="flex items-center">
          {user?.uid ? (
            <Link
              className="mr-4 font-semibold text-sm bg-red-600 text-white px-2 py-1 rounded"
              onClick={logOut}
            >
              Sign Out
            </Link>
          ) : (
            <Link
              to="/sign-in"
              className="mr-4 font-semibold text-sm bg-white text-[#463BFB] px-2 py-1 rounded"
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
