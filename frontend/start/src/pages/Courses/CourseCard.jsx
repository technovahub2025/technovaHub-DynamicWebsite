import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { getCourseApi } from "../../api/CourseApi";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const CourseCard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCourseApi(); 
        setCourses(response.data || []); // ensure array
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 max-w-6xl w-full py-6">
        {courses.map((course) => (
          <TiltCard key={course._id} title={course.title} description={course.description} />
        ))}
      </div>
    </div>
  );
};

const TiltCard = ({ title, description }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 120, damping: 14 });
  const ySpring = useSpring(y, { stiffness: 120, damping: 14 });

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", transform }}
      className="relative w-full h-64 rounded-xl bg-gradient-to-br from-white to-blue-500 cursor-pointer"
    >
      <div
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg p-6"
      >
        <h2
          style={{ transform: "translateZ(30px)" }}
          className="text-center text-base md:text-xl font-bold mb-2"
        >
          {title}
        </h2>
        <p
          style={{ transform: "translateZ(20px)" }}
          className="text-center text-xs md:text-sm text-gray-600"
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default CourseCard;
