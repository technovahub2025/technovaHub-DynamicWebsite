import React from "react";
import CourseCard from "./CourseCard";


const Courses = () => {
  return (
    <div className="w-full">
      {/* Banner Section */}

      <div className="mt-[100px] md:mt-[100px]">
<hr className="text-transparent" />
      </div>
    
      {/* Courses Section */}
      <div className="">
        <CourseCard />
      </div>
    </div>
  );
};

export default Courses;
