import React, { useState, useEffect } from "react";
import qr from "../../../assets/images/qrlogo.jpeg";

import { getAInvoice } from "../../../api/arounInvoiceApi";
import ArounInvoiceForm from "./ArounInvoiceForm";
import ArounInvoiceTable from "./ArounInvoiceTable";

const ArounManagar = () => {
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = async () => {
    try {
      const data = await getAInvoice();
      setInvoices(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleEdit = (invoice) => {
    setEditData(invoice);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  return (
    <div className="md:p-8 p-4 bg-white min-h-screen">
      <div className="flex justify-center mb-4">
        <img
          src={qr}
          alt="logo"
          className="md:w-[550px] md:h-[150px]  w-[300px] h-[100px] shadow-lg"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-blue-800 text-center sm:text-left">
         Aroun Invoice 
        </h1>
        <button
          onClick={handleAddNew}
          className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all"
        >
          + Add Invoice
        </button>
      </div>

      <ArounInvoiceTable invoices={invoices} onEdit={handleEdit} onRefresh={fetchInvoices} />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              ✕
            </button>
            <ArounInvoiceForm
              editData={editData}
              onClose={() => setIsModalOpen(false)}
              onRefresh={fetchInvoices}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArounManagar;
