"use client";

import { useState, useEffect, useCallback } from "react";
import { AttendanceStatus, AttendanceRecord } from "@/types/attendance.dto";
import {
  getAttendanceStatus,
  checkIn as apiCheckIn,
  checkOut as apiCheckOut,
  getAttendanceHistory,
} from "../api/attendance.api";
import toast from "react-hot-toast";

export function useAttendanceStatus() {
  const [status, setStatus] = useState<AttendanceStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getAttendanceStatus();
      setStatus(data);
    } catch {
      setStatus(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return { status, isLoading, refetch: fetchStatus };
}

export function useCheckIn() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckIn = async (onSuccess: () => void) => {
    try {
      setIsLoading(true);
      const res = await apiCheckIn();
      toast.success(res.message);
      onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal check-in");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleCheckIn, isLoading };
}

export function useCheckOut() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckOut = async (onSuccess: () => void) => {
    try {
      setIsLoading(true);
      const res = await apiCheckOut();
      toast.success(res.message);
      onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal check-out");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleCheckOut, isLoading };
}

export function useAttendanceHistory() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getAttendanceHistory(page, 10);
      setRecords(res.attendances || []);
      setTotalPages(res.pagination?.totalPages || 1);
    } catch {
      setRecords([]);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { records, isLoading, page, totalPages, setPage, refetch: fetchHistory };
}
