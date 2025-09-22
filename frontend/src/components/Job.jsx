import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSavedJobs } from "../redux/jobSlice";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime)
    const currentTime = new Date()
    const timeDifference = currentTime - createdAt
    return Math.floor(timeDifference/ (100*60*60*24))
  }

  const saveJobHandler = async() => {
    try {
      const res = await axios.post(`${JOB_API_END_POINT}/save`, 
        { jobId: job._id },
        { withCredentials: true }
      )
      if(res.data.success) {
        dispatch(setSavedJobs(res.data.savedJobs))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to save job")
    }
  }
  
    return (
    <div className="max-w-80 md:max-w-88 border-2 px-4 py-4 flex flex-col gap-4 bg-white shadow-2xl">
      <div className="flex items-center justify-between font-medium">
        {/* <p>{daysAgoFunction(job?.createdAt) == 0 ? "Today" : `${daysAgoFunction(job.createdAt)} days ago`}</p> */}

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
       <h6 className="truncate">{job?.description}</h6>

      </div>
      <div className="flex gap-3 flex-wrap">
        <Badge variant="outline">{job?.salary} LPA</Badge>
        <Badge variant="outline">{job?.jobType}</Badge>
        <Badge variant="outline">{job?.positions} Positions</Badge>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="cursor-pointer"
        >
          Details
        </Button>
        <Button onClick={saveJobHandler} className="bg-blue-600 cursor-pointer">Save for later</Button>
      </div>
    </div>
  );
}

export default Job;