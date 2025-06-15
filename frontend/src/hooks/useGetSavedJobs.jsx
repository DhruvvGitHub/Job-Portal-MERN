import axios from "axios";
import React, { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";

const useGetSavedJobs = () => {

    const {savedJobs} = useSelector(store=>store.job)

  useEffect(() => {
    const getSavedJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getsavedjobs`, {
          withCredentials: true,
        });
        if(res.data.success) {
            toast.success(res.data.message)
        }
      } catch (error) {
        console.log(error);
      }
    };
  });
};

export default useGetSavedJobs;