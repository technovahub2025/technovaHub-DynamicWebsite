import React from "react";
import { Routes, Route } from "react-router-dom";
import GalleryImage from "../../../pages/admin/GalleryImage";
import CourseAdmin from "../../../pages/admin/Courses/CourseAdmin";
import CertificateAdmin from "../../../pages/admin/CertificateAdmin/CertificateAdmin";

const HomePage = () => <div className="p-4">Back to website</div>;
const Gallery = () => <div className="p-4"><GalleryImage /></div>;
const Course = () => <div className="p-4"><CourseAdmin/></div>
const Certificate = () => <div className="p-4"><CertificateAdmin/></div>;

const SettingsPage = () => <div className="p-4">Settings Content</div>;

const MainContent = () => {
  return (
    <main className="flex-1 overflow-auto bg-gray-100 min-h-screen">
      <Routes>
        <Route path="" element={<HomePage />} /> {/* default admin page */}
        <Route path="gallery" element={<Gallery />} />
        <Route path="certificate" element={<Certificate />} />
        <Route path="courses" element={<Course />} />


        <Route path="settings" element={<SettingsPage />} />
      </Routes>
    </main>
  );
};

export default MainContent;
