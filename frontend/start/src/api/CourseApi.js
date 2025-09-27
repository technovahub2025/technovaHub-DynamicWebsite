import apiClient from "./apiClient";

//get all gallary images

export const getCourseApi = async () => {
    const res = await apiClient.get("/courses")
    return res.data;
}