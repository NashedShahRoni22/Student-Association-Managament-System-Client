import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import LoadingSpinner from "../../components/Spinners/LoadingSpinner";
import { toast } from "react-hot-toast";
import { Card, Typography } from "@material-tailwind/react";
import { AuthContext } from "../../context/AuthProvider";

const ClubMembers = () => {
  const { signedInUser } = useContext(AuthContext);
  const {
    isLoading,
    error,
    data: activities,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(
        `https://sams-server.vercel.app/user?club_name=${signedInUser?.club_name}`
      ).then((res) => res.json()),
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) return toast.error(error.message);

  const TABLE_HEAD = ["NAME", "ID", "EMAIL", "CLUB NAME", "ROLE","SESSION", "DEPARTMENT"];
  return (
    <div className="min-h-[100vh] bg-gray-200 pt-10">
      <Card className="mx-5 shadow-xl">
        <table className="w-full text-left overflow-x-auto">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    className="font-semibold text-[#463BFB]"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activities.map(
              ({ _id, id, name, email, club_name, isPresident, start_session,end_session, department  }) => (
                <tr key={_id} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {id}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {email}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {club_name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <p className="px-2 py-1 shadow-xl w-fit rounded-xl bg-[#463BFB] text-white">{isPresident ? "President" : "Member"}</p>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {start_session} to {end_session}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {department}
                    </Typography>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ClubMembers;
