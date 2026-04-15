import axiosInstance from "@/utils/axiosInstance";

export const getPendingBypassRequestsApi = async () => {
  const response = await axiosInstance.get("/bypass-request/pending");
  return response.data;
};
