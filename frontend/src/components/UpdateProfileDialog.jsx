import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,

  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { LoaderCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../utils/constant";
import {setLoading, setUser} from "../redux/userSlice.js"

const UpdateProfileDialog = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const loading = useSelector((store) => store.auth.loading);
  const dispatch = useDispatch()

  const [input, setInput] = useState({
    fullName: user?.fullName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    resume: user?.resume,
  });

  const changeInputHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
  const file = e.target.files?.[0];
  if (file) {
    setInput({ ...input, file });
  }
};


  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("bio", input.bio)
    formData.append("skills", input.skills)
    if(input.file) {
        formData.append("file", input.file)
    }

    try {
        dispatch(setLoading(true));
        const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
            headers: {
                "Content-type":"multipart/form-data"
            },
            withCredentials: true
        })
        if(res.data.success) {
            dispatch(setUser(res.data.user))
            toast.success(res.data.message)
        }
    } catch (error) {
        console.log(error);
        toast.error(error.reponse.data.message)
    } finally {
        dispatch(setLoading(false))
    }
    setOpen(false)
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle className="text-xl">Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler} action="">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-2">
                <Label className="text-lg">Name</Label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={input.fullName}
                  onChange={changeInputHandler}
                  className="border rounded-md px-2 py-1"
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <Label className="text-lg">Email</Label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={input.email}
                  onChange={changeInputHandler}
                  className="border rounded-md px-2 py-1"
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <Label className="text-lg">Phone Number</Label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeInputHandler}
                  className="border rounded-md px-2 py-1"
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <Label className="text-lg">Bio</Label>
                <input
                  type="text"
                  name="bio"
                  id="bio"
                  value={input.bio}
                  onChange={changeInputHandler}
                  className="border rounded-md px-2 py-1"
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <Label className="text-lg">Skills</Label>
                <input
                  type="text"
                  name="skills"
                  id="skills"
                  value={input.skills}
                  onChange={changeInputHandler}
                  className="border rounded-md px-2 py-1"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-lg">Resume</Label>
                <input type="file" name="resume" id="resume" accept="application/pdf" onChange={changeFileHandler} />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-fit bg-blue-600">
                  {"Please wait"}
                  <LoaderCircle className="w-2 h-2 animate-spin" />{" "}
                </Button>
              ) : (
                <Button
                  type="submit"
                  onClick={submitHandler}
                  className="w-fit bg-blue-600 cursor-pointer"
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;