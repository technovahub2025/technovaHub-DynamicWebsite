import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addInvoice, updateInvoice } from "../../../api/invoiceApi";
import toast from "react-hot-toast";
import { X, Trash, Plus } from "lucide-react";

const InvoiceForm = ({ editData, onClose, onUpdateComplete }) => {
  // Automatic date and dueDate
  const today = new Date().toISOString().slice(0, 10);
  const defaultDue = new Date();
  defaultDue.setDate(defaultDue.getDate() + 30);
  const dueDateStr = defaultDue.toISOString().slice(0, 10);

  const [invoiceTo, setInvoiceTo] = useState(editData?.invoiceTo || "");
  const [date, setDate] = useState(editData?.date?.slice(0, 10) || today);
  const [dueOn, setDueOn] = useState(editData?.dueDate?.slice(0, 10) || dueDateStr);

  const [items, setItems] = useState(
    editData?.items?.map((item) => ({ ...item })) || [
      { desc: "", hsn: "", gst: "", qty: "", rate: "", unit: "", discount: "" }
    ]
  );

  // Handle item change
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    updatedItems[index][name] = value;
    setItems(updatedItems);
  };

  // Add / Remove items
  const addItem = () => setItems([...items, { desc: "", hsn: "", gst: "", qty: "", rate: "", unit: "", discount: "" }]);
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  // Calculate item amount
  const calculateItemAmount = (item) => {
    const qty = parseFloat(item.qty) || 0;
    const rate = parseFloat(item.rate) || 0;
    const discount = parseFloat(item.discount) || 0;
    const gst = parseFloat(item.gst) || 0;

    const baseAmount = qty * rate;
    const afterDiscount = baseAmount * (1 - discount / 100);
    return (afterDiscount * (1 + gst / 100)).toFixed(2);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        invoiceTo,
        date,
        dueDate: dueOn,
        items: items.map(item => ({
          ...item,
          qty: Number(item.qty),
          rate: Number(item.rate),
          gst: Number(item.gst),
          discount: Number(item.discount)
        }))
      };

      if (editData?._id) {
        await updateInvoice(editData._id, dataToSend);
        toast.success("Invoice updated successfully!");
      } else {
        await addInvoice(dataToSend);
        toast.success("Invoice added successfully!");
      }

      onUpdateComplete();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save invoice");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 relative border border-gray-100 overflow-y-auto max-h-[90vh]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition">
            <X size={22} />
          </button>

          <h2 className="text-2xl font-bold mb-5 text-center text-blue-700">
            {editData ? "Edit Invoice" : "Add New Invoice"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-medium text-gray-700">Invoice To</label>
              <input
                type="text"
                value={invoiceTo}
                onChange={(e) => setInvoiceTo(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="font-medium text-gray-700">Invoice Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                readOnly
              />
            </div>

            {/* Multiple Items */}
            {items.map((item, idx) => (
              <div key={idx} className="border rounded-lg p-3 relative grid grid-cols-2 md:grid-cols-4 gap-3 items-end mb-3 bg-gray-50">
                <input name="desc" placeholder="Description" value={item.desc} onChange={(e) => handleItemChange(idx, e)} required className="w-full px-2 py-1 border rounded-lg"/>
                <input name="hsn" placeholder="HSN" value={item.hsn} onChange={(e) => handleItemChange(idx, e)} className="w-full px-2 py-1 border rounded-lg"/>
                <input name="qty" type="number" placeholder="Qty" value={item.qty} onChange={(e) => handleItemChange(idx, e)} className="w-full px-2 py-1 border rounded-lg"/>
                <input name="rate" type="number" placeholder="Rate" value={item.rate} onChange={(e) => handleItemChange(idx, e)} className="w-full px-2 py-1 border rounded-lg"/>
                <input name="gst" type="number" placeholder="GST %" value={item.gst} onChange={(e) => handleItemChange(idx, e)} className="w-full px-2 py-1 border rounded-lg"/>
                <input name="discount" type="number" placeholder="Discount %" value={item.discount} onChange={(e) => handleItemChange(idx, e)} className="w-full px-2 py-1 border rounded-lg"/>
                <input name="unit" placeholder="Unit" value={item.unit} onChange={(e) => handleItemChange(idx, e)} className="w-full px-2 py-1 border rounded-lg"/>
                <input placeholder="Amount" value={calculateItemAmount(item)} disabled className="w-full px-2 py-1 border rounded-lg bg-green-100 text-green-700 font-semibold"/>

                {items.length > 1 && (
                  <button type="button" onClick={() => removeItem(idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                    <Trash size={18}/>
                  </button>
                )}
              </div>
            ))}

            <button type="button" onClick={addItem} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              <Plus size={18}/> Add Item
            </button>

            <div>
              <label className="font-medium text-gray-700">Due Date</label>
              <input type="date" value={dueOn} onChange={(e) => setDueOn(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"/>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition">Cancel</button>
              <button type="submit" className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all">
                {editData ? "Update Invoice" : "Add Invoice"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InvoiceForm;
