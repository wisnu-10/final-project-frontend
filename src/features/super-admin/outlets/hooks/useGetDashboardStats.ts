import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { getDashboardStatsApi } from "../api/getDashboardStats.api";

export default function useGetDashboardStats() {
  const [stats, setStats] = useState({ totalOutlets: 0, totalEmployees: 0, activeOrders: 0 });
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getDashboardStatsApi();
      if (res.success) {
        setStats(res.data);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch dashboard stats");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading };
}
