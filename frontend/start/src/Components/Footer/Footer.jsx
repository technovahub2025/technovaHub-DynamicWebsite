import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-blue-500  via-purple-500 to-blue-400 text-white pt-16 pb-8">
      {/* Decorative top curve */}
      <div className="absolute -top-8 left-0 w-full h-16 bg-white/10 rounded-b-full"></div>

      <div className=" mx-auto px-6 md:px-20 flex flex-col md:flex-row justify-between gap-10">
        {/* Brand & Description */}
        <div className="md:w-1/3">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide mb-4">TechnovaHub</h1>
          <p className="text-gray-200 mb-6">
            Empowering your digital journey with innovative solutions, cutting-edge courses, and modern tech services.
          </p>

          {/* Social icons */}
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-100 transition-transform transform hover:scale-125">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-gray-100 transition-transform transform hover:scale-125">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-gray-100 transition-transform transform hover:scale-125">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-gray-100 transition-transform transform hover:scale-125">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:w-1/3 flex items-center justify-center  gap-4">
          
          <Link to="/" className="hover:text-gray-200 transition">Home</Link>
          <Link to="/about" className="hover:text-gray-200 transition">About</Link>
          <Link to="/courses" className="hover:text-gray-200 transition">Courses</Link>
          <Link to="/contact" className="hover:text-gray-200 transition">Contact</Link>
          <Link to="/adminlogin" className="hover:text-gray-200 font-semibold transition">Admin</Link>
        </div>

       
      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center text-sm text-gray-100/80 border-t border-white/20 pt-4">
        © {new Date().getFullYear()} TechnovaHub. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
