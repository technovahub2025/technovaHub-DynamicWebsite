import Invoice from "../models/invoiceModel.js";

// Get all quotations
export const getAllInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.find().sort({ createdAt: -1 });
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get a single quotation by ID
export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Quotation not found" });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Create a new quotation
export const createInvoice = async (req, res) => {
  try {
    const newInvoice = new Invoice(req.body);
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error: error.message });
  }
};

// Update a quotation by ID
export const updateInvoice = async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedInvoice) {
      return res.status(404).json({ message: "Quotation not found" });
    }
    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error: error.message });
  }
};

// Delete a quotation by ID
export const deleteInvoice = async (req, res) => {
  try {
    const deletedInvoice = await Quatation.findByIdAndDelete(req.params.id);
    if (!deletedInvoice) {
      return res.status(404).json({ message: "Quotation not found" });
    }
    res.status(200).json({ message: "Quotation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
