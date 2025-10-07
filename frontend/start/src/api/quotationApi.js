import apiClient from "./apiClient";

//get all gallary images

export const getQuotation = async () => {
    const res = await apiClient.get("/quatation")
    return res.data;
}


// Add new certificate
export const addQuotation = async (certificate) => {
  const res = await apiClient.post("/quatation", quatation);
  return res.data;
};

// Update certificate by ID
export const updateQuotation = async (id, certificate) => {
  const res = await apiClient.put(`/quatation/${id}`, quatation);
  return res.data;
};

// Delete certificate by ID
export const deleteQuotation = async (id) => {
  const res = await apiClient.delete(`/quatation/${id}`);
  return res.data;
};