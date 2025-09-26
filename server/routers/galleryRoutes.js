// routers/galleryRoutes.js
import express from "express";
import {
  uploadImages,
  getImages,
  getImage,
  deleteImage,
} from "../controllers/galleryController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// Upload multiple (max 10)
router.post("/", upload.array("images", 10), uploadImages);
router.get("/", getImages);
router.get("/:id", getImage);
router.delete("/:id", deleteImage);

export default router;
