import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import logo from "../../../assets/images/logoremove.png";
import { Link, useNavigate } from "react-router-dom";
import { loginAdmin } from "../../../api/authApi";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginAdmin(userName, password);

      if (data.success && data.token) {
        // Store token & user info
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUser", JSON.stringify(data.user || { userName }));

        toast.success("Admin Login Successful ✅");

        // Redirect to admin dashboard
        navigate("/admin");
      } else {
        toast.error(data.message || "Login failed ❌");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-3  flex  justify-center bg-white ">
      <div className="w-full max-w-6xl md:p-10 p-5 rounded-md md:shadow-xl">
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="rounded-full w-[150px] h-[150px] md:w-[400px] md:h-[400px]" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-blue-900">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="relative">
            <AiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter admin username"
              className="mt-1 block w-full pl-10 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>

          {/* Password with toggle */}
          <div className="relative">
            <AiOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="mt-1 block w-full pl-10 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 top-1/2 -translate-y-1/2 px-3 flex items-center text-gray-500"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          {/* Submit & Back */}
          <div className="flex justify-between mb-10 items-center">
            <Link to="/">
              <p className="mt-3 text-sm  text-blue-400">Back to website</p>
            </Link>
            <button
              type="submit"
              disabled={loading}
              className={`mt-5 bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Go to Admin Dashboard"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
