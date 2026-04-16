import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { getOrdersApi } from "../api/getOrders.api";
import { useDebounce } from "@/hooks/useDebounce";

export default function useGetOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [outletId, setOutletId] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [workerId, setWorkerId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = {
        page: page.toString(),
        limit: limit.toString(),
      };

      if (debouncedSearch) params.search = debouncedSearch;
      if (outletId) params.outletId = outletId;
      if (orderStatus) params.orderStatus = orderStatus;
      if (workerId) params.workerId = workerId;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const res = await getOrdersApi(params);
      if (res.success) {
        setOrders(res.data.orders || []);
        setPagination(res.data.pagination || null);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [page, limit, debouncedSearch, outletId, orderStatus, workerId, startDate, endDate]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    pagination,
    loading,
    search,
    setSearch,
    outletId,
    setOutletId,
    orderStatus,
    setOrderStatus,
    workerId,
    setWorkerId,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    page,
    setPage,
    fetchOrders,
  };
}
