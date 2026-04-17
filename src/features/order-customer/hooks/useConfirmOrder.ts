import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axiosInstance";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useConfirmOrder() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const confirmOrder = async (
    id: string,
    onSuccess?: () => Promise<void> | void,
  ) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.patch<ApiResponse<any>>(
        `/order/confirm-order/${id}`,
        {},
      );

      toast.success("Order confirmed! ✨");
      setData(res.data.data);

      if (onSuccess) {
        await onSuccess();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, confirmOrder };
}
