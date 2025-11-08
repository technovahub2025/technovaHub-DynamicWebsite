import React from 'react'
import VideoBanner from '../components/VideoBanner'
import WhatYouWillGain from '../components/WhatYouWillGain'
import Takeaways from '../components/Takeaways'
import PricingCard from '../components/PricingCard'
import Eligibility from '../components/Eligibility'
import Contact from '../components/Contact'


const Landingpage = () => {
  return (
    <div className='max-w-7xl mx-auto'>
       <Contact/>
        <PricingCard/>
          <Eligibility/>
           <WhatYouWillGain/>
        <Takeaways/>
        <VideoBanner/>
        
       
       
      
       
       
      
    </div>
  )
}

export default Landingpage