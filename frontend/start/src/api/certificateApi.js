import apiClient from "./apiClient";

//get all gallary images

export const getCertificateData = async () => {
    const res = await apiClient.get("/certificate")
    return res.data;
}