import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./Components/Header/Header";
import TermsAndCondition from "./pages/TermsAndCondition";
import Footer from "./Components/Footer/Footer";
import AdminLogin from "./pages/admin/adminlogin/AdminLogin";
import Contact from "./pages/Contact";

// Wrapper to use location
const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/adminlogin"; 

  return (
    <div>
      {!hideHeaderFooter && <Navbar />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/termsandCondition" element={<TermsAndCondition />} />
          <Route path="/contact" element={<Contact />} />


          <Route path="/adminlogin" element={<AdminLogin />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
