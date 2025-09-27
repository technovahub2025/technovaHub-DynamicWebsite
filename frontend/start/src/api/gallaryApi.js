import apiClient from "./apiClient";

//get all gallary images

export const getGalleryImages = async () => {
    const res = await apiClient.get("/gallery")
    return res.data;
}