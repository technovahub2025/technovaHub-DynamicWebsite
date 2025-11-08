import React from 'react'

import WhatYouWillGain from '../components/WhatYouWillGain'
import Takeaways from '../components/Takeaways'
import PricingCard from '../components/PricingCard'
import Eligibility from '../components/Eligibility'
import ContactForm from '../Components/ContactForm'


const Landingpage = () => {
  return (
    <div className='max-w-7xl mx-auto'>
       <ContactForm/>
        <PricingCard/>
          <Eligibility/>
           <WhatYouWillGain/>
        <Takeaways/>
       
        
       
       
      
       
       
      
    </div>
  )
}

export default Landingpage