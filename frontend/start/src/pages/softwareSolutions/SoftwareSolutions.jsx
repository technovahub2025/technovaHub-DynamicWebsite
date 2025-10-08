import React, { useEffect, useState } from "react";
import Title from "../../Components/Title";
import { getSoftwareSolutionApi } from "../../api/softwareSolutionApi";
import AOS from "aos";
import "aos/dist/aos.css";

const SoftwareSolutions = () => {
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    // ✅ Initialize AOS
    AOS.init({
      duration: 1000, // animation duration
      offset: 100,    // distance before animation triggers
      once: true,     // animate only once
    });

    const fetchData = async () => {
      try {
        const response = await getSoftwareSolutionApi();
        setSolutions(response.data || []); // use only the "data" array
      } catch (error) {
        console.error("Error fetching software solutions:", error);
        setSolutions([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-[100px] px-5">
      <div data-aos="fade-up">
        <Title text="Software Solutions" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-6 lg:grid-cols-3 max-w-5xl mx-auto mt-3">
        {solutions.length > 0 ? (
          solutions.map((item, index) => (
            <div
              key={item._id}
              className="bg-white shadow-lg text-center   rounded-xl hover:shadow-xl hover:shadow-blue-300 transition duration-300 p-10 "
              data-aos="fade-up"
              data-aos-delay={index * 200} // stagger effect
            >
              <h2 className="text-md lg:text-lg mb-5 font-bold text-blue-500 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-600 text-sm md:text-md lg:text-lg">{item.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No software solutions available.
          </p>
        )}
      </div>
    </div>
  );
};

export default SoftwareSolutions;
