import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { getOutletWorkersApi } from "../api/getOutletWorkers.api";

export default function useGetOutletWorkers() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getOutletWorkersApi();
      if (res.success) {
        setWorkers(res.data || []);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch workers",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  return { workers, loading, fetchWorkers };
}
