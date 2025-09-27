import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../dashboard header/DashboardHeader";
import MainContent from "../MainContent/MainContent";

const LayoutDashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Dynamic content */}
        <MainContent />
      </div>
    </div>
  );
};

export default LayoutDashboard;
