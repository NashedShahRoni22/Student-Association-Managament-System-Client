import { Button, Card, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingSpinner from "../../components/Spinners/LoadingSpinner";
import { toast } from "react-hot-toast";

export default function FestiveRequest() {
  const TABLE_HEAD = ["", "Title", "Location", "Time", "Date", "Club", ""];
  const {
    isLoading,
    error,
    data: festives,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://sams-server.vercel.app/festive").then((res) => res.json()),
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) return toast.error(error.message);

  //approve festive
  const handleApprove = (_id) => {
    fetch(`https://sams-server.vercel.app/festive/${_id}`, {
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
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="mx-5 pt-10">
        <Card className="overflow-scroll h-full w-full">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, i) => (
                  <th
                    key={i}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {festives.map(
                (
                  {
                    _id,
                    title,
                    festive_location,
                    festive_time,
                    festive_date,
                    club_name,
                    isApprove,
                  },
                  index
                ) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index + 1}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {title}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {festive_location}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {festive_time}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {festive_date}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {club_name}
                      </Typography>
                    </td>
                    <td className="p-4">
                      {isApprove ? (
                        <p className="px-2 py-1 bg-green-500 w-fit rounded-xl uppercase text-white">Approved</p>
                      ) : (
                        <Button
                          size="sm"
                          className="bg-[#463BFB]"
                          onClick={() => handleApprove(_id)}
                        >
                            Approve
                        </Button>
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
