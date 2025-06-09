import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";

const newJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  const allJobs = useSelector((store) => store.job.allJobs);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-medium">
        <span className="text-blue-600">Latest & Top</span> Job Openings
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {allJobs && allJobs.length > 0 ? (
          allJobs.map((job, index) => <LatestJobCards key={index} job={job} />)
        ) : (
          <p>No Jobs Available</p>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
