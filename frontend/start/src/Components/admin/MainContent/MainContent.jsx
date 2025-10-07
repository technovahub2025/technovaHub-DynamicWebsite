import React from "react";
import logo from "../../../assets/images/logoremove.png";
import { Routes, Route, Link } from "react-router-dom";
import GalleryImage from "../../../pages/admin/GalleryImage";
import CourseAdmin from "../../../pages/admin/Courses/CourseAdmin";
import CertificateAdmin from "../../../pages/admin/CertificateAdmin/CertificateAdmin";
import QuotationUI from "../../../pages/admin/Quotation/Quotation";
import QuotationForm from "../../../pages/admin/Quotation/QuotationForm";
import QuotationManager from "../../../pages/admin/Quotation/QuotationManager";

const HomePage = () => (
  <div className="p-4 flex flex-col  justify-center items-center h-[60vh] ">
    <img src={logo} alt="" />
    <h1 className="md:text-4xl text-blue-900 font-bold">
      Welcome to Technova Hub
    </h1>
    <Link to="/" className="mt-10 bg-blue-500 p-5 px-5 text-white rounded-md border-1 border-white ">
         Go to Website
    </Link>
  </div>
);
const Gallery = () => (
  <div className="p-4">
    <GalleryImage />
  </div>
);
const Course = () => (
  <div className="p-4">
    <CourseAdmin />
  </div>
);
const Certificate = () => (
  <div className="p-4">
    <CertificateAdmin />
  </div>
);

const Quotation = () => (
  <div className="p-4">
  <QuotationUI/>
  </div>
);


const QuotationEdit = () => (
  <div className="p-4">
<QuotationManager/>
  </div>
);



const MainContent = () => {
  return (
    <main className="flex-1 overflow-auto bg-gray-100 ">
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="certificate" element={<Certificate />} />
        <Route path="courses" element={<Course />} />
        <Route path="quotation" element={<Quotation />} />
        <Route path="quotationEdit" element={<QuotationEdit />} />


       
      </Routes>
    </main>
  );
};

export default MainContent;
