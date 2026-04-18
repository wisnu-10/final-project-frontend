import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { getOutletsApi } from "../api/getOutlets.api";

export default function useGetOutlets(initialLimit: number = 10) {
  const [outlets, setOutlets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: initialLimit,
    totalPages: 0,
  });

  const fetchOutlets = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getOutletsApi({ page, limit: initialLimit });
      if (res.success) {
        setOutlets(res.data.outlets || []);
        setPagination(res.data.pagination);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch outlets");
    } finally {
      setLoading(false);
    }
  }, [page, initialLimit]);

  useEffect(() => {
    fetchOutlets();
  }, [fetchOutlets]);

  return { outlets, loading, fetchOutlets, page, setPage, pagination };
}
