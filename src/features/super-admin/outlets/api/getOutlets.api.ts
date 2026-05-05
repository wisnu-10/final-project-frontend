import axiosInstance from "@/utils/axiosInstance";

export const getOutletsApi = async (params?: any) => {
  const response = await axiosInstance.get("/super-admin/outlets", { params });
  return response.data;
};
