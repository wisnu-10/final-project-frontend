import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { getOutletInfoApi } from "../api/getOutletInfo.api";

export default function useGetOutletInfo() {
  const [outlet, setOutlet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchOutlet = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getOutletInfoApi();
      if (res.success) {
        setOutlet(res.data);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch outlet info",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOutlet();
  }, [fetchOutlet]);

  return { outlet, loading, fetchOutlet };
}
