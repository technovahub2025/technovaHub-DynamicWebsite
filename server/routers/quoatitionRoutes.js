import express from "express";
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  bulkSaveItems   // <-- import bulk function
} from "../controllers/quotationController.js";

const router = express.Router();

// CRUD routes
router.post("/", createItem);
router.get("/", getItems);
router.get("/:id", getItemById);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

// Bulk save route
router.post("/bulk", bulkSaveItems);

export default router;
