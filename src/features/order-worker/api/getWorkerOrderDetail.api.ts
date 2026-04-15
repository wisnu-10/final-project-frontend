import axiosInstance from "@/utils/axiosInstance";

export const getWorkerOrderDetailApi = async (id: string) => {
  const response = await axiosInstance.get(`/order-worker/${id}`);
  return response.data;
};
