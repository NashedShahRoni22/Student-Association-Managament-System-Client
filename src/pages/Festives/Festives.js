import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingSpinner from "../../components/Spinners/LoadingSpinner";
import { toast } from "react-hot-toast";

export default function Festives() {
  const {
    isLoading,
    error,
    data: festives,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://sams-server.vercel.app/festive").then((res) => res.json()),
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) return toast.error(error.message);
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="mx-5 pt-10">
        <p className="text-[#463BFB] font-bold text-3xl">
          Upcoming Festivals
        </p>
        <div className="mt-10 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {festives
            .filter((f) => f.isApprove === true)
            .map((festive) => (
              <div
                key={festive._id}
                className="font-semibold bg-white p-4 shadow-xl rounded-r-xl border-l-4 border-[#463BFB]"
              >
                <p>Title: {festive.title}</p>
                <p>Location: {festive.festive_location}</p>

                <p>Club Name: {festive.club_name}</p>
                <p>Festive details: {festive.details}</p>
                <div className="md:flex justify-between">
                  <p>Time: {festive.festive_time}</p>
                  <p>Date: {festive.festive_date}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
