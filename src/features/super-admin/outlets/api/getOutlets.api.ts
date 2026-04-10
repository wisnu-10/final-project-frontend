import axiosInstance from "@/utils/axiosInstance";

export const getOutletsApi = async () => {
  const response = await axiosInstance.get("/super-admin/outlets");
  return response.data;
};
