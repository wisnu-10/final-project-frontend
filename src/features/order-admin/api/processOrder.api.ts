import axiosInstance from "@/utils/axiosInstance";

export interface ProcessOrderPayload {
  totalWeight: number;
  orderItems: { laundryItemId: string; quantity: number }[];
  workerId: string;
}

export const processOrderApi = async (
  orderId: string,
  data: ProcessOrderPayload,
) => {
  const response = await axiosInstance.post(
    `/order-admin/${orderId}/process`,
    data,
  );
  return response.data;
};

export const updateOrderApi = async (
  orderId: string,
  data: ProcessOrderPayload,
) => {
  const response = await axiosInstance.put(`/order-admin/${orderId}`, data);
  return response.data;
};
