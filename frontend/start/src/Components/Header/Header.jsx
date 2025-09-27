import React, { useState, useEffect } from "react";
import { Menu, X, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logoremove.png";

// Nav items
const navItems = [
  { name: "Home", path: "/" },
  { name: "Courses Offered", path: "/courses" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
  { name: "Gallery", path: "/gallery" },
  { name: "Verify Certificate", path: "/verifyCertificate" },
  { name: "Terms and Condition", path: "/termsandCondition" },
];

// Contact info
const contactInfo = [
  { icon: MapPin, value: "48, Lawspet Main Road, Pudhucherry", isLink: false },
  { icon: Phone, value: "9360962810", isLink: true, type: "tel" },
  { icon: Mail, value: "technovahubcareer@gmail.com", isLink: true, type: "mailto" },
  { icon: Clock, value: "Mon-Sat: 9:00 AM - 9:00 PM", isLink: false },
];

// Top bar item
const TopBarItem = ({ Icon, value, isLink, type }) => {
  const Element = isLink ? "a" : "div";
  const linkProps = isLink
    ? { href: `${type}:${value}`, target: type === "tel" ? "_self" : "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Element
      className="flex items-center text-xs sm:text-sm font-medium space-x-1.5 mx-4 shrink-0"
      {...linkProps}
    >
      <Icon className="w-4 h-4 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
      <span className="truncate">{value}</span>
    </Element>
  );
};

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
    <nav className="fixed w-full z-50 top-0">
      {/* TOP BAR */}
      <div className="bg-[#3B82F6] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
          <div className="overflow-x-auto whitespace-nowrap flex animate-marquee">
            {contactInfo.map((item, i) => (
              <TopBarItem key={i} {...item} Icon={item.icon} />
            ))}
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div
        className={`transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <span className="text-2xl font-extrabold text-blue-800 flex items-center">
                  <div className="w-10 h-10 mr-2 rounded-lg flex items-center justify-center shadow-inner">
                    <img src={logo} alt="logo" />
                  </div>
                  <span className="text-blue-900 text-[20px] md:text-xl">TechnovaHub</span>
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
            <div className="lg:hidden  ">
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
          className={`transition-all duration-300 bg-white  shadow-lg ease-in-out overflow-hidden ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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
  );
};

export default Navbar;
