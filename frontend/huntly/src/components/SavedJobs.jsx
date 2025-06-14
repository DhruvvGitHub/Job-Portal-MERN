import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Job from './Job'
import axios from 'axios'
import { JOB_API_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setSavedJobs } from '../redux/jobSlice'

const SavedJobs = () => {
  const { savedJobs } = useSelector(store => store.job)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getsavedjobs`, {
          withCredentials: true
        })
        if(res.data.success) {
          dispatch(setSavedJobs(res.data.savedJobs))
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchSavedJobs()
  }, [dispatch])

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-xl font-medium">Saved Jobs</h2>
        <h5 className="text-sm text-zinc-500">Showing {savedJobs?.length || 0} saved jobs</h5>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {savedJobs && savedJobs.length > 0 ? (
          savedJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))
        ) : (
          <p>No saved jobs found</p>
        )}
      </div>
    </div>
  )
}

export default SavedJobs