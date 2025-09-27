import React from "react";
import { FaBookReader } from "react-icons/fa";
import { GrWorkshop } from "react-icons/gr";
import { SiGoogleclassroom } from "react-icons/si";
import { BsFillJournalBookmarkFill } from "react-icons/bs";

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
  return (
    <div className="container mx-auto py-12 px-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-lg p-6 text-center transition-all duration-300 hover:bg-blue-600 hover:text-white cursor-pointer"
          >
            <div className="flex justify-center">{card.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-sm">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ourfacilities;
