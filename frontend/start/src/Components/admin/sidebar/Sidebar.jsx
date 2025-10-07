import React, { useState, useEffect } from "react";
import { Home, Images, BookOpen, Award , Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation(); // current path

  const menuItems = [
  { name: "Home", icon: <Home />, path: "/admin" },
  { name: "Gallery", icon: <Images />, path: "/admin/gallery" },
  { name: "Courses", icon: <BookOpen />, path: "/admin/courses" },

  { name: "Certificate", icon: <Award />, path: "/admin/Certificate" },
   { name: "Quotation", icon: <Award />, path: "/admin/quotation" },
    { name: "Quotation Edit", icon: <Award />, path: "/admin/quotationEdit" },

  
];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    if (window.innerWidth < 768) setIsOpen(false);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 768) setIsOpen(false);
  }, [windowWidth]);

  return (
    <div
      className={`bg-blue-500 text-white h-screen p-4 flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex justify-between items-center mb-8">
        {isOpen && <h1 className="text-xl font-bold">Dashboard</h1>}
        <Menu className="cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-4">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={idx}
              to={item.path}
              className={`flex items-center gap-3 p-2 rounded transition 
                ${isActive ? "bg-blue-200" : "hover:bg-white hover:text-black"}`}
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
