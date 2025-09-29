import React from "react";
import Title from "../../Components/Title"; // your custom Title component

// Sample logo list (replace with your actual image paths or URLs)
const clients = [
  { id: 1, src: "/logos/mrf.png", alt: "MRF" },
  { id: 2, src: "/logos/tvs.png", alt: "TVS" },
  { id: 3, src: "/logos/eaton.png", alt: "EATON" },
  { id: 4, src: "/logos/rane.png", alt: "Rane" },
  { id: 5, src: "/logos/steril-gene.png", alt: "Steril-Gene" },
  { id: 6, src: "/logos/foseco.png", alt: "Foseco" },
  { id: 7, src: "/logos/lnt.png", alt: "L&T" },
  { id: 8, src: "/logos/tek.png", alt: "TEK" },
  { id: 9, src: "/logos/poclain.png", alt: "Poclain Hydraulics" },
  { id: 10, src: "/logos/cavinkare.png", alt: "CavinKare" },
  { id: 11, src: "/logos/mgm.png", alt: "MGM" },
  { id: 12, src: "/logos/solara.png", alt: "Solara" },
  { id: 13, src: "/logos/accent.png", alt: "Accent Pharma" },
  { id: 14, src: "/logos/sumangala.png", alt: "Sumangala" },
  { id: 15, src: "/logos/teleflex.png", alt: "Teleflex" },
];

const experts = [
  { id: 1, src: "/logos/tcs.png", alt: "TCS" },
  { id: 2, src: "/logos/hcl.png", alt: "HCL" },
  { id: 3, src: "/logos/infosys.png", alt: "Infosys" },
  { id: 4, src: "/logos/cognizant.png", alt: "Cognizant" },
  { id: 5, src: "/logos/hexaware.png", alt: "Hexaware" },
  { id: 6, src: "/logos/wipro.png", alt: "Wipro" },
];

const Clients = () => {
  return (
    <section className="py-16 bg-gray-50">
      {/* OUR CLIENTS */}
      <div className="max-w-6xl mx-auto px-4">
        <Title text="OUR CLIENTS" />

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 place-items-center">
          {clients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-center w-32 h-20 bg-white shadow-sm rounded-md p-2 hover:scale-105 transition-transform"
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

      {/* INDUSTRIAL EXPERTS */}
      <div className="max-w-6xl mx-auto px-4 mt-20">
        <Title text="GET IN TOUCH WITH INDUSTRIAL EXPERT" />

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 place-items-center">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className="flex items-center justify-center w-32 h-20 bg-white shadow-sm rounded-md p-2 hover:scale-105 transition-transform"
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
    </section>
  );
};

export default Clients;
