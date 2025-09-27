import React from 'react'
import HeroBanner from '../Components/Banner'
import StatsCounter from '../Components/statsCounter/StatsCounter'

import Ourfacilities from '../Components/Our facilities/Ourfacilities'
import AboutUsSection from './Aboutpage/AboutBanner'
import CourseCard from './Courses/CourseCard'
import Gallery from './Gallery/Gallery'

const LandingPage = () => {
  return (
    <div>
      <HeroBanner/>
      <StatsCounter/>
    
      <AboutUsSection/>
        <CourseCard/>
        <Gallery/>
      <Ourfacilities/>

    </div>
  )
}

export default LandingPage