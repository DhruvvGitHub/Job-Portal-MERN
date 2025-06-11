import axios from 'axios'
import { useEffect } from 'react'
import { COMPANY_API_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setAllCompanies } from '../redux/companySlice'

const useGetAllCompanies = () => {

    const dispatch = useDispatch()

  useEffect(() => {
    const fetchAllCompanies = async() => {
        try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {withCredentials: true})
            console.log(res);
            if(res.data.success) {
                dispatch(setAllCompanies(res.data.companies))
            }
        } catch (error) {
            console.log(error);
        }
    }

    fetchAllCompanies()
  },[])
}

export default useGetAllCompanies