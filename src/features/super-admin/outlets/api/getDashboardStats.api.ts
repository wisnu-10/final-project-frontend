import axiosInstance from "@/utils/axiosInstance";

export const getDashboardStatsApi = async () => {
  const response = await axiosInstance.get("/super-admin/dashboard-stats");
  return response.data;
};
