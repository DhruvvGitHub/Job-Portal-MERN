import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const {allAdminJobs, searchJobByText} = useSelector(
    (store) => store.job
  );
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate()

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return job?.title
          .toLowerCase()
          .includes(searchJobByText.toLowerCase()) || 
          job?.company?.companyName?.toLowerCase().includes(searchJobByText.toLowerCase())
      });
      setFilterJobs(filteredJobs)
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>
          A list of your all your registered jobs.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.length <= 0 ? (
           <TableRow>
    <TableCell colSpan={4} className="text-center">
      You have not created any job yet
    </TableCell>
  </TableRow>
          ) : (
            filterJobs?.map((job, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={job?.company?.logo}
                        className="object-cover"
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell>{job?.company?.companyName}</TableCell>
                  <TableCell>{job?.title}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent>
                        <div onClick={()=> navigate(`/admin/jobs/${job?._id}`)} className="flex items-center gap-2">
                          <Edit size={20} />
                          <span>Edit</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
