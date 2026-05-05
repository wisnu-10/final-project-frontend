import axiosInstance from "@/utils/axiosInstance";

export const getEmployeePerformanceApi = async (
  params?: Record<string, string>,
) => {
  const query = params ? "?" + new URLSearchParams(params).toString() : "";
  const response = await axiosInstance.get(
    `/report/employee-performance${query}`,
  );
  return response.data;
};
