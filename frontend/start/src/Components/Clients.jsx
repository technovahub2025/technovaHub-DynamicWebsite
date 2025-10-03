import React from "react";
import Title from "./Title";

// === Import all client logos ===
import mrf from "../assets/clients/logo1.png";
import tvs from "../assets/clients/logo2.png";
import eaton from "../assets/clients/logo03.jpg";
import rane from "../assets/clients/logo4.png";
import sterilgene from "../assets/clients/logo5.jpg";
import foseco from "../assets/clients/logo6.png";
import lnt from "../assets/clients/logo7.png";
import tek from "../assets/clients/logo8.png";
import poclain from "../assets/clients/logo9.png";
import cavinkare from "../assets/clients/logo10.png";
import mgm from "../assets/clients/logo10.png";
import solara from "../assets/clients/logo11.png";
import accent from "../assets/clients/logo13.png";
import sumangala from "../assets/clients/logo14.png";
import teleflex from "../assets/clients/logo15.png";

// === Import all expert logos ===
import tcs from "../assets/clients/lo1.jpg";
import hcl from "../assets/clients/lo2.png";
import infosys from "../assets/clients/lo3.png";
import cognizant from "../assets/clients/lo4.png";
import hexaware from "../assets/clients/lo5.png";
import wipro from "../assets/clients/lo6.png";

// === Arrays ===
const clients = [
  { id: 1, src: mrf, alt: "MRF" },
  { id: 2, src: tvs, alt: "TVS" },
  { id: 3, src: eaton, alt: "EATON" },
  { id: 4, src: rane, alt: "Rane" },
  { id: 5, src: sterilgene, alt: "Steril-Gene" },
  { id: 6, src: foseco, alt: "Foseco" },
  { id: 7, src: lnt, alt: "L&T" },
  { id: 8, src: tek, alt: "TEK" },
  { id: 9, src: poclain, alt: "Poclain Hydraulics" },
  { id: 10, src: cavinkare, alt: "CavinKare" },
  { id: 11, src: mgm, alt: "MGM" },
  { id: 12, src: solara, alt: "Solara" },
  { id: 13, src: accent, alt: "Accent Pharma" },
  { id: 14, src: sumangala, alt: "Sumangala" },
  { id: 15, src: teleflex, alt: "Teleflex" },
];

const experts = [
  { id: 1, src: tcs, alt: "TCS" },
  { id: 2, src: hcl, alt: "HCL" },
  { id: 3, src: infosys, alt: "Infosys" },
  { id: 4, src: cognizant, alt: "Cognizant" },
  { id: 5, src: hexaware, alt: "Hexaware" },
  { id: 6, src: wipro, alt: "Wipro" },
];

const Clients = () => {
  return (
    <section className="py-20 md:mb-10 bg-gray-50 relative">
      {/* Add custom keyframes here */}
      <style>
        {`
          @keyframes marqueeLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marqueeRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee-left {
            animation: marqueeLeft 20s linear infinite;
          }
          .animate-marquee-right {
            animation: marqueeRight 20s linear infinite;
          }
        `}
      </style>

      {/* OUR CLIENTS */}
      <div className="max-w-6xl mx-auto px-4">
        <Title text="OUR CLIENTS" />
        <div className="mt-10 overflow-hidden group">
          <div className="flex w-max animate-marquee-left group-hover:[animation-play-state:paused]">
            {clients.concat(clients).map((client, idx) => (
              <div
                key={`client-${idx}`}
                className="flex items-center justify-center w-32 h-20 bg-white shadow-sm rounded-md p-2 mr-8 hover:scale-105 transition-transform"
              >
                <img
                  src={client.src}
                  alt={client.alt}
                  className="max-h-14 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INDUSTRIAL EXPERTS */}
      <div className="max-w-6xl mx-auto px-4 mt-20">
        <Title text="GET IN TOUCH WITH INDUSTRIAL EXPERT" />
        <div className="mt-10 overflow-hidden group">
          <div className="flex w-max animate-marquee-right group-hover:[animation-play-state:paused]">
            {experts.concat(experts).map((expert, idx) => (
              <div
                key={`expert-${idx}`}
                className="flex items-center justify-center w-32 h-20 bg-white shadow-sm rounded-md p-2 mr-8 hover:scale-105 transition-transform"
              >
                <img
                  src={expert.src}
                  alt={expert.alt}
                  className="max-h-14 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
