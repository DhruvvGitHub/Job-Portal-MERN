import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCaraousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const {user} = useSelector(store=>store.auth) 
  const navigate = useNavigate()
  useGetAllJobs()

  useEffect(() => {
    if(user?.role == "recruiter") {
      navigate("/admin/companies")
    }
  })

  return (
    <div>
    <HeroSection />
    <CategoryCarousel />
    <LatestJobs />
    </div>
  )
}

export default Home