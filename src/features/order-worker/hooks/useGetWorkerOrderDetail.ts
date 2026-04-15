import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { getWorkerOrderDetailApi } from "../api/getWorkerOrderDetail.api";

export default function useGetWorkerOrderDetail(id: string) {
  const [orderDetail, setOrderDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getWorkerOrderDetailApi(id);
      if (res.success) {
        setOrderDetail(res.data);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch order detail",
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchDetail();
    }
  }, [id, fetchDetail]);

  return { orderDetail, loading, fetchDetail };
}
