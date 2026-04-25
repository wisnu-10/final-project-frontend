import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { getEmployeeAttendanceReportApi } from "../api/attendanceReport.api";

interface EmployeeInfo {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface EmployeeAttendanceStats {
  totalPresent: number;
  totalLate: number;
  totalAbsent: number;
  totalDays: number;
}

export default function useGetEmployeeAttendanceReport(employeeId: string) {
  const [employee, setEmployee] = useState<EmployeeInfo | null>(null);
  const [attendances, setAttendances] = useState<any[]>([]);
  const [stats, setStats] = useState<EmployeeAttendanceStats>({
    totalPresent: 0,
    totalLate: 0,
    totalAbsent: 0,
    totalDays: 0,
  });
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const fetchReport = useCallback(async () => {
    if (!employeeId) return;
    try {
      setLoading(true);
      const params: Record<string, string> = {
        page: page.toString(),
        limit: limit.toString(),
      };

      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      if (status) params.status = status;

      const res = await getEmployeeAttendanceReportApi(employeeId, params);
      if (res.success) {
        setEmployee(res.data.employee || null);
        setAttendances(res.data.attendances || []);
        setStats(
          res.data.stats || {
            totalPresent: 0,
            totalLate: 0,
            totalAbsent: 0,
            totalDays: 0,
          },
        );
        setPagination(res.data.pagination || null);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch employee attendance report",
      );
    } finally {
      setLoading(false);
    }
  }, [employeeId, page, limit, startDate, endDate, status]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return {
    employee,
    attendances,
    stats,
    pagination,
    loading,
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
