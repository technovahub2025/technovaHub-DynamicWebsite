import React, { useState } from "react";

const CertificateAdd = () => {
  const [empID, setEmpID] = useState("");
  const [empName, setEmpName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!empID || !empName) {
      alert("Please fill in all fields!");
      return;
    }

    // Handle certificate add logic here (e.g., API call)
    alert(`Certificate added for ${empName} (ID: ${empID})`);

    // Clear fields
    setEmpID("");
    setEmpName("");
  };

  return (
    <div className="p-6 max-w-8xl mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add Certificate</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Employee ID */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Employee ID
          </label>
          <input
            type="text"
            value={empID}
            onChange={(e) => setEmpID(e.target.value)}
            placeholder="Enter Employee ID"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Employee Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Employee Name
          </label>
          <input
            type="text"
            value={empName}
            onChange={(e) => setEmpName(e.target.value)}
            placeholder="Enter Employee Name"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Add Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Certificate
        </button>
      </form>
    </div>
  );
};

export default CertificateAdd;
