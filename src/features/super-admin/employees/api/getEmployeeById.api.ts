import axiosInstance from "@/utils/axiosInstance";

export const getEmployeeByIdApi = async (id: string) => {
  const response = await axiosInstance.get(`/super-admin/get-employee/${id}`);
  return response.data;
};
