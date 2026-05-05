import axiosInstance from "@/utils/axiosInstance";

export const getEmployeesApi = async (params?: any) => {
  const response = await axiosInstance.get("/super-admin/get-employees", { params });
  return response.data;
};
