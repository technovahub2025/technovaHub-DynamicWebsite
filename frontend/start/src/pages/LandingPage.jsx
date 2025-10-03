import React from 'react'
import HeroBanner from '../Components/Banner'
import StatsCounter from '../Components/statsCounter/StatsCounter'

import Ourfacilities from '../Components/Our facilities/Ourfacilities'
import AboutUsSection from './Aboutpage/AboutBanner'
import CourseCard from './Courses/CourseCard'
import Gallery from './Gallery/Gallery'
import VisionMission from '../Components/OURVISION&MISSION/OurVisionMission'
import SoftwareSolutions from './softwareSolutions/SoftwareSolutions'
import Clients from '../Components/Clients'

const LandingPage = () => {
  return (
    <div>
      <HeroBanner/>
      <VisionMission/>
       <CourseCard/>
       <SoftwareSolutions/>
    
      <AboutUsSection/>
        <Ourfacilities/>
        <Clients/>
       
        <Gallery/>
          <StatsCounter/>
    

    </div>
  )
}

export default LandingPage