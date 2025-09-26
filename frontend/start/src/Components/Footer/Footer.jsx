import React from 'react'
import {Link} from "react-router-dom"

const Footer = () => {
  return (
  
        <div className='bg-[#3B82F6] h-[40vh] lg:h-[50vh] w-full   '>
           
           <div className='flex justify-center items-center  h-[40vh] '>
             <h1 className='text-white font-bold text-5xl lg:text-[150px]'>
                TechnovaHub 
             </h1>
             <Link to="/adminlogin">
               <span className='mx-2'>Admin</span>
             </Link>
           
           </div>
        
    </div>
  )
}

export default Footer