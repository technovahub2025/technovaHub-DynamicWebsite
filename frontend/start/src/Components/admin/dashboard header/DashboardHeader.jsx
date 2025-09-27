import React from 'react';
import { Bell, User } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-blue-500 "> TechnovaHub Dashboard</h2>
      <div className="flex items-center gap-4">
        <User className="w-6 h-6 cursor-pointer" />
      </div>
    </header>
  );
};

export default DashboardHeader;
