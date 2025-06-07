import { MapPin } from 'lucide-react'
import { Badge } from "./ui/badge"

const LatestJobCards = () => {
  return (
    <div className='p-4 bg-[#f0f0f070] flex flex-col gap-6 shadow-lg'>
        <div>
        <h3 className='text-xl font-semibold'>Job Title</h3>
        <h5 className='text-lg font-semibold'>Company Name</h5>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className='flex items-center gap-2'>
            <MapPin size={22} />
            <h5>Location Name</h5>
        </div>
        <div className='flex gap-4'> 
            <Badge variant='outline'>10 LPA</Badge>
            <Badge variant='outline'>2 Positions</Badge>
            <Badge variant='outline'>Job Type</Badge>
        </div>

    </div>
  )
}

export default LatestJobCards