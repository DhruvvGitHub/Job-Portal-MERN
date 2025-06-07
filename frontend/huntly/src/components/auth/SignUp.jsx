import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed, EyeOff, LoaderCircle } from "lucide-react";
import { USER_API_END_POINT } from "../../utils/constant";
import axios from "axios"
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/userSlice";


const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loading = useSelector((store)=>store.auth.loading)
  const [hidePassword, sethidePassword] = useState(true);
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    profile: "",
  });

  const changeInputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log(input);
    const formData = new FormData()
    formData.append("fullName", input.fullName)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("password", input.password)
    formData.append("role", input.role)
    if(input.profile) {
        formData.append("profile", input.profile)
    }
    try {
        dispatch(setLoading(true))
        const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
            headers: {
                "Content-Type":"multipart/form-data"
            },
            withCredentials: true
        })
        if(res.data.success) {
            navigate("/login")
            toast.success(res.data.message)
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
    } finally {[
        dispatch(setLoading(false))
    ]}
  }

  return (
    <div>
      <div className="w-full flex items-center justify-center">
        <div className="py-2 px-4 border-1 border-zinc-200 w-2xl flex items-center justify-center select-none">
          <form onSubmit={submitHandler} action="" className="w-full">
            <h3 className="text-2xl font-medium mb-4">Sign Up</h3>
            <div className="flex flex-col gap-2">
              <div>
                <Label className="text-lg font-medium">Full Name</Label>
                <Input
                  type="text"
                  value={input.fullName}
                  name="fullName"
                  onChange={changeInputHandler}
                  placeholder="John Doe"
                  className="w-[90%]"
                ></Input>
              </div>
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
              <div>
                <Label className="text-lg font-medium">Phone Number</Label>
                <Input
                  type="text"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  onChange={changeInputHandler}
                  placeholder="9999999999"
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
                <Label className="text-lg font-medium">Choose A Role</Label>
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
              <div className="flex items-center gap-2">
                <Label className="text-lg font-medium">Profile Image</Label>
                <input
                  accept="image/*"
                  type="file"
                  onChange={changeFileHandler}
                  className="cursor-pointer border-2 p-2"
                />
              </div>
              {loading ? (
                <Button className="w-fit bg-blue-600">
                  {"Please wait"}
                  <LoaderCircle className="w-2 h-2 animate-spin" />{" "}
                </Button>
              ) : (
                <Button type="submit" className="w-fit bg-blue-600 cursor-pointer" > Sign Up </Button>
              )}
              <p className="mt-2">
                Already have an account?{" "}
                <Link to="/login" className="!text-blue-600">
                  Login
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
