import React, { useState, useEffect } from "react";
import { X } from "lucide-react"; 
import poster from "../../assets/images/time_management.jpg";

const PosterPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check session storage (reset every new tab or browser open)
    const hasSeenPoster = sessionStorage.getItem("posterSeen");

    if (!hasSeenPoster) {
      setShowPopup(true); // show only once per session
      sessionStorage.setItem("posterSeen", "true"); 
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative bg-white p-2 rounded-xl shadow-lg max-w-md w-full">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        {/* Poster Image */}
        <img src={poster} alt="Poster" className="rounded-lg w-full h-auto" />
      </div>
    </div>
  );
};

export default PosterPopup;
