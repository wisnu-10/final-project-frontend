import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";

export interface CreateBypassRequestPayload {
  notes: string;
  expectedQuantity: number;
  actualQuantity: number;
  station: string;
}

export function useCreateBypassRequest() {
  const [isLoading, setIsLoading] = useState(false);

  const createBypassRequest = async (orderId: string, data: CreateBypassRequestPayload) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(`/bypass-request/${orderId}`, data);
      toast.success(response.data?.message || "Bypass request submitted successfully");
      return response.data;
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || "Failed to create bypass request";
      toast.error(errorMsg);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { createBypassRequest, isLoading };
}
