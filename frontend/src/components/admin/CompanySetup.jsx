import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "../../hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const navigate = useNavigate();

  const { singleCompany } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.companyName || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

  return (
    <div>
      <div className="flex flex-col gap-2 mb-8">
        <Button
          variant="outline"
          onClick={() => navigate("/admin/companies")}
          className="w-fit"
        >
          <ArrowLeft /> Back
        </Button>
        <div>
          <h2 className="text-2xl font-semibold">Setup Company</h2>
        </div>
      </div>

      <form onSubmit={submitHandler} action="">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <Label className="text-lg">Company Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter company name"
              value={input.name}
              onChange={changeEventHandler}
              className="w-fit"
            />
          </div>
          <div className="flex flex-col">
            <Label className="text-lg">Description</Label>
            <Input
              type="text"
              name="description"
              placeholder="Enter company description"
              value={input.description}
              onChange={changeEventHandler}
              className="w-fit"
            />
          </div>
          <div className="flex flex-col">
            <Label className="text-lg">Website</Label>
            <Input
              type="text"
              name="website"
              placeholder="Enter company website"
              value={input.website}
              onChange={changeEventHandler}
              className="w-fit"
            />
          </div>
          <div className="flex flex-col">
            <Label className="text-lg">Location</Label>
            <Input
              type="text"
              name="location"
              placeholder="Enter company location"
              value={input.location}
              onChange={changeEventHandler}
              className="w-fit"
            />
          </div>
          <div className="flex flex-col">
            <Label className="text-lg">Logo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="w-fit"
            />
          </div>
          <Button
            type="submit"
            className="bg-blue-600 w-fit cursor-pointer mt-2"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompanySetup;