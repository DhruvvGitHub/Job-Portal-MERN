import Job from "./Job"

const randomJobs = [1,2,3]

const Browse = () => {
  return (
    <div className="flex flex-col gap-8">
        <div>
            <h2 className="text-xl font-medium">Search results</h2>
            <h5 className="text-sm text-zinc-500">Showing {randomJobs.length} results</h5>
        </div>
        <div className="flex gap-4">
            {
                randomJobs.map((item, index) => {
                    return (
                        <Job />
                    )
                })
            }
        </div>
    </div>
  )
}

export default Browse