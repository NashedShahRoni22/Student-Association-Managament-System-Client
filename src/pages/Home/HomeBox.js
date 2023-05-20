import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import {
  BellIcon,
  TrophyIcon,
  ChatBubbleLeftRightIcon,
  RssIcon,
} from "@heroicons/react/24/solid";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function HomeBox() {
  return (
    <section className="grid lg:grid-cols-2 gap-4 my-10">
      {/* Upcoming Notices */}
      <Card className="shadow-indigo-500 hover:shadow-current group relative hover:translate-y-2 duration-300 ease-in-out">
        <CardBody>
          <BellIcon className="group-hover:border-2 rounded-full p-2 h-16 group-hover:border-indigo-500 w-16 text-indigo-500 absolute right-1 bottom-1" />
          <BellIcon className="border-2 p-2 group-hover:border-transparent rounded-full border-indigo-500 h-16 w-16 text-indigo-600" />
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Upcoming <br /> Notices
          </Typography>
          <Link to="/upcoming-notices" className="inline-block">
            <Button
              size="sm"
              variant="text"
              className="flex items-center gap-2 text-indigo-500"
            >
              View Details
              <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
            </Button>
          </Link>
        </CardBody>
      </Card>
      {/* Ours Activity */}
      <Card className="shadow-indigo-500 hover:shadow-current  group relative hover:translate-y-2 duration-300 ease-in-out">
        <CardBody>
          <TrophyIcon className="group-hover:border-2 rounded-full p-2 h-16 group-hover:border-indigo-500 w-16 text-indigo-500 absolute right-1 bottom-1" />
          <TrophyIcon className="border-2 p-2 group-hover:border-transparent rounded-full border-indigo-500 h-16 w-16 text-indigo-600" />
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Recent <br /> Activities
          </Typography>
          <a href="/" className="inline-block">
            <Button
              size="sm"
              variant="text"
              className="flex items-center gap-2 text-indigo-500"
            >
              View Details
              <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
            </Button>
          </a>
        </CardBody>
      </Card>
      {/* Upcoming Meetings */}
      <Card className="shadow-indigo-500 hover:shadow-current  group relative hover:translate-y-2 duration-300 ease-in-out">
        <CardBody>
          <ChatBubbleLeftRightIcon className="group-hover:border-2 rounded-full p-2 h-16 group-hover:border-indigo-500 w-16 text-indigo-500 absolute right-1 bottom-1" />
          <ChatBubbleLeftRightIcon className="border-2 p-2 group-hover:border-transparent rounded-full border-indigo-500 h-16 w-16 text-indigo-600" />
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Upcoming <br></br> Meetings
          </Typography>
          <a href="/" className="inline-block">
            <Button
              size="sm"
              variant="text"
              className="flex items-center gap-2 text-indigo-500"
            >
              View Details
              <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
            </Button>
          </a>
        </CardBody>
      </Card>
      {/* Our Blogs */}
      <Card className="shadow-indigo-500 hover:shadow-current group relative hover:translate-y-2 duration-300 ease-in-out">
        <CardBody>
          <RssIcon className="group-hover:border-2 rounded-full p-2 h-16 group-hover:border-indigo-500 w-16 text-indigo-500 absolute right-1 bottom-1" />
          <RssIcon className="border-2 p-2 group-hover:border-transparent rounded-full border-indigo-500 h-16 w-16 text-indigo-600" />
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Our <br></br> Blogs
          </Typography>
          <a href="/" className="inline-block">
            <Button
              size="sm"
              variant="text"
              className="flex items-center gap-2 text-indigo-500"
            >
              View Details
              <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
            </Button>
          </a>
        </CardBody>
      </Card>
    </section>
  );
}
