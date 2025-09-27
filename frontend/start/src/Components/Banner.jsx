import React from "react";
import bannerImage from "../assets/images/indoor.jpg"; // update path as needed

const Banner = () => {
  return (
    <header
      id="hero"
      className="relative md:h-screen h-[350px]  flex items-center justify-center text-center text-[#002f6c] overflow-hidden"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70 z-10"></div>

      {/* Content */}
      <div
        className="relative z-20  max-w-3xl px-5 opacity-0 animate-popupBounce"
      >
        <h1 className="md:text-6xl mt-[70px]  text-3xl font-extrabold mb-2 tracking-wide leading-tight">
          TechnovaHub
        </h1>
        <p className="md:text-2xl text-md font-semibold text-[#334155]">
          <span className="text-[#0077b6] font-bold uppercase">Empowering Minds</span>
        </p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSesAnC00FPStzrs3z22PtnItYt24iHvaXPLIABUTe8WMWJC7A/viewform?usp=sharing&ouid=101727743134439473534"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block bg-white border-2 border-blue-300  p-2 font-bold  text-black md:py-3 md:px-6  rounded-md  transition-colors"
        >
          Click to Connect
        </a>
      </div>
    </header>
  );
};

export default Banner;
