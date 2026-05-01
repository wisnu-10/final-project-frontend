import axiosInstance from "@/utils/axiosInstance";

export interface CreateBypassRequestPayload {
  notes: string;
  expectedQuantity: number;
  actualQuantity: number;
  station: string;
}

export const createBypassRequest = async (orderId: string, payload: CreateBypassRequestPayload) => {
  const res = await axiosInstance.post(`/bypass-request/${orderId}`, payload);
  return res.data;
};

export const getBypassRequestsByOrder = async (orderId: string) => {
  const res = await axiosInstance.get(`/bypass-request/order/${orderId}`);
  return res.data.data;
};
