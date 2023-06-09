import React, { Fragment, useContext, useState } from "react";
import LoadingSpinner from "../../components/Spinners/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import SmallSpinner from "../../components/Spinners/SmallSpinner";

const RecentActivity = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const date = new Date().toLocaleDateString("de-DE");
  const time = new Date().toLocaleTimeString();
  const { signedInUser } = useContext(AuthContext);
  //adding activity
  const handleAddactivity = (e) => {
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
        const activity = {
          image: imageData.data.display_url,
          title,
          details,
          time,
          date,
          club_name: signedInUser?.club_name,
        };
        form.reset();
        addactivity(activity);
      })
      .catch((e) => console.log(e));
  };

  //save activity post in DB
  const addactivity = (activity) => {
    fetch("https://sams-server.vercel.app/activity", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(activity),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Activity added successfully!");
          setLoading(false);
          setSelectedImage("");
          refetch();
        }
      });
  };

  //get activities from DB
  const {
    isLoading,
    error,
    data: activities,
    refetch,
  } = useQuery({
    queryKey: ["activityData"],
    queryFn: () =>
      fetch(
        `https://sams-server.vercel.app/activity?club_name=${signedInUser?.club_name}`
      ).then((res) => res.json()),
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) return toast.error(error.message);

  const TABLE_HEAD = ["Image", "TITLE", "POST TIME", "POST DATE", "ACTION"];

  //delete activity
  const handleDelete = (title, _id) => {
    const agree = window.confirm(`Are you sure to delete ${title}`);
    if (agree) {
      fetch(`https://sams-server.vercel.app/activity/${_id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.error(`${title} deleted successfully!`);
            refetch();
          }
        });
    }
  };
  return (
    <div className="min-h-[100vh] bg-gray-200">
      {signedInUser?.isPresident && (
        <>
          <div className="py-10 mx-5">
            <p className="text-2xl lg:text-3xl font-extrabold text-[#463BFB]">
              Add Activity
            </p>
            <div className="lg:flex gap-16">
              <Card className="shadow-xl mt-10 lg:w-1/2">
                <form onSubmit={handleAddactivity}>
                  <CardBody className="flex flex-col gap-4">
                    <div className="flex flex-col items-center justify-center p-4 border-2 border-[#463BFB] border-dashed rounded-md">
                      <div>
                        {selectedImage ? (
                          <img
                            src={URL.createObjectURL(selectedImage)}
                            className="h-[150px] w-[150px] border mb-3"
                            alt="selected-img"
                          />
                        ) : (
                          <PhotoIcon className="h-[150px] w-[150px] text-[#463BFB]" />
                        )}
                      </div>
                      <label
                        htmlFor="activity-image"
                        className="text-black font-semibold px-4 py-2 cursor-pointer shadow rounded hover:shadow-[#463BFB]"
                      >
                        Choose Image
                      </label>
                      <input
                        id="activity-image"
                        name="image"
                        type="file"
                        onChange={(e) => setSelectedImage(e.target.files[0])}
                        className="hidden"
                      />
                    </div>
                    <Input
                      required
                      label="Title"
                      size="lg"
                      name="title"
                      color="blue"
                    />
                    <Textarea
                      label="Details"
                      size="lg"
                      name="details"
                      color="blue"
                      required
                    />
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button className="bg-[#463BFB]" type="submit" fullWidth>
                      {loading ? <SmallSpinner /> : "Add activity"}
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
                            className="font-semibold text-[#463BFB]"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {activities?.map(({ title, image, _id, time, date }) => (
                      <tr key={_id} className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                          <Avatar src={image} alt="avatar" />
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
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {date}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Button
                            size="sm"
                            color="red"
                            onClick={() => handleDelete(title, _id)}
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
      <p className="ml-5 pt-5 text-2xl lg:text-3xl font-extrabold text-[#463BFB]">
        All Activities
      </p>
      {activities?.length === 0 ? (
        <p className="bg-white m-5 text-3xl rounded-xl text-center py-20 font-bold text-red-500 shadow-xl">
          No Activites Found
        </p>
      ) : (
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {activities?.map((activity, i) => (
            <Card className="w-96" key={activity._id}>
              <CardHeader color="blue-gray" className="relative h-56">
                <img
                  src={activity.image}
                  alt="activity-img"
                  layout="fill"
                  className="h-full w-full"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" className="text-[#463BFB]">
                  {activity.title}
                </Typography>
                <Typography className=" font-semibold text-sm">
                  Activity Date: {activity.date}
                </Typography>

                <Typography className="mt-2  font-semibold text-sm">
                  Activity Time: {activity.time}
                </Typography>
                <Fragment>
                  <Button
                    onClick={handleOpen}
                    size="sm"
                    className="mt-3 bg-[#463BFB]"
                  >
                    Details
                  </Button>
                  <Dialog open={open} handler={handleOpen}>
                    <DialogHeader className="text-xl">Details</DialogHeader>
                    <DialogBody divider className="text-sm font-semibold">
                      <Typography variant="h5" className="text-[#463BFB]">
                        Title: {activity.title}
                      </Typography>
                      <Typography className="text-[#463BFB] text-sm font-semibold">
                        Details: <br /> {activity.details}
                      </Typography>
                      <Typography className="mt-3 font-semibold text-sm">
                        Notice Date: {activity.date}
                      </Typography>

                      <Typography className="mt-3  font-semibold text-sm">
                        Notice Time: {activity.time}
                      </Typography>
                    </DialogBody>
                    <DialogFooter>
                      <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                        size="sm"
                      >
                        <span>Cancel</span>
                      </Button>
                    </DialogFooter>
                  </Dialog>
                </Fragment>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
