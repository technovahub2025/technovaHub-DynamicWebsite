import express from "express";
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
} from "../controllers/quotationController.js";

const router = express.Router();

// CRUD routes
router.post("/", createItem);           // Create
router.get("/", getItems);             // Get all
router.get("/:id", getItemById);      // Get single
router.put("/:id", updateItem);       // Update
router.delete("/:id", deleteItem);    // Delete

export default router;
