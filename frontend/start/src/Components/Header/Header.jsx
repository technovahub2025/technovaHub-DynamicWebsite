import React, { useState, useEffect } from "react";
import { Menu, X, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logoremove.png";

// Nav items
const navItems = [
  { name: "Home", path: "/" },
  { name: "Courses Offered", path: "/courses" },
  { name: "Software Solutions", path: "/softwaresolutions" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
  { name: "Gallery", path: "/gallery" },
  { name: "Verify Certificate", path: "/verifyCertificate" },
  { name: "Terms and Condition", path: "/termsandCondition" },
];



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const getLinkClasses = (isCurrent) =>
    `text-sm font-semibold transition duration-200 ease-in-out px-1 pt-1 ${
      isCurrent
        ? "text-blue-700 border-b-2 border-blue-700"
        : "text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-400"
    }`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (

    <>
     <nav className="fixed w-full  z-50 top-0 ">
     

      {/* MAIN NAVBAR */}
      <div
        className={` md:p-5   transition-all duration-300 ${
          isScrolled ? "backdrop-blur-md bg-white/30 shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-9xl mx-auto px-1 sm:px-5 lg:px-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <span className="text-2xl font-extrabold text-blue-800 flex items-center">
                  <div className="w-[140px] h-10 md:w-[200px] mt-10 md:mt-5 md:h-[60px] mr-2 rounded-lg flex items-center justify-center shadow-inner">
                    <img src={logo} alt="logo" />
                  </div>
                
                 
                </span>
              </Link>
            </div>

            {/* Desktop nav */}
            <div className="hidden lg:flex h-full items-stretch space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center ${getLinkClasses(item.current)}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile toggle */}
            <div className="lg:hidden  mt-7 px-3 ">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-700 hover:text-blue-600 bg-white border-gray-400  hover:bg-gray-100 focus:ring-2 focus:ring-blue-300"
              >
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4 " />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`transition-all duration-300 bg-white mt-9   shadow-lg ease-in-out overflow-hidden ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3  space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600`}
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind marquee animation */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(50%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: inline-flex;
            animation: marquee 20s linear infinite;
          }
        `}
      </style>
    </nav>
    </>
   
  );
};

export default Navbar;
