import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { getCustomersApi } from "../api/getCustomers.api";
import { useDebounce } from "@/hooks/useDebounce";

export default function useGetCustomers(search?: string) {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebounce(search, 500);

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getCustomersApi(debouncedSearch);
      if (res.success) {
        setCustomers(res.data || []);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return { customers, loading, fetchCustomers };
}
