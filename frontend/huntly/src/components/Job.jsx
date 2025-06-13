import { Bookmark } from "lucide-react";
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime)
    const currentTime = new Date()
    const timeDifference = currentTime - createdAt
    return Math.floor(timeDifference/ (100*60*60*24))
  }
  
    return (
    <div className="max-w-88 border-2 px-4 py-4 flex flex-col gap-4">
      <div className="flex items-center justify-between font-medium">
        <p>{daysAgoFunction(job?.createdAt) == 0 ? "Today" : `${daysAgoFunction(job.createdAt)} days ago`}</p>
        <Bookmark />
      </div>
      <div className="flex gap-4 items-center">
        <div>
          <img
            className="w-10 h-10 object-cover"
            src={job?.company?.logo}
            alt=""
          />
        </div>
        <div>
          <h5 className="text-lg font-medium">{job?.company?.companyName}</h5>
          <h6>{job?.location}</h6>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold">{job?.title}</h3>
        <h6>
          {job?.description}
        </h6>
      </div>
      <div className="flex gap-3">
        <Badge variant="outline">{job?.salary}</Badge>
        <Badge variant="outline">{job?.jobType}</Badge>
        <Badge variant="outline">{job?.positions} Positions</Badge>
      </div>
      <div className="flex gap-3">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="cursor-pointer"
        >
          Details
        </Button>
        <Button className="bg-blue-600 cursor-pointer">Save for later</Button>
      </div>
    </div>
  );
}

export default Job;