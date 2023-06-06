import { Button, Input } from "@material-tailwind/react";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function AddClub() {
  const { clubs } = useContext(AuthContext);
  const navigate = useNavigate();
  //add club
  const handleAddClub = (e) => {
    e.preventDefault();
    const club_name = e.target.club_name.value;
    fetch("https://sams-server-nsrarvi.vercel.app/clubs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name: club_name }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Club name added successfully!");
          e.target.reset();
          navigate('/')
        }
      });
  };
  //delete club
  const handleDelete = (club) => {
    const agree = window.confirm(`Are you sure to delete ${club.name}`);
    if (agree) {
      fetch(`https://sams-server-nsrarvi.vercel.app/clubs/${club._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.error(`${club.name} deleted successfully!`);
            navigate('/')
          }
        });
    }
  };
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="mx-5 pt-10">
        <form
          onSubmit={handleAddClub}
          className="h-fit w-3/4 md:w-1/2 bg-white p-6 rounded-xl shadow-xl"
        >
          <p className="font-semibold text-[#463BFB] mb-3">
            ***Add Club Name only
          </p>
          <Input
            placeholder="Enter Club Name"
            variant="standard"
            name="club_name"
            className="focus:outline-[#463BFB]"
          />
          <Button type="submit" className="bg-[#463BFB] mt-5 w-full">
            Add Club
          </Button>
        </form>
        <p className="text-xl font-semibold text-[#463BFB] mt-10">
          Total  {clubs.length} Clubs
        </p>
        <div className="mt-5 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {clubs?.map((club) => (
            <div key={club._id} className="p-4 flex justify-between items-center rounded-xl hover:shadow-xl bg-white">
              <p>
                {club.name}
              </p>
              <button onClick={()=> handleDelete(club)} className="hover:bg-red-100 p-2 rounded-full">
                <TrashIcon className="text-red-500 h-6"/>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
