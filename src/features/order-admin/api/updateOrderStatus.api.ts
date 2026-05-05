import axiosInstance from "@/utils/axiosInstance";

export interface UpdateStatusPayload {
  status: string;
  workerId: string;
}

export const updateOrderStatusApi = async (
  orderId: string,
  data: UpdateStatusPayload,
) => {
  const response = await axiosInstance.patch(
    `/order-admin/${orderId}/status`,
    data,
  );
  return response.data;
};
