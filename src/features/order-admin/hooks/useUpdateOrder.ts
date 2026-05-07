import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  updateOrderApi,
  ProcessOrderPayload,
} from "../api/processOrder.api";

export default function useUpdateOrder() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (orderId: string, data: ProcessOrderPayload) => {
    try {
      setLoading(true);
      const res = await updateOrderApi(orderId, data);
      if (res.success) {
        toast.success("Order details updated successfully!");
        router.push(`/outlet-admin/orders/${orderId}`);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to update order",
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdate, loading };
}
