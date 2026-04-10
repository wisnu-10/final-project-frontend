import axiosInstance from "@/utils/axiosInstance";

export const updateEmployeeApi = async (id: string, data: any) => {
  const response = await axiosInstance.put(`/super-admin/update-employee/${id}`, data);
  return response.data;
};
