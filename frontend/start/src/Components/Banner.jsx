import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import banner1 from "../assets/images/indoor.jpg";
import banner2 from "../assets/images/train.jpg";
import banner3 from "../assets/images/akshaya.jpg";
import banner4 from "../assets/images/4.jpg";
import banner5 from "../assets/images/mastery.jpg";
import banner6 from "../assets/images/mithran.jpg";

import logo from "../assets/images/logoremove.png";

const Banner = () => {
  const images = [banner2, banner5, banner6, banner3, banner4, banner1];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1200, once: true });

    // Slider interval
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // 4s per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative md:min-h-screen h-[50vh] flex items-center justify-center text-center text-[#002f6c] overflow-hidden">
      {/* Background slides */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out`}
          style={{
            backgroundImage: `url(${img})`,
            opacity: index === current ? 1 : 0,
            backgroundBlendMode: "multiply",
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/80 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl px-5">
        {/* Logo */}
        <div
          className="w-[240px] h-[200px] md:w-[480px] md:h-[400px] mt-3 rounded-lg flex items-center justify-center"
          data-aos="zoom-in"
        >
          <img src={logo} alt="logo" className="object-contain w-full h-full" />
        </div>


<div className="flex  gap-2 justify-center ">
 {/* Connect Button */}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSesAnC00FPStzrs3z22PtnItYt24iHvaXPLIABUTe8WMWJC7A/viewform?usp=sharing&ouid=101727743134439473534"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 border-2 border-white p-2 md:py-3 md:px-10 px-6 font-medium text-white text-[10px] md:text-[15px] rounded-md hover:bg-blue-600 transition-colors "
          data-aos="fade-up"
        >
         Enquiry Now
        </a>

         <a
          href="/7Days-AI-innovation"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 border-2 border-white p-2 md:py-3 md:px-6 font-medium text-white text-[10px] md:text-[15px] rounded-md hover:bg-blue-600 transition-colors "
          data-aos="fade-up"
        >
          7 Days AI Challanges
        </a>
</div>
       
      </div>
    </header>
  );
};

export default Banner;
