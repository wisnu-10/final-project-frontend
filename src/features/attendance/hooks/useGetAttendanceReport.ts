import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { getAttendanceReportApi } from "../api/attendanceReport.api";
import { useDebounce } from "@/hooks/useDebounce";

interface AttendanceSummary {
  totalEmployees: number;
  presentToday: number;
  lateToday: number;
  absentToday: number;
}

interface EmployeeAttendance {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  attendances: any[];
}

export default function useGetAttendanceReport() {
  const [employees, setEmployees] = useState<EmployeeAttendance[]>([]);
  const [summary, setSummary] = useState<AttendanceSummary>({
    totalEmployees: 0,
    presentToday: 0,
    lateToday: 0,
    absentToday: 0,
  });
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const fetchReport = useCallback(async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = {
        page: page.toString(),
        limit: limit.toString(),
      };

      if (debouncedSearch) params.search = debouncedSearch;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      if (status) params.status = status;

      const res = await getAttendanceReportApi(params);
      if (res.success) {
        setEmployees(res.employees || []);
        setSummary(
          res.summary || {
            totalEmployees: 0,
            presentToday: 0,
            lateToday: 0,
            absentToday: 0,
          },
        );
        setPagination(res.pagination || null);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch attendance report",
      );
    } finally {
      setLoading(false);
    }
  }, [page, limit, debouncedSearch, startDate, endDate, status]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return {
    employees,
    summary,
    pagination,
    loading,
    search,
    setSearch,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    status,
    setStatus,
    page,
    setPage,
    fetchReport,
  };
}
