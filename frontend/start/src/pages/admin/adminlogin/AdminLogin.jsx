import React from "react";
import loginImage from "../../../assets/images/logoremove.png"; 
import { Link } from "react-router-dom";

const AdminLogin = () => {
  return (
    <div className="min-h-screen flex ">
      {/* Left Image - hidden on mobile/tablet */}
      <div className="hidden bg-white shadow-xl  md:flex w-1/2 ">
        <img
          src={loginImage}
          alt="Admin Login"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6  bg-blue-50">
        <div className="w-full max-w-xl p-8  space-y-6">
          <h2 className="text-3xl font-bold text-blue-500 text-center">
            Admin Login
          </h2>

          <form className="space-y-4">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="admin@example.com"
                className="mt-1 block w-full px-4 py-2 outline-blue-300  border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="********"
                className="mt-1 block w-full px-4 py-2 outline-blue-300 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-md shadow  transition duration-300"
            >
              Submit
            </button>
          </form>

         <Link to="/">
                 <h2 className="text-blue-500 text-center ">Back to Website</h2>
         </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
