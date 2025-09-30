import express from "express";
import {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CRUD routes
router.post("/",protect, createCourse);           // Create
router.get("/", getCourses);             // Read all
router.get("/:id", getCourseById);       // Read one
router.put("/:id",protect, updateCourse);        // Update
router.delete("/:id",protect, deleteCourse);     // Delete

export default router;
