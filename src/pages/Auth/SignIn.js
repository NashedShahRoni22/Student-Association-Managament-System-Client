import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import SmallSpinner from "../../components/Spinners/SmallSpinner";

export default function SignIn() {
  const { loginUser, loading, setLoading } = useContext(AuthContext);
  //private route setup
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  //handel user login
  const handelUserLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then((res) => {
        toast.success("Login Successfull!");
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
        navigate("/sign-up");
      });
  };
  return (
    <section className="h-[100vh] flex items-center justify-center">
      <form onSubmit={handelUserLogin}>
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            className="mb-4 grid h-28 place-items-center bg-[#463BFB]"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              type="email"
              name="email"
              label="Email"
              size="lg"
              color="blue"
              required
            />
            <Input
              type="password"
              name="password"
              label="Password"
              size="lg"
              color="blue"
              required
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button className="bg-[#463BFB]" fullWidth type="submit">
              {loading ? <SmallSpinner /> : "Sign In"}
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/sign-up" className="ml-1 font-bold text-[#463BFB]">
                Sign up
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </form>
    </section>
  );
}
