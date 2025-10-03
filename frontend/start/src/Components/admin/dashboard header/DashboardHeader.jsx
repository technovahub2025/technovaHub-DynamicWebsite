import React from "react";
import { FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../../api/authApi"; 
import { toast } from "react-toastify";

const DashboardHeader = () => {
  const navigate = useNavigate();

  // Get adminUser from localStorage
  const adminUser = JSON.parse(localStorage.getItem("adminUser") || '{}');
  const userName = adminUser.userName || "Admin";

  const handleLogout = async () => {
    try {
      await logoutAdmin();
       localStorage.removeItem("adminToken"); 
      localStorage.removeItem("adminUser"); 
      toast.success("Logout Successfully")
      navigate("/adminlogin"); 
    } catch (err) {
      toast.error("Logout failed:", err.message || err);
      
    }
  };

  return (
    <header className="bg-white shadow md:p-4 p-2 flex justify-between items-center">
      <h2 className="md:text-xl  text-sm font-semibold text-blue-500">TechnovaHub </h2>
      <div className="flex items-center gap-4">
        <span className="text-blue-700 text-[10px] md:text-sm  uppercase">{userName}</span>
        <button
          onClick={handleLogout}
          className=" shadow-xl md:p-2 p-2 md:px-3 rounded-full md:px-4 cursor-pointer bg-red-600 text-white"
        >
         <FaPowerOff />
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
