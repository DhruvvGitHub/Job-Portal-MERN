import { useDispatch, useSelector } from "react-redux"
import Job from "./Job"
import { useEffect } from "react"
import { setSearchQuery } from "../redux/jobSlice"
import useGetAllJobs from "../hooks/useGetAllJobs"


const Browse = () => {
    useGetAllJobs()
    const dispatch = useDispatch()
    const {allJobs} = useSelector(store=>store.job)

    useEffect(() => {
        dispatch(setSearchQuery(""))
    })
  return (
    <div className="flex flex-col gap-8">
        <div>
            <h2 className="text-xl font-medium">Browse all jobs</h2>
            <h5 className="text-sm text-zinc-500">Showing {allJobs.length} results</h5>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {
                allJobs.map((job) => {
                    return (
                        <Job key={job._id} job={job} />
                    )
                })
            }
        </div>
    </div>
  )
}

export default Browse