import axios from "axios";
import { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constant";
import { setallAdminJobs } from "../redux/jobSlice";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        console.log("Fetching admin jobs from:", `${JOB_API_END_POINT}/getadminjobs`);
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });
        console.log("Admin jobs API response:", res);
        if (res.data.success) {
          console.log("Dispatching jobs to Redux:", res.data.jobs);
          dispatch(setallAdminJobs(res.data.jobs));
        } else {
          console.log("API call was not successful:", res.data);
        }
      } catch (error) {
        console.error("Error fetching admin jobs:", error);
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
        }
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;
