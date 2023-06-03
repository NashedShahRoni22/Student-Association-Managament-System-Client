import { useQuery } from "@tanstack/react-query";
import React  from "react";
import LoadingSpinner from "../../components/Spinners/LoadingSpinner";
import { toast } from "react-hot-toast";
import { Button, Card, Typography } from "@material-tailwind/react";

const Users = () => {
  const {
    isLoading,
    error,
    data: users,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://sams-server.vercel.app/user").then((res) => {
        res.json();
      }),
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) return toast.error(error.message);

  const TABLE_HEAD = [
    "NAME",
    "ID",
    "EMAIL",
    "SESSION",
    "DEPARTMENT",
    "CLUB NAME",
    "ROLE",
    "ACTION",
  ];

  //update user role
  const handleUpdateRole = (_id) => {
    fetch(`https://sams-server.vercel.app/user/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          refetch();
        }
      });
  };
  //delete user
  const handleDelete = (name, _id) => {
    const agree = window.confirm(`Are you sure to delete ${name}`);
    if (agree) {
      fetch(`https://sams-server.vercel.app/user/${_id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.error(`${name} deleted successfully!`);
            refetch();
          }
        });
    }
  };
  return (
    <div className="mx-5 min-h-[100vh]">
      <Card className="shadow-xl mt-10 overflow-x-auto w-full">
        <table className="w-full min-w-max text-left overflow-x-hidden">
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
            {users
              .filter((user) => user.name !== "admin")
              .map(
                ({
                  _id,
                  id,
                  name,
                  email,
                  club_name,
                  isPresident,
                  start_session,
                  end_session,
                  department,
                }) => (
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
                      {isPresident ? (
                        <p className="px-4 py-2 shadow-xl w-fit rounded-xl bg-[#463BFB] text-white">
                          President
                        </p>
                      ) : (
                        <Button
                          size="sm"
                          color="green"
                          onClick={() => handleUpdateRole(_id)}
                        >
                          Make President
                        </Button>
                      )}
                    </td>
                    <td className="p-4">
                      <Button
                        size="sm"
                        color="red"
                        onClick={() => handleDelete(name, _id)}
                      >
                        Delete
                      </Button>
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

export default Users;
