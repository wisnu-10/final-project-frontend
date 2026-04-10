import axiosInstance from "@/utils/axiosInstance";

export const deleteEmployeeApi = async (id: string) => {
  const response = await axiosInstance.delete(`/super-admin/delete-employee/${id}`);
  return response.data;
};
