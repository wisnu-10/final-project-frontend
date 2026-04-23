import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { getEmployeePerformanceApi } from "../api/getEmployeePerformance.api";

interface PerformanceDataItem {
  employeeId: string;
  firstName: string;
  lastName: string;
  role: string;
  outletName: string | null;
  totalTasks: number;
}

export default function useGetEmployeePerformance() {
  const [data, setData] = useState<PerformanceDataItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [outletId, setOutletId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [role, setRole] = useState("");

  const fetchReport = useCallback(async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = {};

      if (outletId) params.outletId = outletId;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      if (role) params.role = role;

      const res = await getEmployeePerformanceApi(params);
      if (res.success) {
        setData(res.data.data || []);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch employee performance report",
      );
    } finally {
      setLoading(false);
    }
  }, [outletId, startDate, endDate, role]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return {
    data,
    loading,
    outletId,
    setOutletId,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    role,
    setRole,
    fetchReport,
  };
}
