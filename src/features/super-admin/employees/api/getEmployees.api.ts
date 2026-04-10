import axiosInstance from "@/utils/axiosInstance";

export const getEmployeesApi = async () => {
  const response = await axiosInstance.get("/super-admin/get-employees");
  return response.data;
};
