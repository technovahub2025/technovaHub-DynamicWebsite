// controllers/courseController.js
import Course from "../models/courseModels.js";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// ================= CREATE =================
export const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    let imageUrl = null;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    // Upload image or GIF (if any)
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "courses", resource_type: "auto" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = result.secure_url;
    }

    const course = new Course({ title, description, image: imageUrl });
    const savedCourse = await course.save();

    res.status(201).json({ success: true, data: savedCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= READ ALL =================
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= READ ONE =================
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: "Invalid course ID" });
    }

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= UPDATE =================
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: "Invalid course ID" });
    }

    let updateData = { title, description };

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "courses", resource_type: "auto" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      updateData.image = result.secure_url;
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse)
      return res.status(404).json({ success: false, message: "Course not found" });

    res.status(200).json({ success: true, data: updatedCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= DELETE =================
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: "Invalid course ID" });
    }

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      data: deletedCourse,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
