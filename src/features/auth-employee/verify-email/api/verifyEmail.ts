import axiosInstance from "@/utils/axiosInstance";

export const verifyEmployeeEmail = async (token: string) => {
  const response = await axiosInstance.post(`/auth-employee/verify-email/${token}`);
  return response.data;
};
