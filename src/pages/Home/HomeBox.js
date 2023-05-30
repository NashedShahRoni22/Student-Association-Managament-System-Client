import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import {
  BellIcon,
  TrophyIcon,
  ChatBubbleLeftRightIcon,
  RssIcon,
  GiftTopIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/solid";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function HomeBox() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10">
      {/* Upcoming Notices */}
      <Card className="border-4 border-l-[#463BFB] group relative hover:translate-y-2 duration-300 ease-in-out">
        <CardBody className="flex flex-col items-center">
          <BellIcon className="border-2 border-transparent p-2 rounded-full group-hover:border-[#463BFB] h-16 w-16 text-[#463BFB]" />
          
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-2 text-center"
          >
            Upcoming <br /> Notices
          </Typography>
          <Link to="/upcoming-notices" className="inline-block">
            <Button
              size="sm"
              variant="text"
              className="flex items-center gap-2 text-[#463BFB]"
            >
              View Details
              <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
            </Button>
          </Link>
        </CardBody>
      </Card>
      {/* Ours Activity */}
      <Card className="border-4 border-l-[#463BFB] group relative hover:translate-y-2 duration-300 ease-in-out">
        <CardBody className="flex flex-col items-center">
          <TrophyIcon className="border-2 border-transparent p-2 rounded-full group-hover:border-[#463BFB] h-16 w-16 text-[#463BFB]" />
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-2 text-center"
          >
            Recent <br /> Activities
          </Typography>
          <Link to="/recent-activity" className="inline-block">
            <Button
              size="sm"
              variant="text"
              className="flex items-center gap-2 text-[#463BFB]"
            >
              View Details
              <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
            </Button>
          </Link>
        </CardBody>
      </Card>
      {/* Upcoming Meetings */}
      <Card className="border-4 border-l-[#463BFB] group relative hover:translate-y-2 duration-300 ease-in-out">
        <CardBody className="flex flex-col items-center">
          <ChatBubbleLeftRightIcon className="border-2 border-transparent p-2 rounded-full group-hover:border-[#463BFB] h-16 w-16 text-[#463BFB]" />
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-2 text-center"
          >
            Upcoming <br /> Meetings
          </Typography>
          <Link to="/upcoming-meeetings" className="inline-block">
            <Button
              size="sm"
              variant="text"
              className="flex items-center gap-2 text-[#463BFB]"
            >
              View Details
              <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
            </Button>
          </Link>
        </CardBody>
      </Card>
      {/* Give Donation */}
      <Card className="border-4 border-l-[#463BFB] group relative hover:translate-y-2 duration-300 ease-in-out">
        <CardBody className="flex flex-col items-center">
          <GiftTopIcon className="border-2 border-transparent p-2 rounded-full group-hover:border-[#463BFB] h-16 w-16 text-[#463BFB]" />
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-2 text-center"
          >
            Add <br /> Donation
          </Typography>
          <a href="/" className="inline-block">
            <Button
              size="sm"
              variant="text"
              className="flex items-center gap-2 text-[#463BFB]"
            >
              View Details
              <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
            </Button>
          </a>
        </CardBody>
      </Card>
      {/* Our Blogs */}
      <Card className="border-4 border-l-[#463BFB] group relative hover:translate-y-2 duration-300 ease-in-out">
        <CardBody className="flex flex-col items-center">
          <RssIcon className="border-2 border-transparent p-2 rounded-full group-hover:border-[#463BFB] h-16 w-16 text-[#463BFB]" />
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-2 text-center"
          >
            Our <br /> Blogs
          </Typography>
          <a href="/" className="inline-block">
            <Button
              size="sm"
              variant="text"
              className="flex items-center gap-2 text-[#463BFB]"
            >
              View Details
              <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
            </Button>
          </a>
        </CardBody>
      </Card>
      {/* Add Suggestion*/}
      <Card className="border-4 border-l-[#463BFB] group relative hover:translate-y-2 duration-300 ease-in-out">
        <CardBody className="flex flex-col items-center">
          <ChatBubbleBottomCenterIcon className="border-2 border-transparent p-2 rounded-full group-hover:border-[#463BFB] h-16 w-16 text-[#463BFB]" />
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-2 text-center"
          >
            Take <br /> Decission
          </Typography>
          <Link to="/take-decision" className="inline-block">
            <Button
              size="sm"
              variant="text"
              className="flex items-center gap-2 text-[#463BFB]"
            >
              Add Details
              <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
            </Button>
          </Link>
        </CardBody>
      </Card>
      
    </section>
  );
}
