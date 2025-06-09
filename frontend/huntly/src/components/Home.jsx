import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCaraousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '../hooks/useGetAllJobs'

const Home = () => {
  useGetAllJobs()

  return (
    <div>
    <HeroSection />
    <CategoryCarousel />
    <LatestJobs />
    </div>
  )
}

export default Home