import { MapPin } from 'lucide-react'
import { Badge } from "./ui/badge"
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
  const navigate = useNavigate()

  return (
    <div className='p-4 bg-[#ffffff] flex flex-col gap-6 shadow-lg w-full'>
        <div>
        <h3 className='text-xl font-semibold mb-2'>{job.title}</h3>
        <div className='flex gap-2'> 
          <img className='w-8 h-8 rounded-full object-cover' src={job?.company?.logo} alt="" />
        <h5 className='text-lg font-semibold'>{job.company?.companyName || 'Company Name Not Available'}</h5>
        </div>
        <p className="break-words truncate">{job.description}</p>
        </div>
        <div className='flex items-center gap-2'>
            <MapPin size={22} />
            <h5>{job.location}</h5>
        </div>
        <div className='flex flex-wrap gap-4'> 
            <Badge variant='outline'>{job.salary} LPA</Badge>
            <Badge variant='outline'>{job.positions} Positions</Badge>
            <Badge variant='outline'>{job.jobType}</Badge>
        </div>
        <div>
          <Button onClick={() => navigate(`/description/${job._id}`)} variant="outline" className='bg-blue-600 text-white cursor-pointer'>Details</Button>
        </div>
    </div>
  )
}

export default LatestJobCards