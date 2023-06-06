import React, { useContext, useState } from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";
import SmallSpinner from "../../components/Spinners/SmallSpinner";

export default function ApplyFestive() {
  const [loading, setLoading] = useState(false);

  const { signedInUser } = useContext(AuthContext);
  //adding activity
  const handleAddFestive = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const title = form.title.value;
    const location = form.location.value;
    const details = form.details.value;
    const festive_time = form.time.value;
    const festive_date = form.date.value;

    // Convert the time to AM/PM format
    const formattedTime = new Date(
      `01/01/2000 ${festive_time}`
    ).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    // Convert the date to DD:MM:YY format
    const formattedDate = new Date(festive_date).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

    const festiveData = {
      title,
      details,
      festive_location: location,
      festive_time: formattedTime,
      festive_date: formattedDate,
      club_name: signedInUser?.club_name,
    };
    fetch("https://sams-server.vercel.app/festive", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(festiveData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Festive request posted successfully!");
          setLoading(false);
          form.reset();
        }
      });
  };
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <form
        onSubmit={handleAddFestive}
        className="bg-white flex flex-col gap-4 p-4 w-full md:w-1/2 shadow-xl rounded-xl"
      >
        <p className="font-semibold text-[#463BFB]">Add festive request</p>
        <Input name="title" size="lg" label="Festive Title" />
        <Input name="location" size="lg" label="Required Location" />
        <div className="flex gap-2">
          <Input size="lg" name="date" type="date" variant="standard" />
          <Input size="lg" name="time" type="time" variant="standard" />
        </div>
        <Textarea size="lg" name="details" label="Festive Details" />
        <Button className="bg-[#463BFB]" type="submit">
          {loading ? <SmallSpinner/> : "Submit" }
        </Button>
      </form>
    </div>
  );
}
