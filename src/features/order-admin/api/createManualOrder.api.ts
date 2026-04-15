import axiosInstance from "@/utils/axiosInstance";

export interface CreateManualOrderPayload {
  customerId: string;
  totalWeight: number;
  orderItems: { laundryItemId: string; quantity: number }[];
  workerId: string;
}

export const createManualOrderApi = async (data: CreateManualOrderPayload) => {
  const response = await axiosInstance.post("/order-admin/create-manual", data);
  return response.data;
};
