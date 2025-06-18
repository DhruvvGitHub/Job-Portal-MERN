import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Popover } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound, LogOut, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { logoutUser } from "../../redux/userSlice";
import { toast } from "sonner";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMobileMenu, setshowMobileMenu] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(logoutUser());
        navigate("/");
        toast.success(res.data.message);
      }

      // Optionally dispatch logout in Redux or redirect user
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response.data.mesaage);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between px-8 py-6 mb-4 bg-white">
        <div>
          <h2 className="text-2xl font-bold">
            Hunt<span className="text-blue-600">ly</span>
          </h2>
        </div>
        <div className="flex items-center gap-5">
          <div className="">
            <Menu
              onClick={() => setshowMobileMenu(!showMobileMenu)}
              className="md:hidden"
            />
            <AnimatePresence>
              {showMobileMenu && (
                <motion.div
                initial={{ opacity: 0, y: -50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0, y: -50 }}
                className="mobileMenu w-full h-screen absolute top-0 left-0 z-10 px-8 py-6 bg-white"
              >
                <div className="h-full flex flex-col">
                  <motion.div className="flex justify-end">
                    <X
                      onClick={() => setshowMobileMenu(!showMobileMenu)}
                      size={30}
                      className="cursor-pointer"
                    />
                  </motion.div>
                  <div className="flex-1 flex justify-center items-center overflow-y-auto">
                    <ul className="p-4 space-y-4 rounded-md">
                      {user && user.role === "recruiter" ? (
                        <>
                          <li className="font-medium cursor-pointer">
                            <Link
                              className="!text-black text-2xl"
                              to="/admin/companies"
                            >
                              Companies
                            </Link>
                          </li>
                          <li className="font-medium cursor-pointer">
                            <Link
                              className="!text-black text-2xl"
                              to="/admin/jobs"
                            >
                              Jobs
                            </Link>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="font-medium cursor-pointer">
                            <Link className="!text-black text-2xl" to="/">
                              Home
                            </Link>
                          </li>
                          <li className="font-medium cursor-pointer">
                            <Link className="!text-black text-2xl" to="/jobs">
                              Jobs
                            </Link>
                          </li>
                          <li className="font-medium cursor-pointer">
                            <Link className="!text-black text-2xl" to="/Browse">
                              Browse
                            </Link>
                          </li>
                          <li className="font-medium cursor-pointer">
                            <Link className="!text-black text-2xl" to="/saved">
                              Saved Jobs
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
          <div className="hidden md:flex">
            <ul className="flex items-center gap-5">
              {user && user.role == "recruiter" ? (
                <>
                  <li className="font-medium cursor-pointer">
                    <Link className="!text-black" to="/admin/companies">
                      Companies
                    </Link>
                  </li>
                  <li className="font-medium cursor-pointer">
                    <Link className="!text-black" to="/admin/jobs">
                      Jobs
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="font-medium cursor-pointer">
                    <Link className="!text-black" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="font-medium cursor-pointer">
                    <Link className="!text-black" to="/jobs">
                      Jobs
                    </Link>
                  </li>
                  <li className="font-medium cursor-pointer">
                    <Link className="!text-black" to="/Browse">
                      Browse
                    </Link>
                  </li>
                  <li className="font-medium cursor-pointer">
                    <Link className="!text-black" to="/saved">
                      Saved Jobs
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user.profile.profilePhoto}
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-60 bg-white px-4 py-2 rounded-md shadow-2xl border-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <Avatar className="cursor-pointer border-2">
                        <AvatarImage
                          src={user.profile.profilePhoto}
                          alt="@shadcn"
                        />
                        <AvatarFallback>
                          <img
                            src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                            alt=""
                          />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3>{user?.fullName || "ok"}</h3>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-col gap-2">
                      {user && user.role == "student" && (
                        <div className="flex items-center gap-1">
                          <UserRound />
                          <Button variant="outline">
                            <Link to="/profile">Profile</Link>
                          </Button>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <LogOut />
                        <Button
                          variant="outline"
                          onClick={logoutHandler}
                          className="cursor-pointer"
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <>
                <Link to="/login">
                  <Button className="default-button">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-blue-600">SignUp</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
