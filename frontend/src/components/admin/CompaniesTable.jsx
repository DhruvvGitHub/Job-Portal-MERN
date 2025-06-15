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
import { setSsearchCompanyByText } from "../../redux/companySlice";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { allCompanies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(allCompanies);
  const navigate = useNavigate()

  useEffect(() => {
    const filteredCompanies =
      allCompanies.length >= 0 &&
      allCompanies.filter((company) => {
        if (!setSsearchCompanyByText) {
          return true;
        }
        return company.companyName
          .toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
      setFilterCompany(filteredCompanies)
  }, [allCompanies, searchCompanyByText]);

  return (
    <div>
      <Table>
        <TableCaption>
          A list of your all your registered companies.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCompanies?.length <= 0 ? (
            <span>You have not registered any company yet</span>
          ) : (
            filterCompany?.map((company, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={company.logo}
                        className="object-cover"
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell>{company.companyName}</TableCell>
                  <TableCell>
                    {" "}
                    {new Date(company.createdAt).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent>
                        <div onClick={()=> navigate(`/admin/companies/${company?._id}`)} className="flex items-center gap-2">
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

export default CompaniesTable;
