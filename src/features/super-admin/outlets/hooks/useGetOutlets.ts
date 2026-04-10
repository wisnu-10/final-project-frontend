import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { getOutletsApi } from "../api/getOutlets.api";

export default function useGetOutlets() {
  const [outlets, setOutlets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOutlets = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getOutletsApi();
      if (res.success) {
        // Backend returns `{ outlets, pagination }` so we use res.data.outlets
        setOutlets(res.data.outlets || []);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch outlets");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOutlets();
  }, [fetchOutlets]);

  return { outlets, loading, fetchOutlets };
}
