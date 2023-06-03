import React, { useContext } from "react";
import { Fragment, useState } from "react";
import {
  Button,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Textarea,
} from "@material-tailwind/react";

import { PlusIcon, PhotoIcon } from "@heroicons/react/24/outline";
import SmallSpinner from "../../components/Spinners/SmallSpinner";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Spinners/LoadingSpinner";

const Blogs = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const date = new Date().toLocaleDateString("de-DE");
  const time = new Date().toLocaleTimeString();
  const { signedInUser } = useContext(AuthContext);
  //get notices from DB
  const {
    isLoading,
    error,
    data: blogs,
    refetch,
  } = useQuery({
    queryKey: ["noticeData"],
    queryFn: () =>
      fetch(
        `http://localhost:5000/blog`
      ).then((res) => res.json()),
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) return toast.error(error.message);

  //add blogs
  const handleAddBlog = (e) => {
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
        const blog = {
          image: imageData.data.display_url,
          title,
          details,
          time,
          date,
          club_name: signedInUser?.club_name,
        };
        form.reset();
        addBlog(blog);
      })
      .catch((e) => console.log(e));
  };

  //save notice post in DB
  const addBlog = (blog) => {
    fetch("http://localhost:5000/blog", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(blog),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Blog added successfully!");
          setLoading(false);
          setSelectedImage("");
          setOpen(!open);
          refetch();
        }
      });
  };

  return (
    <div className="bg-gray-200 min-h-screen relative">
      <button
        className="bg-[#463BFB] rounded-full text-white absolute right-5 bottom-5"
        onClick={handleOpen}
      >
        <PlusIcon className="h-16" />
      </button>
      <Fragment>
        <Dialog open={open} handler={handleOpen} size="lg">
          <form onSubmit={handleAddBlog}>
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
                  htmlFor="notice-image"
                  className="text-black font-semibold cursor-pointer px-4 py-2 shadow rounded hover:shadow-[#463BFB]"
                >
                  Choose Image
                </label>
                <input
                  id="notice-image"
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
            <CardFooter className="pt-0 flex justify-end">
              <Button
                variant="text"
                color="red"
                onClick={() => handleOpen(null)}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button className="bg-[#463BFB]" type="submit">
                {loading ? <SmallSpinner /> : "Add Blog"}
              </Button>
            </CardFooter>
          </form>
        </Dialog>
      </Fragment>
      <p className="text-3xl mx-5 font-bold pt-10 text-[#463BFB]">Blogs from different club</p>
      <div className="mx-5 pt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((b) => (
          <div key={b._id} className="flex shadow-xl rounded-xl bg-white">
            <div>
              <img src={b.image} alt="blog_img" className="h-[150px] w-[150px] rounded-l-xl" />
            </div>
            <div className="p-4 font-semibold text-sm">
              <p>Title: {b.title}</p>
              <p>Post Time: {b.time}</p>
              <p>Post Date: {b.date}</p>
              <p>Club Name: {b.club_name}</p>
              <p>Details: {b.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
