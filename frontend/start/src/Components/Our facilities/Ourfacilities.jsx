import React, { useEffect } from "react";
import { FaBookReader } from "react-icons/fa";
import { GrWorkshop } from "react-icons/gr";
import { SiGoogleclassroom } from "react-icons/si";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import Title from "../Title";
import AOS from "aos";
import "aos/dist/aos.css";

const cards = [
  {
    icon: <FaBookReader className="w-12 h-12 mb-4" />,
    title: "Smart Class",
    desc: "Tech upgraded classroom that enhances the teaching and learning process for both the teachers and the students. 🎓",
  },
  {
    icon: <GrWorkshop className="w-12 h-12 mb-4" />,
    title: "Practical Lab",
    desc: "Students can explore practical concepts, facts and theorems interactively. 🔬",
  },
  {
    icon: <SiGoogleclassroom className="w-12 h-12 mb-4" />,
    title: "Class Rooms",
    desc: "Spacious, well-ventilated and naturally lit for the perfect learning environment. 🌞",
  },
  {
    icon: <BsFillJournalBookmarkFill className="w-12 h-12 mb-4" />,
    title: "Study Hall",
    desc: "Access to essential books and resources for deep learning and exploration. 📚",
  },
];

const Ourfacilities = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // speed of animation
      offset: 120, // trigger distance
      once: true, // animate only once
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="mt-9 mb-10 py-10">
      <Title text="OUR FACILITIES " />

      <div className="container mx-auto py-12 px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:p-10">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-lg p-6 text-center transition-all duration-300 hover:bg-blue-400 hover:text-white cursor-pointer"
              data-aos="zoom-in"
              data-aos-delay={idx * 200} // stagger animation
            >
              <div className="flex justify-center">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ourfacilities;
