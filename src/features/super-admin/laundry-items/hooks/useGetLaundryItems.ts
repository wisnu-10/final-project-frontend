import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { getLaundryItemsApi } from "../api/getLaundryItems.api";

export default function useGetLaundryItems() {
  const [laundryItems, setLaundryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pricingType, setPricingType] = useState("");

  const fetchLaundryItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getLaundryItemsApi({
        search: search || undefined,
        pricingType: pricingType || undefined,
      });
      if (res.success) {
        setLaundryItems(res.data.laundryItems || []);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch laundry items");
    } finally {
      setLoading(false);
    }
  }, [search, pricingType]);

  useEffect(() => {
    fetchLaundryItems();
  }, [fetchLaundryItems]);

  return { laundryItems, loading, search, setSearch, pricingType, setPricingType, fetchLaundryItems };
}
