import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  createManualOrderApi,
  CreateManualOrderPayload,
} from "../api/createManualOrder.api";

export default function useCreateManualOrder() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateManual = async (data: CreateManualOrderPayload) => {
    try {
      setLoading(true);
      const res = await createManualOrderApi(data);
      if (res.success) {
        toast.success("Manual order created successfully!");
        router.push("/outlet-admin/orders");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to create manual order",
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateManual, loading };
}
