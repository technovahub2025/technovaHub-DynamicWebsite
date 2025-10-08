import React, { useState, useEffect } from "react";
import { addQuotation, updateQuotation } from "../../../api/quotationApi";

const QuotationForm = ({ editData, onUpdateComplete }) => {
  const [formData, setFormData] = useState({
    desc: "",
    hsn: "",
    gst: "",
    dueOn: "",
    batch: "",
    qty: "",
    rate: "",
    unit: "",
    discount: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // Pre-fill form if editing
  useEffect(() => {
    if (editData) {
      setFormData({
        desc: editData.desc || "",
        hsn: editData.hsn || "",
        gst: editData.gst || "",
        dueOn: editData.dueOn ? editData.dueOn.slice(0, 10) : "",
        batch: editData.batch || "",
        qty: editData.qty || "",
        rate: editData.rate || "",
        unit: editData.unit || "",
        discount: editData.discount || "",
      });
      setIsEdit(true);
      setEditId(editData._id);
    } else {
      setFormData({
        desc: "",
        hsn: "",
        gst: "",
        dueOn: "",
        batch: "",
        qty: "",
        rate: "",
        unit: "",
        discount: "",
      });
      setIsEdit(false);
      setEditId(null);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate final amount including discount and GST
  const displayAmount = (() => {
    const qty = parseFloat(formData.qty) || 0;
    const rate = parseFloat(formData.rate) || 0;
    const discount = parseFloat(formData.discount) || 0;
    const gst = parseFloat(formData.gst) || 0;

    const amountBeforeGST = qty * rate * (1 - discount / 100);
    const amountWithGST = amountBeforeGST * (1 + gst / 100);

    return amountWithGST.toFixed(2);
  })();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const qty = parseFloat(formData.qty) || 0;
    const rate = parseFloat(formData.rate) || 0;
    const discount = parseFloat(formData.discount) || 0;
    const gst = parseFloat(formData.gst) || 0;

    const amountBeforeGST = qty * rate * (1 - discount / 100);
    const amountWithGST = amountBeforeGST * (1 + gst / 100);

    const dataToSend = { ...formData, gst, amount: amountWithGST };

    try {
      if (isEdit && editId) {
        await updateQuotation(editId, dataToSend);
        alert("Quotation updated successfully!");
      } else {
        await addQuotation(dataToSend);
        alert("Quotation added successfully!");
      }

      // Reset form
      setFormData({
        desc: "",
        hsn: "",
        gst: "",
        dueOn: "",
        batch: "",
        qty: "",
        rate: "",
        unit: "",
        discount: "",
      });
      setIsEdit(false);
      setEditId(null);

      if (onUpdateComplete) onUpdateComplete();
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to save quotation");
    }
  };

  return (
    <>
      <div className=" flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-5xl  "
        >
          <h2 className="text-xl font-bold  mb-6  text-blue-800 text-center">
            {isEdit ? "Edit Quotation" : "Add New Quotation"}
          </h2>

          {/* Row 1 */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mb-4">
            <input
              name="desc"
              placeholder="Product Description"
              value={formData.desc}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2   border-gray-200 shadow-lg  rounded-lg focus:ring-2  focus:ring-blue-400 focus:outline-none"
              required
            />
            <input
              name="hsn"
              placeholder="HSN Code"
              value={formData.hsn}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2   border-gray-200 shadow-lg  rounded-lg focus:ring-2  focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-4">
            <input
              name="gst"
              type="number"
              placeholder="GST %"
              value={formData.gst} 
              onChange={handleChange}
                className="w-full px-4 py-3 border-2   border-gray-200 shadow-lg  rounded-lg focus:ring-2  focus:ring-blue-400 focus:outline-none"
            />
            <input
              name="batch"
              placeholder="Batch Number"
              value={formData.batch}
              onChange={handleChange}
               className="w-full px-4 py-3 border-2   border-gray-200 shadow-lg  rounded-lg focus:ring-2  focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            <input
              name="qty"
              type="number"
              placeholder="Quantity"
              value={formData.qty}
              onChange={handleChange}
               className="w-full px-4 py-3 border-2   border-gray-200 shadow-lg  rounded-lg focus:ring-2  focus:ring-blue-400 focus:outline-none"
            />
            <input
              name="rate"
              type="number"
              placeholder="Rate per unit"
              value={formData.rate}
              onChange={handleChange}
               className="w-full px-4 py-3 border-2   border-gray-200 shadow-lg  rounded-lg focus:ring-2  focus:ring-blue-400 focus:outline-none"
            />
            
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-1 md:gap-3 mb-4">
            <input
              name="discount"
              type="number"
              placeholder="Discount %"
              value={formData.discount}
              onChange={handleChange}
                className="w-full px-4 py-3 border-2   border-gray-200 shadow-lg  rounded-lg focus:ring-2  focus:ring-blue-400 focus:outline-none"
            />
            <input
              name="dueOn"
              type="date"
              placeholder="Due Date"
              value={formData.dueOn}
              onChange={handleChange}
               className="w-full px-4 py-3 border-2   border-gray-200 shadow-lg  rounded-lg focus:ring-2  focus:ring-blue-400 focus:outline-none"
            />
             <input
              name="unit"
              placeholder="Unit (pcs, kg)"
              value={formData.unit}
              onChange={handleChange}
                className="w-full px-4 py-3 border-2   border-gray-200 shadow-lg  rounded-lg focus:ring-2  focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Total Amount */}
          <div className="mb-6">
            <input
              name="amount"
              type="number"
              placeholder="Total Amount (incl. GST & Discount)"
              value={displayAmount}
              disabled
               className="w-full px-4 py-3 border-2   border-gray-200 shadow-lg  rounded-lg focus:ring-2  focus:ring-blue-400 focus:outline-none"
            />
           
          </div>

          <button
            type="submit"
            className=" px-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-300"
          >
            {isEdit ? "Update Quotation" : "Add Quotation"}
          </button>
        </form>
      </div>

      {/* <div className="px-10 mt-6">
        <QuotationTable
          onEdit={(data) => {
            setFormData(data);
            setIsEdit(true);
            setEditId(data._id);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onUpdateComplete={() => setFormData({})}
        />
      </div> */}
    </>
  );
};

export default QuotationForm;
