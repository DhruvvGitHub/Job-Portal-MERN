import { Badge } from "./ui/badge"
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "./ui/table"

const dummyJobs = [1,2,34,4,5]

const AppliedJobs = () => {
  return (
    <div>
        <div>
            <Table>
                <TableCaption>List of all applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        dummyJobs.map((item, index) => {
                            return <TableRow key={index}>
                                <TableCell>15-03-2024</TableCell>
                                <TableCell>Frontend Developer</TableCell>
                                <TableCell>Google</TableCell>
                                <TableCell className="text-right"><Badge>Selected</Badge></TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </div>
    </div>
  )
}

export default AppliedJobs