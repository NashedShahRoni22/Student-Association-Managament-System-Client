import React, { useState, useEffect, useContext } from "react";
import { CalendarDaysIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../../context/AuthProvider";

import ClockLoader from "react-spinners/ClockLoader";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const {clubs} = useContext(AuthContext);
  const currentDate = new Date().toLocaleDateString("de-DE");
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="border-4 border-l-[#463BFB] lg:flex gap-4 shadow-xl bg-white rounded-xl items-center justify-center p-8">
        <div>
          {/* <ClockIcon className="h-12 text-[#463BFB]"/> */}
          <ClockLoader
          color="#463BFB"
            size={45}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        <h1 className="text-xl font-bold mt-2 lg:mt-0">{time.toLocaleTimeString()}</h1>
      </div>
      <div className="border-4 border-l-[#463BFB] lg:flex gap-4 shadow-xl bg-white rounded-xl items-center justify-center p-8">
        <div>
          <CalendarDaysIcon className="h-12 text-[#463BFB]"/>
        </div>
        <h1 className="text-xl font-bold">{currentDate}</h1>
      </div>
      <div className="border-4 border-l-[#463BFB] lg:flex gap-4 shadow-xl bg-white rounded-xl items-center justify-center p-8">
        <div>
          <UserGroupIcon className="h-12 text-[#463BFB]"/>
        </div>
        <h1 className="text-xl font-bold">{clubs.length} Clubs</h1>
      </div>
      <div className="border-4 border-l-[#463BFB] lg:flex gap-4 shadow-xl bg-white rounded-xl items-center justify-center p-8">
        <div>
          <UserIcon className="h-12 text-[#463BFB]"/>
        </div>
        <h1 className="text-xl font-bold">100 Users</h1>
      </div>
    </div>
  );
};

export default Clock;
