import React, { useEffect, useState } from "react";
import banner1 from "../assets/images/indoor.jpg";
import banner2 from "../assets/images/train.jpg";
import banner3 from "../assets/images/akshaya.jpg";
import banner4 from "../assets/images/4.jpg";

const Banner = () => {
  const images = [banner1, banner2, banner3, banner4];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // 3s per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative md:h-screen h-[300px] flex items-center justify-center text-center text-[#002f6c] overflow-hidden">
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
      <div className="absolute inset-0 bg-white/70 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-3xl px-5">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-extrabold mb-2 tracking-wide leading-tight">
          TechnovaHub
        </h1>
        <p className="md:text-2xl text-xl font-semibold text-[#334155]">
          <span className="text-black font-semibold uppercase">Empowering Minds</span>
        </p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSesAnC00FPStzrs3z22PtnItYt24iHvaXPLIABUTe8WMWJC7A/viewform?usp=sharing&ouid=101727743134439473534"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block bg-blue-300 border-2 border-blue-300 p-2 md:py-3 md:px-6 font-medium text-white text-[15px] rounded-md hover:bg-blue-400 transition-colors"
        >
          Click to Connect
        </a>
      </div>
    </header>
  );
};

export default Banner;
