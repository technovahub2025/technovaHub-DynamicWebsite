import React from "react";

// Example certificate data
const certificateData = [
  { id: 1, empID: "EMP001", empName: "John Doe" },
  { id: 2, empID: "EMP002", empName: "Jane Smith" },
  { id: 3, empID: "EMP003", empName: "Michael Johnson" },
];

const CertificateList = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Certificate List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">Sl. No</th>
              <th className="py-2 px-4 border-b text-left">Employee ID</th>
              <th className="py-2 px-4 border-b text-left">Employee Name</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {certificateData.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{item.empID}</td>
                <td className="py-2 px-4 border-b">{item.empName}</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500 transition">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CertificateList;
