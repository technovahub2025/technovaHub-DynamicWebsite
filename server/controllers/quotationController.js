import Quatation from "../models/quatationModel.js";

// CREATE - Add new item
export const createItem = async (req, res) => {
  try {
    const newItem = new Quatation(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: "Error creating item", error });
  }
};

// READ - Get all items
export const getItems = async (req, res) => {
  try {
    const items = await Quatation.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
};

// READ - Get single item by ID
export const getItemById = async (req, res) => {
  try {
    const item = await Quatation.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching item", error });
  }
};

// UPDATE - Update item by ID
export const updateItem = async (req, res) => {
  try {
    const updatedItem = await Quatation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error });
  }
};

// DELETE - Delete item by ID
export const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Quatation.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
};
