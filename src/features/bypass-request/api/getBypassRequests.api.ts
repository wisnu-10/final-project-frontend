import axiosInstance from "@/utils/axiosInstance";

export const getBypassRequestsApi = async (orderId: string) => {
  const response = await axiosInstance.get(
    `/bypass-request/order/${orderId}`,
  );
  return response.data;
};
