import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import React from "react";
import ImportantImage from "../../images/important.jpg";
import { PhotoIcon } from "@heroicons/react/24/solid";


export default function UpcomingNotices() {
  return (
    <div>
      <div className="my-10 mx-5">
        <p className="text-2xl lg:text-3xl font-extrabold text-indigo-500">Add Notices</p>
        <div className="lg:flex gap-16">
          <div className="hidden lg:block">
            <img
              src={ImportantImage}
              alt=""
              className=""
            />
          </div>
          <Card className="my-10 lg:w-1/2">
            <CardBody className="flex flex-col gap-4">
              <div className="flex justify-center p-8 border border-indigo-500 hover:border-transparent hover:shadow cursor-pointer hover:shadow-indigo-500 rounded-md">
                <PhotoIcon className="h-6 w-6 text-indigo-500" />
                <label for="notice-image" className="text-black font-semibold ml-1">Choose Image</label>
                <input id="notice-image" type="file" className="hidden" />
              </div>
              <Input label="Title" size="lg" color="indigo" />
              <Textarea label="Details" size="lg" color="indigo" />
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" color="indigo" fullWidth>
                Add Notices
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
