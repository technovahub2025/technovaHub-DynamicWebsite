import React, { useEffect, useState } from "react";
import banner1 from "../assets/images/indoor.jpg";
import banner2 from "../assets/images/train.jpg";
import banner3 from "../assets/images/akshaya.jpg";

const Banner = () => {
  const images = [banner1, banner2, banner3];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 1000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative md:h-screen  h-[300px] flex items-center justify-center text-center text-[#002f6c]  overflow-hidden">
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
        ></div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70 z-10"></div>

      {/* Content */}
      <div className="relative z-20 max-w-3xl px-5 animate-popupBounce opacity-100">
        <h1 className="md:text-9xl  mt-[70px] text-3xl font-extrabold mb-2 tracking-wide leading-tight">
          TechnovaHub
        </h1>
        <p className="md:text-2xl text-xl font-semibold text-[#334155]">
          <span className="text-black font-semibold uppercase">
            Empowering Minds
          </span>
        </p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSesAnC00FPStzrs3z22PtnItYt24iHvaXPLIABUTe8WMWJC7A/viewform?usp=sharing&ouid=101727743134439473534"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block bg-blue-300  border-2 border-blue-300 border-2 border-white p-2 font-bold text-white md:py-3 md:px-6 hover:border-2 hover:border-white rounded-md transition-colors hover:bg-blue-400"
        >
          Click to Connect
        </a>
      </div>
    </header>
  );
};

export default Banner;
