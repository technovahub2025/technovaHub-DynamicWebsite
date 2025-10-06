import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logoremove.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Courses Offered", path: "/courses" },
  { name: "Software Solutions", path: "/softwaresolutions" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
  { name: "Gallery", path: "/gallery" },
  { name: "Verify Certificate", path: "/verifyCertificate" },
  { name: "Terms and Conditions", path: "/termsandCondition" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const getLinkClasses = (path) =>
    `text-sm font-semibold transition duration-200 ease-in-out  pt-1 ${
      location.pathname === path
        ? "text-blue-700 border-b-2 border-blue-700"
        : "text-gray-900 hover:text-blue-600 hover:border-b-2 hover:border-blue-400"
    }`;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed  w-full z-50 top-0 overflow-x-hidden">
      <div
        className={`transition-all md:px-10  duration-300 ${
          isScrolled ? "backdrop-blur-md bg-white/30 shadow-md" : "bg-transparent "
        }`}
      >
        <div className="max-w-9xl mx-auto  p-3 md:p-5 ">
          <div className="flex justify-between items-center  h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <div className="w-[130px] h-[130px] md:w-[180px]  md:h-[180px] mt-3 p-4 rounded-lg flex items-center justify-center ">
                  <img src={logo} alt="logo" className="object-contain w-full h-full" />
                  
                </div>
                
              </Link>
            </div>
            

            {/* Desktop nav */}
            <div className="hidden lg:flex h-full items-center space-x-6 flex-wrap">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path} className={getLinkClasses(item.path)}>
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile toggle */}
            <div className="lg:hidden shadow-lg mt-2">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-700 hover:text-blue-600 bg-white border-gray-400 hover:bg-gray-100 focus:ring-2 focus:ring-blue-300"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`transition-all duration-300 backdrop-blur-md bg-white/30  shadow-md h-[100vh] z-10 shadow-lg overflow-hidden ${
            isOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-3 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-2 rounded-md text-base font-sm text-center  border-b  border-white    text-blue-600 hover:bg-blue-700 transition-all duration-300 hover:text-blue-300"
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

    
    </nav>
  );
};

export default Navbar;
