import {Badge} from "./ui/badge"
import {Button} from "./ui/button"

const JobDescription = () => {
  const isApplied = false;
  return (
    <div>
        <div className="max-w-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-medium my-4">Company Name</h2>
            <Button disabled={isApplied} variant="outline" className="bg-blue-600 text-white">{isApplied ? "Already Applied" : "Apply Now"}</Button>
          </div>
            <div>
              <h2 className='text-3xl font-semibold my-6'>Job Title</h2>
                          <div className="flex gap-2">
              <Badge variant="outline" className="text-md">Posted 3 days ago</Badge>
              <Badge variant="outline" className="text-md">Full Time</Badge>
            </div>
            </div>
            <div className="my-6">
              <h3 className='text-2xl font-semibold'>Job Description</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga autem animi illo natus error voluptatum voluptas veniam reprehenderit sunt? Assumenda officiis ipsa nemo sunt et magnam cupiditate itaque error fugit!</p>
            </div>
            <div className="my-6">
              <h3 className='text-2xl font-semibold'>Requirements</h3>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi, maiores?</p>
            </div>
            <div>
              <div className="flex flex-col gap-2">
                <h5 className="text-lg"><span className="font-semibold">Role</span>: Developer</h5>
                <h5 className="text-lg"><span className="font-semibold">Location</span>: Developer</h5>
                <h5 className="text-lg"><span className="font-semibold">Required Experience</span>: 1 Year</h5>
                <h5 className="text-lg"><span className="font-semibold">Salary</span>: 10 LPA</h5>
                <h5 className="text-lg"><span className="font-semibold">Total Applicants</span>: 0</h5>
              </div>
            </div>
        </div>
    </div>
  )
}

export default JobDescription