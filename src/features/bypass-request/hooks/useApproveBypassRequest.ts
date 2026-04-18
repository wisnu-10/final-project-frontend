import { useState } from "react";
import toast from "react-hot-toast";
import { approveBypassRequestApi } from "../api/approveBypassRequest.api";

export default function useApproveBypassRequest(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);

  const handleApprove = async (id: string) => {
    try {
      setLoading(true);
      const res = await approveBypassRequestApi(id);
      if (res.success) {
        toast.success(res.message || "Bypass request approved!");
        onSuccess?.();
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to approve bypass request",
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleApprove, loading };
}
