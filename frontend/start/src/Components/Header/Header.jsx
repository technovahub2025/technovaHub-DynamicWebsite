import React, { useState } from 'react';
import Logo from "../../assets/images/logoremove.png";
import { Link } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Courses offered", path: "/products" },
    { name: "About Us", path: "/articles" },
    { name: "Gallery", path: "/random" },
    { name: "Verify Certificate", path: "/about" },
    { name: "Terms and Conditions", path: "/termsandCondition" },
  ];

  return (
    <header className="p-5 md:p-0 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className='flex justify-center items-center gap-3'>
          <Link
            className="block box-border h-16 w-16 md:h-20 md:w-20 overflow-hidden rounded-full transform hover:scale-110"
            to="/"
          >
            <img
              className="h-full w-full object-cover"
              src={Logo}
              alt="Logo"
            />
          </Link>
          <span>TechnovaHub</span>
        </div>

        <div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="z-50 md:hidden relative"
          >
            <span className="sr-only">Toggle Menu</span>
            { !menuOpen ? (
              <div className="h-7 flex flex-col items-end justify-between">
                <span className="block h-0.5 w-8 bg-red-900 rounded-full"></span>
                <span className="block h-0.5 w-6 bg-red-900 rounded-full"></span>
                <span className="block h-0.5 w-8 bg-red-900 rounded-full"></span>
              </div>
            ) : (
              <div className="h-7 flex flex-col items-end justify-between">
                <span className="block h-0.5 w-8 bg-red-100 rounded-full origin-left transform rotate-45 translate-y-0.5"></span>
                <span className="block h-0.5 w-8 bg-red-100 rounded-full origin-left transform -rotate-45 -translate-y-0.5"></span>
              </div>
            )}
          </button>

          {/* Navigation Menu */}
          <div
            className={`${
              menuOpen ? '' : 'hidden'
            } md:block font-bold text-red-100 text-right text-3xl bg-gray-800 fixed top-0 left-0 h-screen w-screen flex flex-col items-center justify-center md:text-lg md:relative md:text-red-900 md:bg-transparent md:w-auto md:h-auto md:text-left`}
          >
            <ul className="flex flex-col gap-y-7 md:flex-row md:gap-2">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`md:px-4 ${
                    index !== menuItems.length - 1 ? "md:border-r md:border-red-200" : ""
                  }`}
                >
                  <Link
                    to={item.path}
                    title={`Go to ${item.name}`}
                    className="transition ease-in-out duration-150 hover:line-through"
                    onClick={() => setMenuOpen(false)} // close menu on click
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
