import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/jobSlice";

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {

  const [selectedvalue, setSelectedvalue] = useState("")
  const dispatch = useDispatch()

  const changeHandler = (value) => {
    setSelectedvalue(value)
  }
  useEffect(() => {
    dispatch(setSearchQuery(selectedvalue))
  },)

  return (
    <div>
      <h2 className="text-xl font-medium mb-4">All Filters</h2>

      {fitlerData.map((data, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{data.fitlerType}</h3>
          <RadioGroup value={selectedvalue} onValueChange={changeHandler}>
            {data.array.map((item, idx) => {
              const itemId = `r${index} - ${idx}` // unique id
              return (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
