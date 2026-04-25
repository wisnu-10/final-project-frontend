import axiosInstance from "@/utils/axiosInstance";

export const getSalesReportApi = async (params?: Record<string, string>) => {
  const query = params ? "?" + new URLSearchParams(params).toString() : "";
  const response = await axiosInstance.get(`/report/sales${query}`);
  return response.data;
};
