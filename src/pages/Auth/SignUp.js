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
  const { createUser, updateUser, loading, setLoading, clubs } =
  useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  //handle user sign up
  const handleRegistration = (e) => {
    e.preventDefault();
    const form = e.target;
    const start_session = form.start_session.value;
    const end_session = form.end_session.value;
    const department = form.department.value;
    const name = form.name.value;
    //11 digit
    const id = form.id.value;
    const email = form.email.value;
    const club_name = form.club_name.value;
    const password = form.password.value;
    const confirmpassword = form.confirmpassword.value;
    const user = { start_session, end_session, department, name, email, id, club_name };
    if(id.length !== 11){
      setError("ID must be 11 digit!");
    }
    else if (password !== confirmpassword) {
      setError("Password didn't match!");
    } else {
      setError("");
      createUser(email, password)
        .then(() => {
          userProfileUpdate(name);
          saveUser(user);
          form.reset();
          navigate("/payment");
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
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

  //save user to db
  const saveUser = (user) => {
    fetch("https://sams-server.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <section className="banner flex items-center justify-center rounded-xl">
      <form onSubmit={handleRegistration}>
        <Card>
          <CardHeader
            variant="gradient"
            className="mb-4 grid h-28 place-items-center bg-[#463BFB]"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody>
            <div className="flex gap-4">
              <Input
                name="start_session"
                type="number"
                label="Start Session"
                size="lg"
                color="blue"
                required
              />
              <Input
                name="end_session"
                type="number"
                label="End Session"
                size="lg"
                color="blue"
                required
              />
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <Input
                name="department"
                type="text"
                label="Department"
                size="lg"
                color="blue"
                required
              />
              <Input
                name="name"
                type="text"
                label="Name"
                size="lg"
                color="blue"
                required
              />
              <Input
                name="id"
                type="number"
                label="ID"
                size="lg"
                color="blue"
                required
              />
              <Input
                name="email"
                type="email"
                label="Email"
                size="lg"
                color="blue"
                required
              />
              <div>
                <p className="text-sm text-red-500 font-semibold">
                  Select Club*
                </p>
                {/* Select Club */}
                <div className="inline-block relative w-full mt-4">
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-600"
                    id="select-option"
                    name="club_name"
                  >
                    {clubs.map((c, i) => (
                      <option key={i} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <Input
                name="password"
                type="password"
                label="Password"
                size="lg"
                color="blue"
                required
              />
              <Input
                name="confirmpassword"
                type="password"
                label="Confirim Password"
                size="lg"
                color="blue"
                required
              />
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </CardBody>
          <CardFooter className="pt-0">
            <Button className="bg-[#463BFB]" fullWidth type="submit">
              {loading ? <SmallSpinner /> : "Sign Up"}
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/sign-in" className="ml-1 font-bold text-[#463BFB]">
                Sign in
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </form>
    </section>
  );
}
