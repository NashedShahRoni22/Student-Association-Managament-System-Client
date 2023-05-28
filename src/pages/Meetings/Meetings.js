import React, { useContext, useState } from "react";
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
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Meetings = () => {
  const [loading, setLoading] = useState(false);
  const date = new Date().toLocaleDateString("de-DE");
  const time = new Date().toLocaleTimeString();
  const [value, onChange] = useState("10:00");
  const [meetingDate, setMeetingDate] = useState(new Date());
  const { signedInUser } = useContext(AuthContext);
  //adding activity
  const handleAddactivity = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const title = form.title.value;
    const details = form.details.value;
    const metting_src = form.metting_src.value;
    const metting_time = value;
    const meeting_date = meetingDate.toLocaleDateString("de-DE");
    const postTime = time;
    const postDate = date;
    const meetingData = {
      title,
      details,
      metting_time,
      meeting_date,
      metting_src,
      postTime,
      postDate,
      club_name: signedInUser?.club_name,
    };
    addMeeting(meetingData);
  };

  //   save activity post in DB
  const addMeeting = (meetingData) => {
    fetch("http://localhost:5000/meetings", {
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
        `http://localhost:5000/meetings?club_name=${signedInUser?.club_name}`
      ).then((res) => res.json()),
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) return toast.error(error.message);

  const TABLE_HEAD = [
    "TITLE",
    "DETAILS",
    "MEETING TIME",
    "MEETING DATE",
    "POST TIME",
    "POST DATE",
    "ACTION",
  ];

  //delete activity
  //   const handleDelete = (title, _id) => {
  //     const agree = window.confirm(`Are you sure to delete ${title}`);
  //     if (agree) {
  //       fetch(`http://localhost:5000/activity/${_id}`, {
  //         method: "DELETE",
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           if (data.deletedCount > 0) {
  //             toast.error(`${title} deleted successfully!`);
  //             refetch();
  //           }
  //         });
  //     }
  //   };
  return (
    <div className="mx-5 min-h-[100vh] p-10 rounded-xl">
      {signedInUser?.isPresident && (
        <>
          <div className="mb-10">
            <p className="text-2xl lg:text-3xl font-extrabold text-white">
              Add Activity
            </p>
            <div className="lg:flex gap-16">
              <Card className="shadow-xl mt-10 lg:w-1/3">
                <form onSubmit={handleAddactivity}>
                  <CardBody className="flex flex-col gap-4">
                    <div className="flex gap-4 items-center">
                      <div>
                        <TimePicker
                          amPmAriaLabel="Select AM/PM"
                          onChange={onChange}
                          value={value}
                          className="w-1/2 text-center text-lg h-[40px]"
                        />
                      </div>
                      <div>
                        <DatePicker
                          selected={meetingDate}
                          onChange={(date) => setMeetingDate(date)}
                          className="border border-[#463BFB] w-full text-lg h-[40px] text-center"
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
                      ({ _id, title, details, metting_time, meeting_date }) => (
                        <tr key={_id} className="even:bg-blue-gray-50/50">
                          <td className="p-4">{title}</td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {details}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {metting_time}
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
          </div>
          <div></div>
        </>
      )}
      <p className="text-2xl lg:text-3xl font-extrabold text-white">
        All Meetings
      </p>
      {meetings?.length === 0 ? (
        <p className="bg-white mt-5 text-3xl rounded-xl text-center py-20 font-bold text-red-500 shadow-xl">
          No Activites Found
        </p>
      ) : (
        <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {meetings?.map((activity) => (
            <Card className="w-96" key={activity._id}>
              <CardBody>
                <div className="flex justify-between">
                  <div>
                    <Typography variant="h5" className="text-[#463BFB]">
                      {activity.title}
                    </Typography>
                    <Typography variant="md" className="text-[#463BFB]">
                      {activity.details}
                    </Typography>
                  </div>
                  <Typography variant="md" className="text-[#463BFB]">
                    {activity.metting_src}
                  </Typography>
                </div>

                <div className="flex justify-between">
                  <div className="flex justify-between items-end mt-3">
                    <div>
                      <Typography className=" font-semibold text-sm">
                        {activity.metting_time}
                      </Typography>

                      <Typography className="mt-2  font-semibold text-sm">
                        {activity.meeting_date}
                      </Typography>
                    </div>
                  </div>
                  <div className="flex justify-between items-end mt-3">
                    <div>
                      <Typography className=" font-semibold text-sm">
                        {activity.postDate}
                      </Typography>

                      <Typography className="mt-2  font-semibold text-sm">
                        {activity.postTime}
                      </Typography>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Meetings;
