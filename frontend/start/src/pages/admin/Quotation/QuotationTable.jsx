import React, { useEffect, useState } from "react";
import { getQuotation, deleteQuotation } from "../../../api/quotationApi";

const QuotationTable = ({ onEdit }) => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const fetchQuotations = async () => {
    try {
      setLoading(true);
      const data = await getQuotation();
      setQuotations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteQuotation(id);
      alert("Deleted successfully!");
      fetchQuotations();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  const handleEdit = (quotation) => {
    if (onEdit) onEdit(quotation);
  };

 if (loading) return (
<div className="flex items-center justify-center h-[50vh] ">
      <div className="loader"></div>
    </div>
  ) 

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = quotations.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(quotations.length / rowsPerPage);

  return (
    <div className="mt-6 rounded-lg overflow-hidden border border-gray-200 shadow-lg">
      {/* Scrollable container for mobile */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-[1000px] w-full text-sm">
          <thead className="bg-gradient-to-r from-blue-300 to-indigo-300 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">HSN</th>
              <th className="py-3 px-4 text-left">GST %</th>
              <th className="py-3 px-4 text-left">Due ON</th>
              <th className="py-3 px-4 text-left">Batch</th>
              <th className="py-3 px-4 text-left">Qty</th>
              <th className="py-3 px-4 text-left">Rate</th>
              <th className="py-3 px-4 text-left">Unit</th>
              <th className="py-3 px-4 text-left">Discount %</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRows.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center py-6 text-gray-500">
                  No quotations found.
                </td>
              </tr>
            ) : (
              currentRows.map((q, idx) => (
                <tr
                  key={q._id}
                  className={`transition hover:bg-blue-50 ${
                    idx % 2 === 0 ? "bg-gray-50" : ""
                  }`}
                >
                  <td className="py-2 px-4">{q.desc}</td>
                  <td className="py-2 px-4">{q.hsn}</td>
                  <td className="py-2 px-4">{q.gst}%</td>
                  <td className="py-2 px-4">
                    {q.dueOn ? new Date(q.dueOn).toLocaleDateString() : "-"}
                  </td>
                  <td className="py-2 px-4">{q.batch}</td>
                  <td className="py-2 px-4">{q.qty}</td>
                  <td className="py-2 px-4">{q.rate}</td>
                  <td className="py-2 px-4">{q.unit}</td>
                  <td className="py-2 px-4">{q.discount}</td>
                  <td className="py-2 px-4 font-semibold">{q.amount}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(q)}
                      className="px-3 py-1 bg-yellow-400 text-white rounded shadow hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(q._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded shadow hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 py-3 bg-gray-50 flex-wrap">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === idx + 1
                ? "bg-blue-500 text-white shadow"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuotationTable;
