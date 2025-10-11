import React, { useEffect, useState } from "react";
import banner1 from "../assets/images/indoor.jpg";
import banner2 from "../assets/images/train.jpg";
import banner3 from "../assets/images/akshaya.jpg";
import banner4 from "../assets/images/4.jpg";
import logo from "../assets/images/logoremove.png";

const Banner = () => {
  const images = [banner2, banner3, banner4, banner1];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // 3s per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative md:min-h-screen  h-[45vh]    flex items-center justify-center text-center text-[#002f6c] overflow-hidden">
      {/* Background slides */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center  transition-opacity duration-1000 ease-in-out`}
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
       <div className="w-[200px] h-[200px] md:w-[500px]  md:h-[500px] mt-3 rounded-lg flex items-center justify-center ">
                        <img src={logo} alt="logo" className="object-contain w-full h-full" />
                        
                      </div>
       
      
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSesAnC00FPStzrs3z22PtnItYt24iHvaXPLIABUTe8WMWJC7A/viewform?usp=sharing&ouid=101727743134439473534"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 border-2 border-white p-2 md:py-3 md:px-6 font-medium text-white text-[15px] rounded-md hover:bg-blue-600 transition-colors"
        >
          Click to Connect
        </a>
      </div>
    </header>
  );
};

export default Banner;
