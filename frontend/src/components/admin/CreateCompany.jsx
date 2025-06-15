import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../../redux/companySlice'

const CreateCompany = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [companyName, setCompanyName] = useState()

    const inputChnagehandler = (e)=> {
        setCompanyName(e.target.value)
    }

    const registerNewCompany = async () => {
        const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName},{withCredentials: true}, {
            headers: {
                "Content-Type":"application/json"
            }
        })
        if(res.data.success) {
            dispatch(setSingleCompany(res.data.company))
            toast.success(res.data.message)
            const companyId = res?.data?.company?._id
            navigate(`/admin/companies/${companyId}`)
        }
    }

  return (
    <div className="flex flex-col gap-6">
        <div>
            <h2 className='text-2xl font-medium'>Please enter your company name below</h2>
            <p className='text-md text-zinc-400'>You can change this later</p>
        </div>
        <div className='flex flex-col gap-2'>
            <Label>Company Name</Label>
            <Input onChange={inputChnagehandler} className='w-fit' placeholder='Enter company name' />
        </div>
        <div className='flex gap-4'>
            <Button variant="outline" onClick={()=> navigate("/admin/companies")}>Cancel</Button>
            <Button onClick={registerNewCompany} className='bg-blue-600'>Continue</Button>
        </div>
    </div>
  )
}

export default CreateCompany