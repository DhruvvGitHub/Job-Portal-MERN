import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = () => {
    dispatch(setSearchQuery(query))
    navigate("/browse")
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="header flex flex-col items-center gap-12">
          <div className="w-fit px-4 py-2 bg-white rounded-3xl shadow-lg">
            <h3 className="text-lg text-blue-600 font-medium">
              India's No.1 Job Hunt Website
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-medium text-center sm:text-6xl">

              Find Your <span className="text-blue-600">Dream Job</span> Today
            </h2>
            <p className="text-md font-medium text-center">
              5 Lakh + Jobs to explore
            </p>
          </div>
          <div className="mb-8 flex items-center">
            <input type="text" onChange={(e) => setQuery(e.target.value)} placeholder="Search your dream jobs here" className="w-2xs outline-none px-4 py-2 rounded-l-full bg-white md:min-w-xl" />
            <Button onClick={searchJobHandler} className="bg-blue-600 rounded-r-full py-4 cursor-pointer">
              <Search />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
