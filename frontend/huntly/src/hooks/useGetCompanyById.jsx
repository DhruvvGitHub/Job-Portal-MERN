import axios from 'axios'
import { useEffect } from 'react'
import { COMPANY_API_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../redux/companySlice'

const useGetCompanyById = (companyId) => {

    const dispatch = useDispatch()

  useEffect(() => {
    const fetchSingleCompany = async() => {
        try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {withCredentials: true})
            console.log(res);
            if(res.data.success) {
                console.log("Full response:", res);
                dispatch(setSingleCompany(res.data.company))
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchSingleCompany()
  },[companyId, dispatch])
}

export default useGetCompanyById