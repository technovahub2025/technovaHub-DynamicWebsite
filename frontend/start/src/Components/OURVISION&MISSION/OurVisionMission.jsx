import React from "react";
import Title from "../Title";

const VisionMission = () => {
  return (
    <section className="py-20 bg-gray-50">
      <Title text="OUR VISON & MISSION"/>
      <div className="max-w-6xl mx-auto mt-8   px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vision Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-200 transition duration-300">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            Our vision is to become a nationally recognized hub of excellence in
            technology education, IT services and automation-driven innovation.
            We are dedicated to nurturing future-ready talent and delivering
            transformative digital solutions that empower industries to advance.
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-green-200 transition duration-300">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Mission</h2>
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
