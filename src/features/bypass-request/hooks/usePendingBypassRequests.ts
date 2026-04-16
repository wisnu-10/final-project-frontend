import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { getPendingBypassRequestsApi } from "../api/getPendingBypassRequests.api";

export default function usePendingBypassRequests() {
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const fetchPending = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getPendingBypassRequestsApi({ page, limit: 10 });
      if (res.success) {
        setPendingRequests(res.data.bypassRequests || []);
        setPagination(res.data.pagination);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch pending bypass requests",
      );
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPending();
  }, [fetchPending]);

  return { pendingRequests, loading, fetchPending, page, setPage, pagination };
}
