import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axiosInstance";

export async function forgotPasswordApi(values: any) {
  try {
    await axiosInstance.post<ApiResponse<any>>("/auth/forgot-password", {
      email: values.email,
    });
  } catch (error) {
    throw error;
  }
}
