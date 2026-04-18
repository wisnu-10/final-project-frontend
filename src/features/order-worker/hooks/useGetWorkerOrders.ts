import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { getWorkerOrdersApi } from "../api/getWorkerOrders.api";

export default function useGetWorkerOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getWorkerOrdersApi();
      if (res.success) {
        setOrders(res.data);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch orders",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, loading, fetchOrders };
}
