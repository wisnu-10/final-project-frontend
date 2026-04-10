import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { getEmployeesApi } from "../api/getEmployees.api";

export default function useGetEmployees() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getEmployeesApi();
      if (res.success) {
        setEmployees(res.data.employees || []);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return { employees, loading, fetchEmployees };
}
