import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Popover } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector(store => store.auth)

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div>
          <h2 className="text-2xl font-semibold">
            Hunt<span className="text-blue-600">ly</span>
          </h2>
        </div>
        <div className="flex items-center gap-5">
          <ul className="flex items-center gap-5">
            <li className="font-medium cursor-pointer"><Link className="!text-black" to="/">Home</Link></li>
            <li className="font-medium cursor-pointer"><Link className="!text-black" to="/jobs">Jobs</Link></li>
            <li className="font-medium cursor-pointer"><Link className="!text-black" to="/Browse">Browse</Link></li>
          </ul>
          <div className="flex items-center gap-2">
                      {
            user ? (
                        <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-60 bg-white px-4 py-2 rounded-md shadow-2xl border-0">
              <div>
                <div className="flex gap-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3>Dhruv Tanwani</h3>
                    <p className="text-sm">Here will be my bio</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <UserRound />
                    <Button variant="link">
                      <Link to="/profile">
                      Profile
                      </Link>
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <LogOut />
                    <Button variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
            ): (
              <>
              <Link to="/login">
              <Button className="default-button">Login</Button>
              </Link>
              <Link to="/signup">
              <Button className="bg-blue-600">SignUp</Button>
              </Link>
              </>
            )
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
