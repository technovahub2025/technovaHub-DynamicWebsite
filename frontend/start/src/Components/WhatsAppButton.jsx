import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = ({
  phone = "918438431000", // with country code
  message = "I am interested in the 7 Days Workshop",
  fixed = false, // true = floating button
}) => {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${fixed ? "fixed bottom-4 right-0 z-50" : "inline-block"}`}
    >
      <motion.button
        onClick={handleWhatsAppClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`relative group  flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-5 py-3 rounded-full shadow-lg hover:shadow-green-400/50 transition-all duration-300`}
      >
        {/* WhatsApp Icon */}
        <FaWhatsapp className="w-6 h-6" />

        {/* Button Label (visible only if not floating) */}
        {!fixed && <span>Chat on WhatsApp</span>}

        {/* Pulse effect when fixed */}
        {fixed && (
          <span className="absolute -z-10 w-full h-full rounded-full bg-green-500/40 animate-ping"></span>
        )}

        {/* Tooltip */}
        {fixed && (
          <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300">
            Chat on WhatsApp
          </span>
        )}
      </motion.button>
    </motion.div>
  );
};

export default WhatsAppButton;
