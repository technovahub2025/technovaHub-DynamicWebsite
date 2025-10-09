import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addQuotation, updateQuotation } from "../../../api/quotationApi";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const QuotationForm = ({ editData, onClose, onUpdateComplete }) => {
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
    try {
      const dataToSend = { ...formData };
      if (isEdit && editId) {
        await updateQuotation(editId, dataToSend);
        toast.success("Quotation updated successfully!");
      } else {
        await addQuotation(dataToSend);
        toast.success("Quotation added successfully!");
      }
      onUpdateComplete();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save quotation");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative border border-gray-100"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
          >
            <X size={22} />
          </button>

          <h2 className="text-2xl font-bold mb-5 text-center text-blue-700">
            {isEdit ? "Edit Quotation" : "Add New Quotation"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <input
                name="desc"
                placeholder="Product Description"
                value={formData.desc}
                onChange={handleChange}
                className="input-field"
                required
              />
              <input
                name="hsn"
                placeholder="HSN Code"
                value={formData.hsn}
                onChange={handleChange}
                 className="input-field"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                name="gst"
                type="number"
                placeholder="GST %"
                value={formData.gst}
                onChange={handleChange}
                className="input-field"
              />
              <input
                name="batch"
                placeholder="Batch Number"
                value={formData.batch}
                onChange={handleChange}
                 className="input-field"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <input
                name="qty"
                type="number"
                placeholder="Quantity"
                value={formData.qty}
                onChange={handleChange}
                className="input-field"
              />
              <input
                name="rate"
                type="number"
                placeholder="Rate per unit"
                value={formData.rate}
                onChange={handleChange}
                className="input-field"
              />
              <input
                name="discount"
                type="number"
                placeholder="Discount %"
                value={formData.discount}
                onChange={handleChange}
                 className="input-field"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <input
                name="dueOn"
                type="date"
                value={formData.dueOn}
                onChange={handleChange}
                className="input-field"
              />
              <input
                name="unit"
                placeholder="Unit (pcs, kg)"
                value={formData.unit}
                onChange={handleChange}
               className="input-field"
              />
              <input
                name="amount"
                placeholder="Total (incl. GST & Discount)"
                value={displayAmount}
                disabled
                className="input-box p-6 bg-green-300"
              />
            </div>

            <div className="flex justify-end mt-5 gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all"
              >
                {isEdit ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuotationForm;
