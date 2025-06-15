import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "../../redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Filter by Name"
          className="border-2 px-1 rounded-md"
        />
        <Button
          onClick={() => navigate("/admin/jobs/create")}
          className="bg-blue-600 cursor-pointer"
        >
          Create New Job
        </Button>
      </div>
      <div>
        <h2 className="text-xl font-semibold">All Jobs</h2>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
