import express from "express";
import multer from "multer";
import path from "path";
import {
  uploadImages,
  getImages,
  getImage,
  deleteImage,
} from "../controllers/galleryController.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes
router.post("/", upload.array("images", 10), uploadImages); 
router.get("/", getImages);
router.get("/:id", getImage);
router.delete("/:id", deleteImage);

export default router;
