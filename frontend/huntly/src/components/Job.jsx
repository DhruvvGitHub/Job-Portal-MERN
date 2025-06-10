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
        <p>{daysAgoFunction(job.createdAt) == 0 ? "Today" : `${daysAgoFunction(job.createdAt)} days ago`}</p>
        <Bookmark />
      </div>
      <div className="flex gap-4 items-center">
        <div>
          <img
            className="w-10 h-10 object-cover"
            src="data:image/png;base64,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"
            alt=""
          />
        </div>
        <div>
          <h5 className="text-lg font-medium">{job.company.companyName}</h5>
          <h6>{job.location}</h6>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold">{job.title}</h3>
        <h6>
          {job.description}
        </h6>
      </div>
      <div className="flex gap-3">
        <Badge variant="outline">{job.salary}</Badge>
        <Badge variant="outline">{job.jobType}</Badge>
        <Badge variant="outline">{job.positions} Positions</Badge>
      </div>
      <div className="flex gap-3">
        <Button
          onClick={() => navigate(`/description/${job._id}`)}
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