import apiClient from "./apiClient";

// Get all courses
export const getCourseApi = async () => {
  const res = await apiClient.get("/courses");
  return res.data;
};

// Add a new course (with optional image/GIF)
export const addCourseApi = async (courseFormData) => {
  const res = await apiClient.post("/courses", courseFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Delete a course by ID
export const deleteCourseApi = async (id) => {
  const res = await apiClient.delete(`/courses/${id}`);
  return res.data;
};

// Update a course by ID (with optional image/GIF)
export const updateCourseApi = async (id, courseFormData) => {
  const res = await apiClient.put(`/courses/${id}`, courseFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
