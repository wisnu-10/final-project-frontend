import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { getLaundryItemsApi } from "../api/getLaundryItems.api";
import { useDebounce } from "@/hooks/useDebounce";

export default function useGetLaundryItems() {
  const [laundryItems, setLaundryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [pricingType, setPricingType] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const fetchLaundryItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getLaundryItemsApi({
        search: debouncedSearch || undefined,
        pricingType: pricingType || undefined,
        page,
        limit: 10,
      });
      if (res.success) {
        setLaundryItems(res.data.laundryItems || []);
        setPagination(res.data.pagination);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch laundry items");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, pricingType, page]);

  useEffect(() => {
    fetchLaundryItems();
  }, [fetchLaundryItems]);

  return {
    laundryItems,
    loading,
    search,
    setSearch,
    pricingType,
    setPricingType,
    fetchLaundryItems,
    page,
    setPage,
    pagination,
  };
}
