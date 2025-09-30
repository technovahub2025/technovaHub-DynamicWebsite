// routers/certificateRoutes.js
import express from "express";
import {
  createCertificate,
  getCertificates,
  getCertificateById,
  updateCertificate,
  deleteCertificate
} from "../controllers/certificateController.js";

import { protect } from "../middleware/authMiddleware.js"; 

const router = express.Router();

// CRUD routes
router.post("/",protect, createCertificate);           // Create
router.get("/", getCertificates);             // Read all
router.get("/:id", getCertificateById);       // Read one
router.put("/:id", protect, updateCertificate);        // Update
router.delete("/:id",protect, deleteCertificate);     // Delete

export default router;
