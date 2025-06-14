import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../redux/jobSlice";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job) || {};
  const { user } = useSelector((store) => store.auth) || {};

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application?.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied)


  const params = useParams();
  const dispatch = useDispatch();
  const jobId = params.id;

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true)
        const updatedSingleJob = {...singleJob, applications:[...singleJob.applications, {applicant: user._id}]}
        dispatch(setSingleJob(updatedSingleJob))
        toast.success(res.data.message);

      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        console.log("Fetching job with ID:", jobId);
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log("API Response:", res.data);
        if (res.data.success) {
          console.log("Dispatching job:", res.data.job);
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application=>application.applicant == user._id ))
        }
      } catch (error) {
        console.log("Error fetching job:", error);
        toast.error("Failed to fetch job details");
      }
    };

    if (jobId) {
      fetchSingleJob();
    }
  }, [jobId, dispatch]);

  if (!singleJob) {
    return <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg text-gray-500">Loading job details...</p>
    </div>; 
  }

    console.log(singleJob);
    console.log(singleJob.title);

  return (
    <div className="max-w-3xl mx-auto p-6">
  {/* Top Header Row */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div className="flex gap-2">
          <img className="w-8 h-8" src={singleJob?.company?.logo} alt="" />
    <h2 className="text-xl font-medium">{singleJob?.company?.companyName}</h2>
    </div>
    <Button
      onClick={isApplied ? null : applyJobHandler}
      disabled={isApplied}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer"
    >
      {isApplied ? "Already Applied" : "Apply Now"}
    </Button>
  </div>

  {/* Title & Job Type */}
  <div className="mt-6">
    <h2 className="text-2xl md:text-3xl font-semibold">{singleJob?.title}</h2>
    <div className="flex gap-3 mt-2 flex-wrap">
      <Badge className="text-sm bg-blue-600 text-white">Posted 3 days ago</Badge>
      <Badge className="text-sm bg-blue-600 text-white">{singleJob?.jobType}</Badge>
    </div>
  </div>

  {/* Description */}
  <div className="my-6">
    <h3 className="text-2xl font-semibold">Job Description</h3>
    <p className="mt-2 text-gray-800">{singleJob?.description}</p>
  </div>

  {/* Requirements */}
  <div className="my-6">
    <h3 className="text-2xl font-semibold">Requirements</h3>
    <ul className="list-disc pl-6 mt-2 text-gray-800">
      {singleJob?.requirements?.map((req, index) => (
        <li key={index}>{req}</li>
      ))}
    </ul>
  </div>

  {/* Other Details */}
  <div className="mt-6">
    <div className="flex flex-col gap-2 text-gray-800">
      <h5><span className="font-semibold">Role</span>: {singleJob?.title}</h5>
      <h5><span className="font-semibold">Location</span>: {singleJob?.location}</h5>
      <h5><span className="font-semibold">Required Experience</span>: {singleJob?.experienceLevel} {singleJob?.experienceLevel > 1 ? "Years" : "Year"}</h5>
      <h5><span className="font-semibold">Salary</span>: {singleJob?.salary} LPA</h5>
      <h5><span className="font-semibold">Total Applicants</span>: {singleJob?.applications?.length || 0}</h5>
    </div>
  </div>
</div>




  );
};

export default JobDescription;