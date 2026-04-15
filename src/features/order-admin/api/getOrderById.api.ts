import axiosInstance from "@/utils/axiosInstance";

export const getOrderByIdApi = async (id: string) => {
  const response = await axiosInstance.get(`/order-admin/${id}`);
  return response.data;
};
