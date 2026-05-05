import axiosInstance from "@/utils/axiosInstance";

export const getOrdersApi = async (params?: Record<string, string>) => {
  const query = params ? "?" + new URLSearchParams(params).toString() : "";
  const response = await axiosInstance.get(`/order-admin${query}`);
  return response.data;
};
