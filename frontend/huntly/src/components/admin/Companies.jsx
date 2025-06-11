import React, { useEffect, useState } from 'react'
import CompaniesTable from './CompaniesTable'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSsearchCompanyByText } from '../../redux/companySlice'

const Companies = () => {
  useGetAllCompanies()
  const navigate = useNavigate()
  const dispatch = useDispatch()

    const [input, setInput] = useState("")

    useEffect(() => {
      dispatch(setSsearchCompanyByText(input))
    },[input])

  return (
    <div>
        <div className='flex items-center justify-between mb-8'>
            <input onChange={(e) => setInput(e.target.value)} type="text" placeholder='Filter by Name' className='border-2 px-1 rounded-md' />
            <Button onClick={()=> navigate("/admin/companies/create")} className='bg-blue-600 cursor-pointer'>New Company</Button>
        </div>
        <div>
            <CompaniesTable />
        </div>
    </div>
  )
}

export default Companies