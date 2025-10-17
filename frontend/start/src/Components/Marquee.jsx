import React from "react";

const Marquee = ({ text }) => {
  return (
    <div className="relative w-full md:py-20 md:px-10  overflow-hidden whitespace-nowrap">
      <div className="animate-marquee bg-blue-100 inline-block">
        <h2 className="text-[20vw] sm:text-[10vw] md:text-[3vw] font-extrabold text-white uppercase">
           WE AUTOMATE THE ROUTINE, SO YOU CAN INNOVATE THE EXTRAORDINARY!!! 
        </h2>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
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
