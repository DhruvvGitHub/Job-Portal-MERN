import React from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";

const Jobs = () => {
  const allJobs = useSelector(store=>store.job.allJobs)
  console.log(allJobs);

  return (
    <div>
      <div className="flex">
        <div className="w-[20%]"> 
          <FilterCard />
        </div>
        <div className="flex-1">

          <div>
            <div className="grid grid-cols-2 gap-4">
              {allJobs.map((job, index) => (
                <div key={index}>
                  <Job job={job} />
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
