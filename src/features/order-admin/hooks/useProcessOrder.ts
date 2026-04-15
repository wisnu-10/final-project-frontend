import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  processOrderApi,
  ProcessOrderPayload,
} from "../api/processOrder.api";

export default function useProcessOrder() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleProcess = async (orderId: string, data: ProcessOrderPayload) => {
    try {
      setLoading(true);
      const res = await processOrderApi(orderId, data);
      if (res.success) {
        toast.success("Order processed successfully!");
        router.push("/outlet-admin/orders");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to process order",
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleProcess, loading };
}
