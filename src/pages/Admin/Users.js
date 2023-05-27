import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingSpinner from "../../components/Spinners/LoadingSpinner";
import { toast } from "react-hot-toast";
import { Button, Card, Typography } from "@material-tailwind/react";

const Users = () => {
  const {
    isLoading,
    error,
    data: activities,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("http://localhost:5000/user").then((res) => res.json()),
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) return toast.error(error.message);

  const TABLE_HEAD = ["NAME", "ID", "EMAIL", "CLUB NAME", "ROLE", "DELETE"];

  const handleUpdateRole = (_id) => {
    fetch(`http://localhost:5000/user/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.acknowledged){
            refetch();
        };
      });
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
            {activities.map(
              ({ _id, id, name, email, club_name, isPresident }) => (
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
                    {isPresident ? (
                      "President"
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
                      // onClick={() => handleDelete(title, _id)}
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
