import axiosInstance from "@/utils/axiosInstance";

export const registerEmployeeApi = async (data: any) => {
  const response = await axiosInstance.post("/super-admin/register-employee", data);
  return response.data;
};
