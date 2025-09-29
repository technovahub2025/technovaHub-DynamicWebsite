import React from "react";
import CourseCard from "./CourseCard";
import coursebanner from "../../assets/images/coursebanner2.jpg";

const Courses = () => {
  return (
    <div className="w-full">
      {/* Banner Section */}
      <div className="w-full mt-[90px] ">
        <img
          src={coursebanner}
          alt="Course Banner"
          className="w-full  h-auto object-cover md:h-[400px] lg:h-[500px]"
        />
      </div>

      {/* Courses Section */}
      <div className="">
        <CourseCard />
      </div>
    </div>
  );
};

export default Courses;
