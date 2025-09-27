import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-6 mt-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Brand */}
        <h1 className="text-2xl font-bold">TechnovaHub</h1>

        {/* Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link
            to="/"
            className="hover:text-gray-200 transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-gray-200 transition"
          >
            About
          </Link>
          <Link
            to="/courses"
            className="hover:text-gray-200 transition"
          >
            Courses
          </Link>
          <Link
            to="/contact"
            className="hover:text-gray-200 transition"
          >
            Contact
          </Link>
          <Link
            to="/adminlogin"
            className="hover:text-gray-200 font-semibold transition"
          >
            Admin
          </Link>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-sm mt-4 text-gray-200">
        © {new Date().getFullYear()} TechnovaHub. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
