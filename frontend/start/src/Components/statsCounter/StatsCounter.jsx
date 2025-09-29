import React, { useEffect, useState } from "react";


const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const handle = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(handle);
        setCount(end);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(handle);
  }, [end, duration]);

  return count;
};

const stats = [
  { number: 1300, label: "Students Trained" },
  { number: 800, label: "Entrepreneurs Trained" },
  { number: 10, label: "Awards Won" },
  { number: 15, label: "Courses Offered" },
  { number: 25, label: "Projects Achieved" },
];

export default function StatsCounter() {
  return (
    <section className="w-full py-20 px-7   mt-10 mb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((item, index) => {
            const count = useCounter(item.number);
            return (
              <div
                key={index}
                className="bg-white shadow-md   rounded-2xl p-9 text-center hover:shadow-xl shadow-blue-400 transition duration-300"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
                  {count}+
                </h2>
                <p className="mt-2 text-gray-700 text-sm">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
