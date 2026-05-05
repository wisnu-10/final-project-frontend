import axiosInstance from "@/utils/axiosInstance";

export const getPendingBypassRequestsApi = async (params?: any) => {
  const response = await axiosInstance.get("/bypass-request/pending", { params });
  return response.data;
};
