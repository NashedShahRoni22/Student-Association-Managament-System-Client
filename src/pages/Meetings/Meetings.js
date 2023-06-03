import React, { Fragment, useContext, useState } from "react";
import LoadingSpinner from "../../components/Spinners/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import SmallSpinner from "../../components/Spinners/SmallSpinner";


const Meetings = () => {
  const [loading, setLoading] = useState(false);
  const date = new Date().toLocaleDateString("de-DE");
  const time = new Date().toLocaleTimeString();

  const { signedInUser } = useContext(AuthContext);

  //adding activity
  const handleAddactivity = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const title = form.title.value;
    const details = form.details.value;
    const metting_src = form.metting_src.value;
    const meeting_time = form.meeting_time.value;
    const meeting_date = form.meeting_date.value;
    const postTime = time;
    const postDate = date;

    // Convert the time to AM/PM format
    const formattedTime = new Date(
      `01/01/2000 ${meeting_time}`
    ).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    // Convert the date to DD:MM:YY format
    const formattedDate = new Date(meeting_date).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

    const meetingData = {
      title,
      details,
      meeting_time: formattedTime,
      meeting_date: formattedDate,
      metting_src,
      postTime,
      postDate,
      club_name: signedInUser?.club_name,
    };
    addMeeting(meetingData);
  };

  //   save activity post in DB
  const addMeeting = (meetingData) => {
    fetch("https://sams-server.vercel.app/meetings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(meetingData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Meetings added successfully!");
          setLoading(false);
          refetch();
        }
      });
  };

  //get activities from DB
  const {
    isLoading,
    error,
    data: meetings,
    refetch,
  } = useQuery({
    queryKey: ["activityData"],
    queryFn: () =>
      fetch(
        `https://sams-server.vercel.app/meetings?club_name=${signedInUser?.club_name}`
      ).then((res) => res.json()),
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) return toast.error(error.message);

  const TABLE_HEAD = [
    "TITLE",
    "MEETING SRC",
    "MEETING TIME",
    "MEETING DATE",
    "POST TIME",
    "POST DATE",
    "ACTION",
  ];

  // delete meeting
  const handleDelete = (title, _id) => {
    const agree = window.confirm(`Are you sure to delete ${title}`);
    if (agree) {
      fetch(`https://sams-server.vercel.app/meetings/${_id}`, {
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
    <div className="bg-gray-200 min-h-[100vh]">
      {signedInUser?.isPresident && (
        <>
          <div className="py-10 mx-5">
            <p className="text-2xl lg:text-3xl font-extrabold text-[#463BFB]">
              Schedule Meeting
            </p>
            <div className="lg:flex gap-16">
              <Card className="shadow-xl mt-10 lg:w-1/3">
                <form onSubmit={handleAddactivity}>
                  <CardBody className="flex flex-col gap-4">
                    <div className="md:flex gap-4 justify-between">
                      <div className="w-full">
                        <p className="text-xs font-semibold">
                          Enter meeting date
                        </p>
                        <Input
                          type="date"
                          name="meeting_date"
                          variant="standard"
                        />
                      </div>
                      <div className="w-full">
                        <p className="text-xs font-semibold mt-3 md:mt-0">
                          Enter meeting time
                        </p>
                        <Input
                          type="time"
                          name="meeting_time"
                          variant="standard"
                        />
                      </div>
                    </div>
                    <Input
                      required
                      label="Meeting room or link"
                      size="lg"
                      name="metting_src"
                      type="text"
                      color="blue"
                    />
                    <Input
                      required
                      label="Title"
                      size="lg"
                      type="text"
                      name="title"
                      color="blue"
                    />
                    <Textarea
                      label="Details"
                      size="lg"
                      name="details"
                      type="text"
                      color="blue"
                      required
                    />
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button className="bg-[#463BFB]" type="submit" fullWidth>
                      {loading ? <SmallSpinner /> : "fix meeting"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
              <Card className="shadow-xl mt-10 lg:w-2/3 overflow-x-auto h-full w-full">
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
                    {meetings?.map(
                      ({
                        _id,
                        title,
                        meeting_time,
                        meeting_date,
                        metting_src,
                      }) => (
                        <tr key={_id} className="even:bg-blue-gray-50/50">
                          <td className="p-4">{title}</td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {metting_src}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {meeting_time}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {meeting_date}
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
                      )
                    )}
                  </tbody>
                </table>
              </Card>
            </div>
          </div>
          <div></div>
        </>
      )}
      <p className="ml-5 pt-5 text-2xl lg:text-3xl font-extrabold text-[#463BFB]">
        All Meetings
      </p>
      {meetings?.length === 0 ? (
        <p className="bg-white m-5 text-3xl rounded-xl text-center py-20 font-bold text-red-500 shadow-xl">
          No Meetings Found
        </p>
      ) : (
        <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {meetings?.map((activity) => (
            <Card className="w-96 relative" key={activity._id}>
              <CardBody>
                <div className="">
                  <Typography variant="h5" className="text-[#463BFB]">
                    {activity.title}
                  </Typography>
                  <Typography className="text-sm font-semibold text-[#463BFB]">
                    Room or Link: {activity.metting_src}
                  </Typography>
                </div>

                <div className="flex justify-between mt-3">
                  <div className="">
                    <Typography className=" font-semibold text-sm">
                      Meeting Date: {activity.meeting_date}
                    </Typography>

                    <Typography className="mt-2  font-semibold text-sm">
                      Meeting Time: {activity.meeting_time}
                    </Typography>
                  </div>
                  <div className="">
                    <Typography className=" font-semibold text-sm">
                      Post Date: {activity.postDate}
                    </Typography>

                    <Typography className="mt-2  font-semibold text-sm">
                      Post Date: {activity.postTime}
                    </Typography>
                  </div>
                </div>
              </CardBody>
              <div className="rounded-full absolute h-8 w-8 bg-[#463BFB] bottom-0 right-0"></div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Meetings;
