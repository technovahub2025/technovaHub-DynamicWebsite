import React, { useEffect, useState } from "react";
import { getCourseApi } from "../../api/CourseApi";
import Title from "../../Components/Title";

const CourseCard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    <div className="  mt-[90px] md:px-5 px-2">
      {/* Title */}
      <Title text="Courses Offered" />

      <div className="flex justify-center px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-7xl w-full py-2">
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
            courses.map((course) => (
              <SimpleCard
                key={course._id}
                title={course.title}
                description={course.description}
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

const SimpleCard = ({ title, description }) => {
  return (
    <div className="w-full h-64 bg-white rounded-lg shadow-md hover:shadow-xl hover:shadow-blue-300 transition duration-300 p-6 flex flex-col items-center justify-center text-center">
      <h2 className="text-blue-900 text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default CourseCard;
