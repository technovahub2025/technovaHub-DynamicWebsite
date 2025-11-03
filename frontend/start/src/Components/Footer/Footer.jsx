import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <section id="footer" className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Decorative Top Glow */}
      <div className="absolute -top-10 left-0 w-full h-20 bg-gradient-to-r from-blue-300/40 via-blue-200/40 to-transparent blur-2xl"></div>

      <footer className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 text-transparent bg-clip-text mb-4 drop-shadow-md">
              TechnovaHub
            </h1>
            <p className="text-gray-600 leading-relaxed max-w-sm mx-auto md:mx-0">
              Empowering your digital journey with innovative solutions, cutting-edge courses, and modern tech services.
            </p>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-start space-x-5 mt-6">
              {[
                { icon: <FaFacebookF />, color: "hover:text-blue-600" },
                { icon: <FaTwitter />, color: "hover:text-sky-500" },
                { icon: <FaInstagram />, color: "hover:text-pink-500" },
                { icon: <FaLinkedinIn />, color: "hover:text-blue-700" },
              ].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className={`text-gray-500 ${item.color} transform hover:scale-125 transition-all duration-300`}
                >
                  <div className="p-3 rounded-full bg-white/50 backdrop-blur-md shadow-md hover:shadow-lg">
                    {item.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              Quick Links
            </h2>
            <ul className="flex flex-col space-y-3 text-gray-700 font-medium">
              <li>
                <Link to="/" className="hover:text-blue-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600 transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-blue-600 transition">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-600 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/adminlogin"
                  className="text-blue-700 font-semibold hover:text-blue-800 transition"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Extra Info */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for updates on the latest courses and tech trends.
            </p>
            <div className="flex justify-center md:justify-start items-center bg-white shadow-inner rounded-full p-1 border border-blue-100 max-w-sm mx-auto md:mx-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 outline-none text-gray-700 bg-transparent"
              />
              <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2 rounded-full font-medium hover:shadow-md hover:scale-105 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="relative mt-12 border-t border-blue-200 pt-6 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-blue-600">TechnovaHub</span>. All
          Rights Reserved.
        </div>
      </footer>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-32 bg-gradient-to-t from-blue-200/40 to-transparent blur-3xl rounded-full"></div>
    </section>
  );
};

export default Footer;
