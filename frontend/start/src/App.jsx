import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./Components/Header/Header";
import TermsAndCondition from "./pages/TermsAndCondition";
import Footer from "./Components/Footer/Footer";
import AdminLogin from "./pages/admin/adminlogin/AdminLogin";
import Contact from "./pages/Contact";
import About from "./pages/Aboutpage/About";
import LayoutDashboard from "./Components/admin/layout/LayoutDashboard";
import VerifyCertificate from "./pages/verifyCertificate/VerifyCertificate";

import Courses from "./pages/Courses/Courses";

import GalleryPages from "./pages/Gallery/GalleryPages";
import WhatsAppButton from "./Components/whatappsup/WhatsAppButton";
import SoftwareSolutions from "./pages/softwareSolutions/SoftwareSolutions";
import PosterPopup from "./Components/popup/PosterPopup";
import ProtectedRoute from "./Components/protectRoutes/ProtectedRoute";
// import Backtop from "./Components/Backtop/Backtop";

// Wrapper to use location
const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname.startsWith("/admin");

  return (
    <div>
      {!hideHeaderFooter && <Navbar />}
      {children}
      {!hideHeaderFooter && <Footer />}
      {/* {!hideHeaderFooter && <Backtop />} */}
      {!hideHeaderFooter && <WhatsAppButton />}
      {!hideHeaderFooter && <PosterPopup />}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/verifyCertificate" element={<VerifyCertificate />} />
          <Route path="/gallery" element={<GalleryPages />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/softwaresolutions" element={<SoftwareSolutions />} />

          <Route path="/termsandCondition" element={<TermsAndCondition />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin */}
          <Route path="/adminlogin" element={<AdminLogin />} />

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <LayoutDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
