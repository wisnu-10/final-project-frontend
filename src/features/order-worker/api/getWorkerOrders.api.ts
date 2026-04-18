import axiosInstance from "@/utils/axiosInstance";

export const getWorkerOrdersApi = async () => {
  const response = await axiosInstance.get("/order-worker");
  return response.data;
};
