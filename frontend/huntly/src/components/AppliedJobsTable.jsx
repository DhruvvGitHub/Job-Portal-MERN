import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const AppliedJobsTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div>
      <div className="overflow-x-auto">
        <Table className="overflow-x-auto">
          <TableCaption >List of all applied jobs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-sm md:text-lg font-semibold">Applied On</TableHead>
              <TableHead className="text-sm md:text-lg font-semibold">Job Role</TableHead>
              <TableHead className="text-sm md:text-lg font-semibold">Company</TableHead>
              <TableHead className="text-sm md:text-lg font-semibold text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppliedJobs.length == 0 ? (
              <span>You have not applied any jobs.</span>
            ) : (
              allAppliedJobs.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell>{item.job.title}</TableCell>
                    <TableCell>{item?.job?.company?.companyName}</TableCell>
                   <TableCell>
  <div className="text-right">
    <Badge
      className={
        item.status === "reject"
          ? "bg-red-500"
          : item.status === "accept"
          ? "bg-green-500"
          : "bg-yellow-500"
      }
    >
      {item.status === "reject"
        ? "Rejected"
        : item.status === "accept"
        ? "Accepted"
        : "Pending"}
    </Badge>
  </div>
</TableCell>

                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppliedJobsTable;
