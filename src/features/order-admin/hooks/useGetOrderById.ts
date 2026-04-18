import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { getOrderByIdApi } from "../api/getOrderById.api";

export default function useGetOrderById(id: string) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getOrderByIdApi(id);
      if (res.success) {
        setOrder(res.data);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch order details",
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchOrder();
    }
  }, [id, fetchOrder]);

  return { order, loading, fetchOrder };
}
