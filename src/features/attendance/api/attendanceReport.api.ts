import axiosInstance from "@/utils/axiosInstance";

export const getAttendanceReportApi = async (
  params?: Record<string, string>,
) => {
  const query = params ? "?" + new URLSearchParams(params).toString() : "";
  const response = await axiosInstance.get(`/api/attendance/report${query}`);
  return response.data;
};

export const getEmployeeAttendanceReportApi = async (
  employeeId: string,
  params?: Record<string, string>,
) => {
  const query = params ? "?" + new URLSearchParams(params).toString() : "";
  const response = await axiosInstance.get(
    `/api/attendance/report/${employeeId}${query}`,
  );
  return response.data;
};
