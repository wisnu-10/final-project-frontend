import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { getSalesReportApi } from "../api/getSalesReport.api";

interface SalesDataItem {
  period: string;
  totalIncome: number;
  totalOrders: number;
}

interface SalesSummary {
  totalIncome: number;
  totalOrders: number;
  averageOrderValue: number;
}

export default function useGetSalesReport() {
  const [data, setData] = useState<SalesDataItem[]>([]);
  const [summary, setSummary] = useState<SalesSummary>({
    totalIncome: 0,
    totalOrders: 0,
    averageOrderValue: 0,
  });
  const [loading, setLoading] = useState(true);

  // Filters
  const [groupBy, setGroupBy] = useState<"day" | "month" | "year">("month");
  const [outletId, setOutletId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchReport = useCallback(async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = { groupBy };

      if (outletId) params.outletId = outletId;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const res = await getSalesReportApi(params);
      if (res.success) {
        setData(res.data.data || []);
        setSummary(
          res.data.summary || {
            totalIncome: 0,
            totalOrders: 0,
            averageOrderValue: 0,
          },
        );
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch sales report",
      );
    } finally {
      setLoading(false);
    }
  }, [groupBy, outletId, startDate, endDate]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return {
    data,
    summary,
    loading,
    groupBy,
    setGroupBy,
    outletId,
    setOutletId,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    fetchReport,
  };
}
