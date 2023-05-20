import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
  } from "@material-tailwind/react";
import { Link } from "react-router-dom";
  
  export default function SignUp() {
    return (
      <section className="h-[100vh] flex items-center justify-center bg-indigo-200 rounded-xl">
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="indigo"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Name" size="lg" color="indigo" />
            <Input label="Email" size="lg" color="indigo" />
            <Input label="Password" size="lg" color="indigo" />
            <Input label="Confirim Password" size="lg" color="indigo" />
          </CardBody>
          <CardFooter className="pt-0">
            <Button color="indigo" fullWidth>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link
              to='/sign-in'
                className="ml-1 font-bold text-indigo-500"
              >
                Sign in
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </section>
    );
  }
  