import { useState } from "react";
import toast from "react-hot-toast";
import {
  createBypassRequestApi,
  CreateBypassRequestPayload,
} from "../api/createBypassRequest.api";

export default function useCreateBypassRequest(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);

  const handleCreate = async (
    orderId: string,
    data: CreateBypassRequestPayload,
  ) => {
    try {
      setLoading(true);
      const res = await createBypassRequestApi(orderId, data);
      if (res.success) {
        toast.success(res.message || "Bypass request submitted!");
        onSuccess?.();
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to create bypass request",
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleCreate, loading };
}
