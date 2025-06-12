import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

const CreateJob = () => {
  const { allCompanies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    positions: 0,
    companyId: "",
  });

  const changeInputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = allCompanies.find(
      (company) => company.companyName.toLowerCase() == value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };
  //   this is handler for select tag in which we are selecting companies

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.respone.data.message);
    } finally {
      setLoading(true);
    }
    console.log(input);
  };

  return (
    <div>
      <div>
        <h2 className="my-6 text-2xl font-medium">Create New Job</h2>
        <form onSubmit={submitHandler} action="">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="text-lg">Job Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeInputHandler}
                placeholder="Enter Job title"
                className="w-fit focus-none"
              ></Input>
            </div>
            <div>
              <Label className="text-lg">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeInputHandler}
                placeholder="Enter Job description"
                className="w-fit focus-none"
              ></Input>
            </div>
            <div>
              <Label className="text-lg">Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeInputHandler}
                placeholder="Enter Job requirements"
                className="w-fit focus-none"
              ></Input>
            </div>
            <div>
              <Label className="text-lg">Salary (in LPA)</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeInputHandler}
                placeholder="Enter Job salary"
                className="w-fit focus-none"
              ></Input>
            </div>
            <div>
              <Label className="text-lg">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeInputHandler}
                placeholder="Enter Job location"
                className="w-fit focus-none"
              ></Input>
            </div>
            <div>
              <Label className="text-lg">Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeInputHandler}
                placeholder="Enter Job type"
                className="w-fit focus-none"
              ></Input>
            </div>
            <div>
              <Label className="text-lg">Experience</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeInputHandler}
                placeholder="Enter Job experience"
                className="w-fit focus-none"
              ></Input>
            </div>
            <div>
              <Label className="text-lg">Positions</Label>
              <Input
                type="number"
                name="positions"
                value={input.positions}
                onChange={changeInputHandler}
                placeholder="Enter Job positions"
                className="w-fit focus-none"
              ></Input>
            </div>
            <div>
              <Label className="text-lg">Company</Label>
              {allCompanies.length >= 1 && (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Companies</SelectLabel>
                      {allCompanies.map((company) => {
                        return (
                          <SelectItem
                            key={company._id}
                            value={company.companyName.toLowerCase()}
                          >
                            {" "}
                            {company.companyName}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          <div className="my-4">
            {loading ? (
              <Button className="w-fit bg-blue-600">
                {"Please wait"}
                <LoaderCircle className="w-2 h-2 animate-spin" />{" "}
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-fit bg-blue-600 cursor-pointer"
              >
                {" "}
                Create a job{" "}
              </Button>
            )}
          </div>
          {allCompanies.length === 0 && (
            <p className="text-red-500 mt-2">
              *Please register a company first to create a job.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
