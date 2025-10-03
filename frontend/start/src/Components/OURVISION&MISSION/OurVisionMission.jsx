import React, { useEffect } from "react";
import Title from "../Title";
import AOS from "aos";
import "aos/dist/aos.css";

const VisionMission = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration (ms)
      offset: 100,    // trigger point
      once: true,     // animate only once
    });
  }, []);

  return (
    <section className="py-15 md:mb-10 bg-gray-50 md:py-20">
      <div data-aos="fade-up">
        <Title text="OUR VISION & MISSION" />
      </div>

      <div className="max-w-6xl mx-auto mt-8 px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vision Card */}
        <div
          className="bg-white p-8 rounded-2xl shadow-2xl hover:shadow-2xl border border-blue-300 hover:shadow-blue-200 transition duration-300"
          data-aos="fade-right"
        >
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            Our vision is to become a nationally recognized hub of excellence in
            technology education, IT services and automation-driven innovation.
            We are dedicated to nurturing future-ready talent and delivering
            transformative digital solutions that empower industries to advance.
          </p>
        </div>

        {/* Mission Card */}
        <div
          className="bg-white p-8 rounded-2xl shadow-2xl border border-blue-300 hover:shadow-2xl hover:shadow-blue-200 transition duration-300"
          data-aos="fade-left"
        >
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to empower learners with industry-relevant skills
            through hands-on training and real-world projects. We bridge the gap
            between academic learning and practical application to create
            future-ready professionals. We also support businesses with
            automation and IT solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
