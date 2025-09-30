import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { addCertificateApi, updateCertificateApi } from "../../../api/certificateApi";

const CertificateAdd = ({ editingCertificate, onDone }) => {
  const [empID, setEmpID] = useState("");
  const [empName, setEmpName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingCertificate) {
      setEmpID(editingCertificate.empID);
      setEmpName(editingCertificate.empName);
    } else {
      setEmpID("");
      setEmpName("");
    }
  }, [editingCertificate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!empID || !empName) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      if (editingCertificate) {
        await updateCertificateApi(editingCertificate._id, { empID, empName });
        toast.success("Certificate updated successfully!");
      } else {
        await addCertificateApi({ empID, empName });
        toast.success("Certificate added successfully!");
      }
      setEmpID("");
      setEmpName("");
      if (onDone) onDone(); // reset form + refresh list
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-xl mb-8">
      <h2 className="text-2xl  mb-6 text-blue-400">
        {editingCertificate ? "Update Certificate" : "Add Certificate"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Employee ID</label>
          <input
            type="text"
            value={empID}
            onChange={(e) => setEmpID(e.target.value)}
            placeholder="Enter Employee ID"
            className="w-full px-3 py-2 bg-white border-none shadow rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Employee Name</label>
          <input
            type="text"
            value={empName}
            onChange={(e) => setEmpName(e.target.value)}
            placeholder="Enter Employee Name"
             className="w-full px-3 py-2 bg-white border-none shadow rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading
              ? editingCertificate
                ? "Updating..."
                : "Adding..."
              : editingCertificate
                ? "Update Certificate"
                : "Add Certificate"}
          </button>
          {editingCertificate && (
            <button
              type="button"
              onClick={() => onDone()}
              className="flex-1 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CertificateAdd;
