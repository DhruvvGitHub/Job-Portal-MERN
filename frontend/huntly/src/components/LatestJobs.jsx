import LatestJobCards from "./LatestJobCards"

const newJobs = [1,2,3,4,5,6,7,8]

const LatestJobs = () => {
  return (
    <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-medium"><span className='text-blue-600'>Latest & Top</span> Job Openings</h2>
        <div className="flex items-center justify-evenly gap-4 flex-wrap">
            {
                newJobs.slice(0,6).map((job, index) => <LatestJobCards key={index} />)
            }
        </div>
    </div>
  )
}

export default LatestJobs