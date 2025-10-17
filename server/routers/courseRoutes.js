// routes/courseRoutes.js
import express from "express";
import upload from "../middleware/multer.js";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

const router = express.Router();

// CRUD routes
router.post("/", upload.single("image"), createCourse);   // Create with image
router.get("/", getCourses);                              // Read all
router.get("/:id", getCourseById);                        // Read one
router.put("/:id", upload.single("image"), updateCourse); // Update with image
router.delete("/:id", deleteCourse);                      // Delete

export default router;
