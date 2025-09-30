import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
 
  const isAuthenticated = localStorage.getItem("adminToken"); 

  if (!isAuthenticated) {
    
    return <Navigate to="/adminlogin" replace />;
  }

 
  return children;
};

export default ProtectedRoute;
