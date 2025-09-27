import React, { useState } from "react";

const Courseadd = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddCourse = (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    // Here you can send data to backend API
    alert(`Course Added:\nTitle: ${title}\nDescription: ${description}`);

    // Reset form
    setTitle("");
    setDescription("");
  };

  return (
    <div className="p-6 max-w-8xl mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add New Course</h2>
      <form onSubmit={handleAddCourse} className="space-y-4">
        {/* Course Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Course Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter course title"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Course Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Course Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter course description"
            rows="4"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          ></textarea>
        </div>

        {/* Add Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default Courseadd;
