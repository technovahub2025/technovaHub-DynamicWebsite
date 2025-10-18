import React, { useEffect, useState } from "react";
import banner1 from "../../assets/images/b2.jpg";
import banner2 from "../../assets/images/train.jpg";
import banner3 from "../../assets/images/newimg.jpeg";
import banner4 from "../../assets/images/4.jpg";


const Softwarebanner = () => {
  const images = [banner1, banner2, banner3, banner4];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // 3s per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative md:h-[50vh] h-[30vh] flex items-center justify-center text-center text-[#002f6c] overflow-hidden">
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
 <div className="relative z-20 max-w-7xl px-5">
      
       
      
        <h1 className="text-blue-900  text-xl md:text-4xl font-medium">Software Solutions</h1>
      </div>
      
    
    </header>
  );
};

export default Softwarebanner;
