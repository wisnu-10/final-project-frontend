import axiosInstance from "@/utils/axiosInstance";

export const getOutletWorkersApi = async () => {
  const response = await axiosInstance.get("/order-admin/workers");
  return response.data;
};
