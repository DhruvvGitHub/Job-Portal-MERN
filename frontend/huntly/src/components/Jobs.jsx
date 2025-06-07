import React from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";

const jobsArray = [12, 3, 4, 54, 6, 7, 5];

const Jobs = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-[20%]"> 
          <FilterCard />
        </div>
        <div className="flex-1">

          <div>
            <div className="flex flex-wrap gap-6">
              {jobsArray.map((job, index) => (
                <div key={index}>
                  <Job />
                </div>
              ))}
            </div>
          </div>

        </div>
        
      </div>
    </div>
  );
};

export default Jobs;
