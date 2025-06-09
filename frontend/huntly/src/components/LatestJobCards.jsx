import { MapPin } from 'lucide-react'
import { Badge } from "./ui/badge"

const LatestJobCards = ({job}) => {
  return (
    <div className='p-4 bg-[#f0f0f070] flex flex-col gap-6 shadow-lg'>
        <div>
        <h3 className='text-xl font-semibold mb-2'>{job.title}</h3>
        <h5 className='text-lg font-semibold'>{job.company.companyName}</h5>
        <p>{job.description}</p>
        </div>
        <div className='flex items-center gap-2'>
            <MapPin size={22} />
            <h5>{job.location}</h5>
        </div>
        <div className='flex gap-4'> 
            <Badge variant='outline'>{job.salary}</Badge>
            <Badge variant='outline'>{job.positions} Positions</Badge>
            <Badge variant='outline'>{job.jobType}</Badge>
        </div>

    </div>
  )
}

export default LatestJobCards