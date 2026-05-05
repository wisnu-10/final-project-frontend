import { useState } from "react";
import toast from "react-hot-toast";
import {
  updateOrderStatusApi,
  UpdateStatusPayload,
} from "../api/updateOrderStatus.api";

export default function useUpdateOrderStatus(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async (
    orderId: string,
    data: UpdateStatusPayload,
  ) => {
    try {
      setLoading(true);
      const res = await updateOrderStatusApi(orderId, data);
      if (res.success) {
        toast.success(res.message || "Status updated successfully!");
        onSuccess?.();
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to update order status",
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateStatus, loading };
}
