import axiosInstance from "@/utils/axiosInstance";

export const getCustomersApi = async (search?: string) => {
  const query = search ? `?search=${search}` : "";
  const response = await axiosInstance.get(`/order-admin/customers${query}`);
  return response.data;
};
