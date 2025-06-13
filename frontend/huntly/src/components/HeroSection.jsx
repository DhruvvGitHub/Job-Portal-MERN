import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="header flex flex-col items-center gap-12">
          <div className="w-fit px-4 py-2 bg-gray-100 rounded-3xl shadow-lg">
            <h3 className="text-lg text-blue-600 font-medium">
              India's No.1 Job Hunt Website
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-medium">
              Find Your <span className="text-blue-600">Dream Job</span> Today
            </h1>
            <p className="text-md font-medium text-center">
              5 Lakh + Jobs to explore
            </p>
          </div>
          <div className="mb-8">
            <input type="text" onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search your dream jobs here" className="min-w-xl outline-none px-4 py-2 rounded-l-full bg-gray-100" />
            <Button className="bg-blue-600 rounded-r-full py-4">
              <Search />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
