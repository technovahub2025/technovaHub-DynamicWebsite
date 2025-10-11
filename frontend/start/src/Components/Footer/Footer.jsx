import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (

    <section id="footer">
 <footer className="relative bg-gradient-to-r from-gray-100 via-white to-slate-50 text-gray-700 shadow-lg border-4 border-t border-blue-500 pt-16 pb-8">
      {/* Decorative top curve */}
      <div className="absolute -top-8 left-0 w-full h-16 bg-white/30 rounded-b-full"></div>

      <div className="mx-auto px-6 md:px-20 flex flex-col md:flex-row justify-between gap-10">
        {/* Brand & Description */}
        <div className="md:w-1/3">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide mb-4 text-blue-500">
            TechnovaHub
          </h1>
          <p className="text-gray-600 mb-6">
            Empowering your digital journey with innovative solutions, cutting-edge courses, and modern tech services.
          </p>

          {/* Social icons */}
          <div className="flex space-x-4 text-gray-500">
            <a href="#" className="hover:text-blue-500 transition-transform transform hover:scale-125">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-500 transition-transform transform hover:scale-125">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-500 transition-transform transform hover:scale-125">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-500 transition-transform transform hover:scale-125">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:w-1/3 flex flex-col md:flex-row items-start md:items-center justify-center gap-4 text-gray-700">
          <Link to="/" className="hover:text-blue-500 transition">Home</Link>
          <Link to="/about" className="hover:text-blue-500 transition">About</Link>
          <Link to="/courses" className="hover:text-blue-500 transition">Courses</Link>
          <Link to="/contact" className="hover:text-blue-500 transition">Contact</Link>
          <Link to="/adminlogin" className="hover:text-blue-500 font-semibold transition">Admin</Link>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-200 pt-4">
        © {new Date().getFullYear()} TechnovaHub. All Rights Reserved.
      </div>
    </footer>
    </section>
   
  );
};

export default Footer;
