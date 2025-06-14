import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";

const LatestJobs = () => {
  const allJobs = useSelector((store) => store.job.allJobs);

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-3xl font-medium">
        <span className="text-blue-600">Latest & Top</span> Job Openings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {allJobs && allJobs.length > 0 ? (
          allJobs.map((job, index) => (
            <div key={index} className="w-full">
              <LatestJobCards job={job} />
            </div>
          ))
        ) : (
          <p>No Jobs Available</p>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
