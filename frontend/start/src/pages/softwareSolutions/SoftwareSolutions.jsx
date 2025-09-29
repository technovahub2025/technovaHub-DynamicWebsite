import React, { useEffect, useState } from "react";
import Title from "../../Components/Title";
import { getSoftwareSolutionApi } from "../../api/softwareSolutionApi";

const SoftwareSolutions = () => {
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
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
      <Title text="Software Solutions" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mt-3  ">
        {solutions.length > 0 ? (
          solutions.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-xl shadow-md hover:shadow-xl hover:shadow-blue-300 transition duration-300 p-10   border border-gray-200 hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-bold text-[#002f6c] mb-2">
                {item.title}
              </h2>
              <p className="text-gray-600">{item.description}</p>
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
