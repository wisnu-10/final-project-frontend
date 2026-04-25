import { useState, useEffect, useCallback } from "react";
import { shiftApi } from "../api/shift.api";
import { Shift } from "@/types/shift.dto";
import toast from "react-hot-toast";
import { showConfirmDelete } from "@/utils/swal.utils";

export function useShifts() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    limit: 10,
  });

  const fetchShifts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await shiftApi.getShifts({ page, limit: 10, search });
      if (res.success) {
        setShifts(res.data.shifts);
        setPagination(res.data.pagination);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch shifts");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchShifts();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchShifts]);

  const handleDelete = (id: string) => {
    showConfirmDelete({
      title: "Delete Shift?",
      text: "This shift will be permanently removed.",
      onConfirm: async () => {
        const res = await shiftApi.deleteShift(id);
        if (!res.success) throw new Error(res.message);
      },
      onSuccess: () => {
        fetchShifts();
      },
    });
  };

  return {
    shifts,
    loading,
    search,
    setSearch,
    page,
    setPage,
    pagination,
    fetchShifts,
    handleDelete,
  };
}
