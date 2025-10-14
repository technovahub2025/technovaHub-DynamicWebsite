import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <section id="footer">
      <footer className="relative bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-700 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-blue-300 pt-16 pb-8 overflow-hidden">

        {/* Decorative top wave */}
        <div className="absolute -top-8 left-0 w-full h-16 bg-gradient-to-r from-blue-200/40 to-blue-50/40 rounded-b-full blur-sm"></div>

        <div className="relative z-10 mx-auto px-6 md:px-20 flex flex-col md:flex-row justify-between gap-12">

          {/* Brand & Description */}
          <div className="md:w-1/3">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
              TechnovaHub
            </h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Empowering your digital journey with innovative solutions, cutting-edge courses, and modern tech services.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 text-gray-500">
              <a href="#" className="hover:text-blue-600 transition-transform transform hover:scale-125">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-blue-600 transition-transform transform hover:scale-125">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-pink-500 transition-transform transform hover:scale-125">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-blue-700 transition-transform transform hover:scale-125">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:w-1/3 flex flex-wrap md:flex-row items-start justify-center gap-4 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            <Link to="/about" className="hover:text-blue-600 transition">About</Link>
            <Link to="/courses" className="hover:text-blue-600 transition">Courses</Link>
            <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
            <Link to="/adminlogin" className="hover:text-blue-700 font-semibold transition">Admin</Link>
          </div>
        </div>

        {/* Decorative bottom gradient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-24 bg-gradient-to-t from-blue-200/30 to-transparent blur-2xl rounded-full"></div>

        {/* Bottom Line */}
        <div className="relative mt-10 text-center text-sm text-gray-600 border-t border-blue-200 pt-4">
          © {new Date().getFullYear()} <span className="font-semibold text-blue-600">TechnovaHub</span>. All Rights Reserved.
        </div>
      </footer>
    </section>
  );
};

export default Footer;
