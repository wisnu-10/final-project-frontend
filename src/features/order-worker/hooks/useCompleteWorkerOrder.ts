import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";

interface CompleteOrderParams {
  orderId: string;
}

export function useCompleteWorkerOrder() {
  const [isLoading, setIsLoading] = useState(false);

  const completeOrder = async (params: CompleteOrderParams) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(`/order-worker/${params.orderId}/complete`);
      toast.success(response.data?.message || "Order completed successfully");
      return response.data;
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || "Failed to complete order";
      toast.error(errorMsg);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { completeOrder, isLoading };
}
