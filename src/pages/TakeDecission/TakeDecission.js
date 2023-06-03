import React, { useContext, useEffect } from "react";
import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { AuthContext } from "../../context/AuthProvider";
import { PlusIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Spinners/LoadingSpinner";

const TakeDecission = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [votes, setVotes] = useState([]);

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
    std_id: id,
    department,
    start_session,
    end_session,
    email,
    club_name,
    unique_id: _id,
  };
  //get votes
  useEffect(() => {
    fetch(`http://localhost:5000/vote?club_name=${signedInUser?.club_name}`)
      .then((res) => res.json())
      .then((data) => setVotes(data));
  });
  //post request
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
          setOpen(!open);
          refetch();
        } else {
          toast.error(data.message);
          setOpen(!open);
        }
      });
  };
  //get notices from DB
  const {
    isLoading,
    error,
    data: decisions,
    refetch,
  } = useQuery({
    queryKey: ["decisonData"],
    queryFn: () =>
      fetch(
        `http://localhost:5000/decision?club_name=${signedInUser?.club_name}`
      ).then((res) => res.json()),
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) return toast.error(error.message);
  //handle Add Decision
  const handleAddDecision = (e) => {
    e.preventDefault();
    const form = e.target;
    const user_name = name;
    const user_email = email;
    const club_name = signedInUser?.club_name;
    const candidate_name = form.candidate_name.value;
    const candidate_email = form.candidate_email.value;
    const decison = form.decison.value;

    const decisionData = {
      user_name,
      user_email,
      candidate_name,
      candidate_email,
      decison,
      club_name,
    };
    fetch("http://localhost:5000/vote", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(decisionData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Vote added successfully!");
          refetch();
          form.reset();
        } else {
          toast.error(data.message);
        }
      });
  };
  return (
    <div className="min-h-[100vh] bg-gray-200">
      <div className="md:flex gap-8 mx-5">
        {decisions.length < 4 && (
          <div className="my-10">
            <p className="text-2xl lg:text-3xl font-extrabold text-[#463BFB] mb-5">
              Become President
            </p>
            <Button
              onClick={handleOpen}
              className="cursor-pointer bg-white border-2 border-[#463BFB] border-dashed w-fit"
            >
              <PlusIcon className="h-24 text-[#463BFB]" />
            </Button>
            <Fragment>
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
                    className="bg-[#463BFB]"
                  >
                    <span>Confirm</span>
                  </Button>
                </DialogFooter>
              </Dialog>
            </Fragment>
          </div>
        )}

        <div className="my-10 flex-1">
          <p className="text-2xl lg:text-3xl font-extrabold text-[#463BFB]">
            {decisions.length} President Candidate
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 mt-5">
            {decisions.map(
              ({
                _id,
                name,
                std_id,
                department,
                email,
                start_session,
                end_session,
              }) => (
                <Card
                  key={_id}
                  className="relative p-4 bg-white text-sm font-semibold text-black"
                >
                  <p className="mt-4">Candidate Name: {name}</p>
                  <p>Candidate Id: {std_id}</p>
                  <p>Department: {department}</p>
                  <p>Email: {email}</p>
                  <p>
                    Session: {start_session} to {end_session}
                  </p>
                  <div className="rounded-full absolute h-8 w-8 bg-[#463BFB] top-0 left-0"></div>
                </Card>
              )
            )}
          </div>
        </div>
      </div>
      <p className="mx-5 text-2xl lg:text-3xl font-extrabold text-[#463BFB]">
        Members Decisions:
      </p>
      <div className="my-10 md:flex gap-8 mx-5">
        <Card className="p-4 md:w-1/2 lg:w-1/3">
          <form onSubmit={handleAddDecision}>
            <div className="mb-4 flex flex-col gap-6">
              <p className="font-bold text-[#463BFB]">Enter Your Decision</p>
              <Input
                required
                size="lg"
                type="text"
                name="candidate_name"
                label="Candidate Name"
              />
              <Input
                required
                size="lg"
                type="email"
                name="candidate_email"
                label="Candidate Email"
              />
              <Textarea
                required
                type="text"
                size="lg"
                name="decison"
                label="Decison"
              />
              <Button className="bg-[#463BFB]" fullWidth type="submit">
                SUBMIT
              </Button>
            </div>
          </form>
        </Card>
        <div className="w-full mt-5 md:mt-0 grid md:grid-cols-2 lg:grid-cols-3">
          {votes?.map((v) => (
            <div
              key={v._id}
              className="relative h-fit bg-white p-4 rounded-xl text-sm font-semibold"
            >
              <p>Student Name: {v.user_name}</p>
              <p>Student Email: {v.user_email}</p>
              <p>Candidate Name: {v.candidate_name}</p>
              <p>Candidate Email{v.candidate_email}</p>
              <p>Decision: {v.decison}</p>
              <div className="rounded-full absolute h-8 w-8 bg-[#463BFB] bottom-0 right-0"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TakeDecission;
