import axiosInstance from "@/utils/axiosInstance";

export interface CreateBypassRequestPayload {
  notes: string;
  expectedQuantity: number;
  actualQuantity: number;
  station: string;
}

export const createBypassRequestApi = async (
  orderId: string,
  data: CreateBypassRequestPayload,
) => {
  const response = await axiosInstance.post(
    `/bypass-request/${orderId}`,
    data,
  );
  return response.data;
};
