import { useState } from "react";
import toast from "react-hot-toast";
import { rejectBypassRequestApi } from "../api/rejectBypassRequest.api";

export default function useRejectBypassRequest(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);

  const handleReject = async (id: string) => {
    try {
      setLoading(true);
      const res = await rejectBypassRequestApi(id);
      if (res.success) {
        toast.success(res.message || "Bypass request rejected.");
        onSuccess?.();
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to reject bypass request",
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleReject, loading };
}
