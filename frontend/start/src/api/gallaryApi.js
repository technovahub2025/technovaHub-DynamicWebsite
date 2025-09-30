import apiClient from "./apiClient";

//get all gallary images

export const getGalleryImages = async () => {
    const res = await apiClient.get("/gallery")
    return res.data;
}


export const deleteGalleryImage = async (id) => {
  const res = await apiClient.delete(`/gallery/${id}`);
  return res.data;
};


// Upload multiple gallery images
export const uploadGalleryImages = async (images) => {
  const formData = new FormData();
  images.forEach((img) => {
    formData.append("images", img.file); 
  });

  const res = await apiClient.post("/gallery", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
