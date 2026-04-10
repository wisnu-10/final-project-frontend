import axiosInstance from "@/utils/axiosInstance";

export const getOutletByIdApi = async (id: string) => {
  const response = await axiosInstance.get(`/super-admin/outlets/${id}`);
  return response.data;
};
