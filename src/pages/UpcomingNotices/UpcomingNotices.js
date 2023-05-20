import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import SmallSpinner from "../../components/Spinners/SmallSpinner";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Spinners/LoadingSpinner";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function UpcomingNotices() {
  const [loading, setLoading] = useState(false);
  const time = new Date();
  const { user } = useContext(AuthContext);
  //adding notice
  const handleAddNotice = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const image = form.image.files[0];
    const title = form.title.value;
    const details = form.details.value;
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=a375baaa0ac7c9e83ca494f73c2dfe49`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const notice = {
          image: imageData.data.display_url,
          title,
          details,
          time,
        };
        form.reset();
        addNotice(notice);
      })
      .catch((e) => console.log(e));
  };

  //save notice post in DB
  const addNotice = (notice) => {
    fetch("http://localhost:5000/notices", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(notice),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Notice added successfully!");
          setLoading(false);
          refetch();
        }
      });
  };

  //get notices from DB
  const {
    isLoading,
    error,
    data: notices,
    refetch,
  } = useQuery({
    queryKey: ["noticeData"],
    queryFn: () =>
      fetch("http://localhost:5000/notices").then((res) => res.json()),
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;

  const TABLE_HEAD = ["ID", "TITLE", "DATE", "ACTION"];

  return (
    <div className="mx-5">
      {user?.displayName === "manager" && (
        <>
          <div className="my-10 bg-white/90 p-8 rounded-lg">
            <p className="text-2xl lg:text-3xl font-extrabold text-indigo-500">
              Add Notices
            </p>
            <div className="lg:flex gap-16">
              <Card className="shadow-xl mt-10 lg:w-1/2">
                <form onSubmit={handleAddNotice}>
                  <CardBody className="flex flex-col gap-4">
                    <label
                      htmlFor="notice-image"
                      className="flex justify-center p-8 border border-indigo-500 hover:border-transparent hover:shadow cursor-pointer hover:shadow-indigo-500 rounded-md"
                    >
                      <PhotoIcon className="h-6 w-6 text-indigo-500" />
                      <p className="text-black font-semibold ml-1">
                        Choose Image
                      </p>
                      <input
                        id="notice-image"
                        name="image"
                        type="file"
                        className="hidden"
                      />
                    </label>
                    <Input
                      required
                      label="Title"
                      size="lg"
                      name="title"
                      color="indigo"
                    />
                    <Textarea
                      label="Details"
                      size="lg"
                      name="details"
                      color="indigo"
                      required
                    />
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button
                      variant="gradient"
                      color="indigo"
                      type="submit"
                      fullWidth
                    >
                      {loading ? <SmallSpinner /> : "Add Notices"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
              <Card className="shadow-xl mt-10 lg:w-1/2 overflow-x-auto h-full w-full">
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
                            color="indigo"
                            className="font-semibold"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {notices.map(({ title, _id, time }, index) => (
                      <tr key={_id} className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {_id}
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
                            {time}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Button
                            size="sm"
                            color="red"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          </div>
          <div></div>
        </>
      )}
      <div className="my-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
        {notices.map((notice) => (
          <Card className="w-96" key={notice._id}>
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                src={notice.image}
                alt="notice-img"
                layout="fill"
                className="h-full w-full"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="indigo">
                {notice.title}
              </Typography>
              <Typography className="text-justify my-3">
                {notice.details.slice(0, 250)}...
                <Link className="text-indigo-500 font-semibold">Details</Link>
              </Typography>
              <Typography className="text-indigo-500 font-medium">
                {notice.time}
              </Typography>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
