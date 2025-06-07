import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCaraousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'

const Home = () => {
  return (
    <div>
    <HeroSection />
    <CategoryCarousel />
    <LatestJobs />
    <Footer />
    </div>
  )
}

export default Home