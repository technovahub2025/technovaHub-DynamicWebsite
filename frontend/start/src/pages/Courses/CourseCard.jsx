import React, { useEffect, useState } from "react";
import { getCourseApi } from "../../api/CourseApi";
import Title from "../../Components/Title";
import AOS from "aos";
import "aos/dist/aos.css";

const CourseCard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Initialize AOS
    AOS.init({
      duration: 1000, // animation duration
      offset: 100,    // how far from viewport the animation triggers
      once: true,     // animate only once
    });

    const fetchData = async () => {
      try {
        const response = await getCourseApi();
        setCourses(response.data || []); // API returns { data: [...] }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-3 md:px-5 px-2">
      {/* Title */}
      <div data-aos="fade-up">
        <Title text="Courses Offered" />
      </div>

      <div className="flex justify-center mt-5 px-4">
        <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-7xl w-full py-2">
          {/* Loading State */}
          {loading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-full h-64 bg-gray-200 animate-pulse rounded-lg"
                />
              ))}
            </>
          ) : courses.length > 0 ? (
            courses.map((course, index) => (
              <SimpleCard
                key={course._id}
                title={course.title}
                description={course.description}
                aosDelay={index * 200} // stagger effect
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No courses available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const SimpleCard = ({ title, description, aosDelay }) => {
  return (
    <div
      className="w-full h-64 bg-white rounded-lg shadow-md  hover:shadow-xl hover:shadow-blue-300 transition duration-300 p-6 flex flex-col items-center justify-center text-center"
      data-aos="fade-up"
      data-aos-delay={aosDelay} // staggered animation
    >
      <h2 className="text-blue-500 text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default CourseCard;
