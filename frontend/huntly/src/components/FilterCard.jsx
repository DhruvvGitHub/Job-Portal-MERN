import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

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
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">All Filters</h2>

      {fitlerData.map((data, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{data.fitlerType}</h3>
          <RadioGroup defaultValue="">
            {data.array.map((item, i) => {
              const id = `${data.fitlerType}-${i}`; // unique id
              return (
                <div key={i} className="flex items-center space-x-2">
                  <RadioGroupItem value={item} id={id} />
                  <Label htmlFor={id}>{item}</Label>
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
