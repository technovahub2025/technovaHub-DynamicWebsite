import React, { useEffect, useState } from "react";
import { getQuotation, deleteQuotation } from "../../../api/quotationApi";

const QuotationTable = ({ onEdit }) => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [batchFilter, setBatchFilter] = useState("");
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
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
      fetchQuotations();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  const handleEdit = (quotation) => {
    if (onEdit) onEdit(quotation);
  };

  // Filter logic
  const filteredQuotations = quotations.filter((q) => {
    const matchesBatch = batchFilter ? q.batch === batchFilter : true;
    const matchesRate =
      (!minRate || q.rate >= parseFloat(minRate)) &&
      (!maxRate || q.rate <= parseFloat(maxRate));
    const matchesSearch = q.desc
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesBatch && matchesRate && matchesSearch;
  });

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredQuotations.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredQuotations.length / rowsPerPage);

  const uniqueBatches = [...new Set(quotations.map((q) => q.batch).filter(Boolean))];

  const handleClearFilters = () => {
    setBatchFilter("");
    setMinRate("");
    setMaxRate("");
    setSearchTerm("");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="mt-6 p-4 bg-white shadow-xl rounded-xl border border-gray-200">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:flex-wrap gap-10 mb-8">
        <div className="flex flex-col w-full sm:w-64">
          <label className="text-gray-700 font-medium mb-1">Search Description</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter description..."
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
          />
        </div>

        <div className="flex flex-col w-full sm:w-48">
          <label className="text-gray-700 font-medium mb-1">Filter by Batch</label>
          <select
            value={batchFilter}
            onChange={(e) => setBatchFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
          >
            <option value="">All Batches</option>
            {uniqueBatches.map((batch, idx) => (
              <option key={idx} value={batch}>
                {batch}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-full sm:w-auto">
          <label className="text-gray-700 font-medium mb-1">Rate Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={minRate}
              onChange={(e) => setMinRate(e.target.value)}
              placeholder="Min"
              className="border border-gray-300 rounded-lg px-3 py-2 w-20 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <span className="text-gray-600 font-medium mt-2">–</span>
            <input
              type="number"
              value={maxRate}
              onChange={(e) => setMaxRate(e.target.value)}
              placeholder="Max"
              className="border border-gray-300 rounded-lg px-3 py-2 w-20 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleClearFilters}
          className="px-4 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-lg shadow hover:opacity-90 transition w-full sm:w-auto"
        >
          Clear Filters
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm sm:text-base">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <tr>
              <th className="py-2 px-3 text-left">Description</th>
              <th className="py-2 px-3 text-left">HSN</th>
              <th className="py-2 px-3 text-left">GST %</th>
              <th className="py-2 px-3 text-left">Due ON</th>
              <th className="py-2 px-3 text-left">Batch</th>
              <th className="py-2 px-3 text-left">Qty</th>
              <th className="py-2 px-3 text-left">Rate</th>
              <th className="py-2 px-3 text-left">Unit</th>
              <th className="py-2 px-3 text-left">Discount %</th>
              <th className="py-2 px-3 text-left">Amount</th>
              <th className="py-2 px-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {currentRows.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center py-6 text-gray-500">
                  No quotations found.
                </td>
              </tr>
            ) : (
              currentRows.map((q, idx) => {
                const qty = Number(q.qty) || 0;
                const rate = Number(q.rate) || 0;
                const discount = Number(q.discount) || 0;
                const gst = Number(q.gst) || 0;
                const baseAmount = qty * rate;
                const afterDiscount = baseAmount - (baseAmount * discount) / 100;
                const totalAmount = afterDiscount + (afterDiscount * gst) / 100;

                return (
                  <tr
                    key={q._id}
                    className={`transition hover:bg-blue-50 ${
                      idx % 2 === 0 ? "bg-gray-50" : ""
                    }`}
                  >
                    <td className="py-2 px-3">{q.desc}</td>
                    <td className="py-2 px-3">{q.hsn}</td>
                    <td className="py-2 px-3">{gst}%</td>
                    <td className="py-2 px-3">
                      {q.dueOn ? new Date(q.dueOn).toLocaleDateString() : "-"}
                    </td>
                    <td className="py-2 px-3">{q.batch}</td>
                    <td className="py-2 px-3">{qty}</td>
                    <td className="py-2 px-3">{rate.toFixed(2)}</td>
                    <td className="py-2 px-3">{q.unit}</td>
                    <td className="py-2 px-3">{discount}</td>
                    <td className="py-2 px-3 font-semibold text-right">
                      ₹{totalAmount.toFixed(2)}
                    </td>
                    <td className="py-2 px-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleEdit(q)}
                        className="px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded shadow text-xs sm:text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(q._id)}
                        className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded shadow text-xs sm:text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
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
