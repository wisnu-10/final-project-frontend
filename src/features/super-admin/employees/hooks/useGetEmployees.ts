import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { getEmployeesApi } from "../api/getEmployees.api";

export default function useGetEmployees() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getEmployeesApi({ page, limit: 10 });
      if (res.success) {
        setEmployees(res.data.employees || []);
        setPagination(res.data.pagination);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return { employees, loading, fetchEmployees, page, setPage, pagination };
}
