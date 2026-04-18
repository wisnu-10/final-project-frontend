import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { getBypassRequestsApi } from "../api/getBypassRequests.api";

export default function useGetBypassRequests(orderId: string) {
  const [bypassRequests, setBypassRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBypassRequests = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getBypassRequestsApi(orderId);
      if (res.success) {
        setBypassRequests(res.data);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch bypass requests",
      );
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (orderId) {
      fetchBypassRequests();
    }
  }, [orderId, fetchBypassRequests]);

  return { bypassRequests, loading, fetchBypassRequests };
}
