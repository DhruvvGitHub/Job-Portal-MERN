import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/userSlice";
import { clearSavedJobs } from "../../redux/jobSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.auth.loading);
  const user = useSelector((store) => store.auth.user);
  const [hidePassword, sethidePassword] = useState(true);

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeInputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);

    try {
        const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
            headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    dispatch(setLoading(true));
      if (res.data.success) {
        dispatch(clearSavedJobs());
        dispatch(setUser(res.data.user))
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if(user) {
      navigate("/")
    }
  })

  return (
    <div> 
      <div className="w-full flex items-center justify-center">
        <div className="py-2 px-4 border-1 border-zinc-200 w-2xl flex items-center justify-center">
          <form onSubmit={submitHandler} autoComplete="off" action="" className="w-full">
            <h3 className="text-2xl font-medium mb-4">Login</h3>
            <div className="flex flex-col gap-2">
              <div>
                <Label className="text-lg font-medium">Email</Label>
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeInputHandler}
                  placeholder="johndoe@example.com"
                  className="w-[90%]"
                ></Input>
              </div>
              <div className="relative">
                <Label className="text-lg font-medium">Password</Label>
                <div
                  onClick={() => sethidePassword(!hidePassword)}
                  className="bg-red-400"
                >
                  {hidePassword ? (
                    <Eye className="absolute top-1/2 left-[85%]" />
                  ) : (
                    <EyeOff className="absolute top-1/2 left-[85%]" />
                  )}
                </div>
                <Input
                  type={`${hidePassword ? "password" : "text"}`}
                  value={input.password}
                  name="password"
                  onChange={changeInputHandler}
                  placeholder="A Strong Password"
                  className="w-[90%]"
                ></Input>
              </div>
              <div className="flex gap-4">
                <div className="flex gap-1">
                  <Input
                    type="radio"
                    id="r1"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeInputHandler}
                    className="w-auto"
                  />
                  <Label className="text-lg font-medium" htmlFor="r1">
                    Student
                  </Label>
                </div>

                <div className="flex gap-1">
                  <Input
                    type="radio"
                    id="r2"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeInputHandler}
                    className="w-auto"
                  />
                  <Label className="text-lg font-medium" htmlFor="r2">
                    Recruiter
                  </Label>
                </div>
              </div>

              {loading ? (
                <Button className="w-fit bg-blue-600">
                  {"Please wait"}
                  <LoaderCircle className="w-2 h-2 animate-spin" />{" "}
                </Button>
              ) : (
                <Button type="submit" className="w-fit bg-blue-600 cursor-pointer" > Login </Button>
              )}
              <p className="mt-2">
                Don't have an account?{" "}
                <Link to="/signup" className="!text-blue-600">
                  Sign Up
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
