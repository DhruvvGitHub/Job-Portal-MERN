import React, { useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";

const Jobs = () => {
  const {allJobs, searchQuery} = useSelector(store=>store.job)
  const [filterJobs, setFilterJobs] = useState(allJobs)

  useEffect(() => {
    if(searchQuery) {
      const filteredjobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())
      }) 
      setFilterJobs(filteredjobs)
    } else {
      setFilterJobs(allJobs)
    }
  },[allJobs, searchQuery])

  return (
    <div>
      <div className="flex">
        <div className="w-[20%]"> 
          <FilterCard />
        </div>
        <div className="flex-1">

          <div>
            <div className="grid grid-cols-2 gap-4">
              {filterJobs.map((job, index) => (
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
