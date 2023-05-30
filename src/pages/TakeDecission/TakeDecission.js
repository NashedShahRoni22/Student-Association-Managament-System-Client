import React, { useContext } from "react";
import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { AuthContext } from "../../context/AuthProvider";
import { PlusIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";

const TakeDecission = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const { signedInUser } = useContext(AuthContext);
  const {
    name,
    id,
    department,
    start_session,
    end_session,
    email,
    club_name,
    _id,
  } = signedInUser;
  const candidateInfo = {
    name,
    std_id:id,
    department,
    start_session,
    end_session,
    email,
    club_name,
    unique_id:_id,
  };
  const handleBecomePresident = (candidateInfo) => {
    fetch("http://localhost:5000/decision", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(candidateInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Request added successfully!");
          setOpen(!open)
          // refetch();
        }
      })
      .catch((e) => console.error(e));
  };
  return (
    <div className="mx-5 min-h-[100vh]">
      <div className="my-10">
        <p className="text-2xl lg:text-3xl font-extrabold text-white">
          Take Decision
        </p>
      </div>
      <Fragment>
        <Button
          onClick={handleOpen}
          className="cursor-pointer bg-white border-2 border-[#463BFB] border-dashed w-fit"
        >
          <PlusIcon className="h-24 text-[#463BFB]" />
        </Button>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader className="text-xl">
            Become {club_name} Club President
          </DialogHeader>
          <DialogBody divider className="text-sm font-semibold">
            <p>Name: {name}</p>
            <p>ID: {id}</p>
            <p>Department: {department}</p>
            <p>
              Session: {start_session} to {end_session}
            </p>
            <p>Email: {email}</p>
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
            <Button
              onClick={() => handleBecomePresident(candidateInfo)}
              size="sm"
              variant="gradient"
              color="green"
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>
    </div>
  );
};

export default TakeDecission;
