import React, { useState, useEffect } from "react";
import qr from "../../../assets/images/logoremove.png";
import InvoiceTable from "./InvoiceTable";
import InvoiceForm from "./InvoiceForm";
import { getInvoice } from "../../../api/invoiceApi";

const InvoiceManager = () => {
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = async () => {
    try {
      const data = await getInvoice();
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
    <div className="md:p-8 p-4 bg-white">
      <div className="flex">
        <img src={qr} alt="logo" className="md:w-[150px] md:h-[150px] rounded-full w-[200px]" />
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="md:text-2xl font-bold text-blue-800">TechnovaHub Invoice List</h1>
        <button
          onClick={handleAddNew}
          className="md:px-5 md:py-2 p-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all"
        >
          + Add Invoice
        </button>
      </div>

      {/* Invoice Table */}
      <InvoiceTable invoices={invoices} onEdit={handleEdit} onRefresh={fetchInvoices} />

      {/* Modal Form */}
      {isModalOpen && (
        <InvoiceForm
          editData={editData}
          onClose={() => setIsModalOpen(false)}
          onUpdateComplete={() => {
            setIsModalOpen(false);
            setEditData(null);
            fetchInvoices();
          }}
        />
      )}
    </div>
  );
};

export default InvoiceManager;
