import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const Backtop = () => {
  const [visible, setVisible] = useState(false);

  // Show button after scrolling 300px
  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Custom smooth scroll
  const scrollToTop = () => {
    const scrollDuration = 800; 
    const scrollStep = -window.scrollY / (scrollDuration / 15); 

    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default Backtop;
