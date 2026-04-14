import axiosInstance from "@/utils/axiosInstance";

export const createOutletApi = async (data: any) => {
  const response = await axiosInstance.post("/super-admin/outlets", data);
  return response.data;
};
