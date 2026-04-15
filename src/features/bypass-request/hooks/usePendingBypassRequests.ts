import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { getPendingBypassRequestsApi } from "../api/getPendingBypassRequests.api";

export default function usePendingBypassRequests() {
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getPendingBypassRequestsApi();
      if (res.success) {
        setPendingRequests(res.data);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch pending bypass requests",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPending();
  }, [fetchPending]);

  return { pendingRequests, loading, fetchPending };
}
