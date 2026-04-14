import axiosInstance from "@/utils/axiosInstance";

export const updateOutletApi = async (id: string, data: any) => {
  const response = await axiosInstance.put(`/super-admin/outlets/${id}`, data);
  return response.data;
};
