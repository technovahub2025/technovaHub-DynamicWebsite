import React from "react";

// Example course data (replace with API or props later)
const courseData = [
  { id: 1, title: "React Basics", description: "Introduction to React and components." },
  { id: 2, title: "Node.js Fundamentals", description: "Learn backend development with Node.js." },
  { id: 3, title: "Machine Learning", description: "Beginner-friendly ML concepts and models." },
];

const CourseList = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Course List</h2>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          {/* Table Head */}
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b text-left text-gray-600 font-medium">
                Sl. No
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-600 font-medium">
                Title
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-600 font-medium">
                Description
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-600 font-medium">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {courseData.map((course, index) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b font-medium text-gray-800">
                  {course.title}
                </td>
                <td className="py-2 px-4 border-b text-gray-600">
                  {course.description}
                </td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500 transition">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseList;
