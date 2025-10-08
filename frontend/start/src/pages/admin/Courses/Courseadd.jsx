import React, { useState, useEffect } from "react";
import { addCourseApi, updateCourseApi } from "../../../api/CourseApi";
import toast from "react-hot-toast";

const Courseadd = ({ editingCourse, onDone }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Populate form when editingCourse changes
  useEffect(() => {
    if (editingCourse) {
      setTitle(editingCourse.title);
      setDescription(editingCourse.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingCourse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      if (editingCourse) {
        await updateCourseApi(editingCourse._id, { title, description });
        toast.success("Course updated successfully!");
      } else {
        await addCourseApi({ title, description });
        toast.success("Course added successfully!");
      }
      setTitle("");
      setDescription("");
      if (onDone) onDone(); // notify parent
    } catch (err) {
      toast.error("Operation failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    if (onDone) onDone(); // exit edit mode
  };

  return (
    <div className="p-2 max-w-3xl mx-auto  mb-3">
      <h2 className="md:text-2xl   mb-6 text-blue-400">
        {editingCourse ? "Update Course" : "Add New Course"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          {/* <label className="block text-gray-700 font-medium mb-1">Course Title</label> */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter course title"
            className="w-full md:px-4 md:py-3 px-2 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div>
          {/* <label className="block text-gray-700 font-medium mb-1">Course Description</label> */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter course description"
            rows="5"
           className="w-full md:px-4 md:py-3 px-2 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* Buttons */}
        {editingCourse ? (
          <div className="flex gap-10">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Updating..." : "Update Course"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-3 bg-gray-200  font-semibold rounded-lg shadow-md  transition"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Adding..." : "Add Course"}
          </button>
        )}
      </form>
    </div>
  );
};

export default Courseadd;
