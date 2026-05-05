import axiosInstance from "@/utils/axiosInstance";
import {
  AttendanceStatusResponse,
  AttendanceActionResponse,
  AttendanceHistoryResponse,
} from "@/types/attendance.dto";

export async function getAttendanceStatus() {
  const res = await axiosInstance.get<AttendanceStatusResponse>(
    "/api/attendance/status"
  );
  return res.data.data;
}

export async function checkIn(shiftId?: string, notes?: string) {
  const res = await axiosInstance.post<AttendanceActionResponse>(
    "/api/attendance/check-in",
    { shiftId, notes }
  );
  return res.data;
}

export async function checkOut() {
  const res = await axiosInstance.post<AttendanceActionResponse>(
    "/api/attendance/check-out"
  );
  return res.data;
}

export async function getAttendanceHistory(
  page = 1,
  limit = 10,
  month?: number,
  year?: number
) {
  const params: Record<string, string | number> = { page, limit };
  if (month) params.month = month;
  if (year) params.year = year;

  const res = await axiosInstance.get<AttendanceHistoryResponse>(
    "/api/attendance/history",
    { params }
  );
  return res.data;
}
