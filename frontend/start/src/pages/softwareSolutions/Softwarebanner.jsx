import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden font-poppins">
      {/* Background Slides with smooth fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${images[current]})`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      {/* Overlay Layer */}
      <div className="absolute inset-0 bg-white/30 z-10"></div>

      {/* Floating glow effects */}
      <div className="absolute w-[600px] h-[600px] bg-blue-400/20 blur-3xl rounded-full -top-32 -left-32 animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bg-purple-400/20 blur-3xl rounded-full bottom-0 right-0 animate-pulse" />

      {/* Content */}
      <motion.div
        className="relative z-20 text-center text-white px-6 max-w-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-3xl md:text-6xl mt-5 font-extrabold mb-4 tracking-wide drop-shadow-lg"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Empowering Businesses with{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            Smart Software Solutions
          </span>
        </motion.h1>

  
      </motion.div>
    </header>
  );
};

export default Softwarebanner;
