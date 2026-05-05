import axiosInstance from "@/utils/axiosInstance";

export const deleteOutletApi = async (id: string) => {
  const response = await axiosInstance.delete(`/super-admin/outlets/${id}`);
  return response.data;
};
