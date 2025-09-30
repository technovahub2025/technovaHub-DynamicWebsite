import React, { useState, useEffect } from "react";
import { X } from "lucide-react"; 
import poster from "../../assets/images/time_management.jpg";

const PosterPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPoster = localStorage.getItem("posterSeen");

    if (!hasSeenPoster) {
      setShowPopup(true); // Show only if not seen before
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem("posterSeen", "true"); // Save that user has seen popup
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transaprent  z-50">
      <div className="relative bg-white p-2 rounded-xl shadow-lg max-w-md w-full">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        {/* Poster Image */}
        <img
          src={poster}
          alt="Poster"
          className="rounded-lg w-full h-auto"
        />
      </div>
    </div>
  );
};

export default PosterPopup;
