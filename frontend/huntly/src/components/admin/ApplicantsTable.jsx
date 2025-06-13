import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const applicantStatus = ["Accept", "Reject"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if(res.data.success) {
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>
          A list of all applied applicants for this job
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.applicant.fullName}</TableCell>
                <TableCell>{item.applicant.email}</TableCell>
                <TableCell>{item.applicant.phoneNumber}</TableCell>
                <TableCell>
                  {item.applicant.profile.resume ? (
                    <a href={item.applicant.profile.resume}>
                      {item.applicant.profile.resumeOriginalName}
                    </a>
                  ) : (
                    <span>N/A</span>
                  )}
                </TableCell>
                <TableCell>
                  {" "}
                  {new Date(item.applicant.createdAt).toLocaleDateString(
                    "en-GB"
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="flex flex-col gap-3">
                        {applicantStatus.map((status, index) => (
                          <div
                            key={index}
                            onClick={() =>statusHandler(status, item._id)}
                            className="w-32 border-2 px-2 py-1 rounded-md cursor-pointer"
                          >
                            {status}
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          <tr></tr>
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
