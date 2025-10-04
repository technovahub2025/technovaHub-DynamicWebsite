import React from "react";

const Marquee = ({ text }) => {
  return (
    <div className="relative w-full md:py-20 md:px-10  overflow-hidden whitespace-nowrap">
      <div className="animate-marquee bg-gray-100 inline-block">
        <h2 className="text-[20vw] sm:text-[12vw] md:text-[10vw] font-extrabold text-gray-300 uppercase">
           WE AUTOMATE THE ROUTINE, SO YOU CAN INNOVATE THE EXTRAORDINARY!!! 
        </h2>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(20%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Marquee;
