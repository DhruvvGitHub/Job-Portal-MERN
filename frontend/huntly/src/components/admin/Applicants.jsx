import React, { useEffect } from 'react'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../../utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '../../redux/applicationSlice'

const Applicants = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const {applicants} = useSelector(store=>store.application)

    useEffect(() => {
        const fetchAllApplicants = async () => {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
                withCredentials: true
            })
            console.log(res.data);
            if(res.data.success) {
                dispatch(setAllApplicants(res.data.job))
            }
        }
        fetchAllApplicants()
    },[])

  return (
    <div>
        <h2 className='text-2xl font-semibold mb-4'>Total Applicants: {applicants?.applications?.length}</h2>
        <ApplicantsTable />
    </div>
  )
}

export default Applicants