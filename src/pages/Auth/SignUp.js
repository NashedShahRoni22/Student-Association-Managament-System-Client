import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";
import SmallSpinner from "../../components/Spinners/SmallSpinner";

export default function SignUp() {
  const { createUser, updateUser, loading } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigatae = useNavigate();
  const handleRegistration = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const password = form.password.value;
    const confirmpassword = form.confirmpassword.value;
    if (password !== confirmpassword) {
      setError("Password didn't match!");
    } else {
      setError("");
      createUser(email, password)
        .then(() => {
          toast.success("Registration Successfull!");
          userProfileUpdate(name);
          form.reset();
          navigatae("/sign-in");
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
          console.log(errorMessage);
        });
    }
  };
  //handel update user name
  const userProfileUpdate = (name) => {
    const profile = {
      displayName: name,
    };
    updateUser(profile)
      .then(() => {
        console.log("Profile updated!");
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <section className="h-[100vh] flex items-center justify-center rounded-xl">
      <form onSubmit={handleRegistration}>
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
            <Input
              name="name"
              type="text"
              label="Name"
              size="lg"
              color="indigo"
              required
            />
            <Input
              name="email"
              type="email"
              label="Email"
              size="lg"
              color="indigo"
              required
            />
            <Input
              name="password"
              type="password"
              label="Password"
              size="lg"
              color="indigo"
              required
            />
            <Input
              name="confirmpassword"
              type="password"
              label="Confirim Password"
              size="lg"
              color="indigo"
              required
            />
            {
              error && <p className="text-red-500">{error}</p>
            }
          </CardBody>
          <CardFooter className="pt-0">
            
            <Button color="indigo" fullWidth type="submit">
              {loading ? <SmallSpinner /> : "Sign Up"}
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/sign-in" className="ml-1 font-bold text-indigo-500">
                Sign in
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </form>
    </section>
  );
}
