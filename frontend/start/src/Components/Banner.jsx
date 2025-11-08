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
import { Link } from "react-router-dom";

const Banner = () => {
  const images = [banner2, banner5, banner6, banner3, banner4, banner1];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []); // images length won't change at runtime

  return (
    <header className="relative md:min-h-screen h-[50vh] flex items-center justify-center text-center text-[#002f6c] overflow-hidden">
      {/* Background slides */}
      {images.map((img, index) => (
        <div
          key={index}
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${img})`,
            opacity: index === current ? 1 : 0,
            willChange: "opacity",
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/80 z-10" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl px-5">
        {/* Logo */}
        <div
          className="w-[240px] h-[200px] md:w-[480px] md:h-[400px] mt-3 rounded-lg flex items-center justify-center"
          data-aos="zoom-in"
        >
          <img
            src={logo}
            alt="TechNova Hub logo"
            className="object-contain w-full h-full"
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="flex gap-2 justify-center">
          {/* External (Google Form) */}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSesAnC00FPStzrs3z22PtnItYt24iHvaXPLIABUTe8WMWJC7A/viewform?usp=sharing&ouid=101727743134439473534"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 border-2 border-white p-2 md:py-3 md:px-10 px-6 font-medium text-white text-[10px] md:text-[15px] rounded-md hover:bg-blue-600 transition-colors"
            data-aos="fade-up"
            aria-label="Open enquiry form in a new tab"
          >
            Enquiry Now
          </a>

          {/* Internal route (react-router) */}
          <Link
            to="/7Days-AI-innovation"
           
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 border-2 border-white p-2 md:py-3 md:px-6 font-medium text-white text-[10px] md:text-[15px] rounded-md hover:bg-blue-600 transition-colors"
            data-aos="fade-up"
            aria-label="Open 7 Days AI Workshop page"
          >
            7 Days AI Workshop
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Banner;
