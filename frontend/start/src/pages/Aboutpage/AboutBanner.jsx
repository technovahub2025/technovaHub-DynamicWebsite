import React from "react";
import about from "../../assets/images/4.jpg"

export default function AboutUsSection() {
  return (
    <section className="w-full  py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
        
        {/* Small heading */}
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
          About Us
        </p>

   
       

        {/* Image */}
        <div className="w-full ">
          <img
            src={about} 
            alt="About Us"
            className="w-full  md:h-[600px] rounded-3xl shadow-lg object-cover"
          />
        </div>
         <h1 className="text-sm  sm:text-3xl md:text-4xl font-thin text-gray-900 leading-snug  max-w-4xl">
         <em>TechnovaHub, a unit of Aroun Groups, is a premier provider of technology education and software solutions. We specialise in delivering practical, industry aligned training for students, professionals and entrepreneurs ensuring a workforce equipped with real world skills.</em> 
        </h1>
        <h1 className="text-sm sm:text-3xl md:text-4xl font-thin text-gray-900 leading-snug  max-w-4xl">
        <em>Our services also extend to businesses, offering tailored tech solutions that drive efficiency, innovation and growth.</em>  
        </h1>
      </div>
    </section>
  );
}
